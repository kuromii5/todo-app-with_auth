package handlers

import (
	"net/http"
	"os"
	"server/initializers"
	"server/models"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

func SignUp(c *gin.Context) {
	var userParams struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}
	if err := c.Bind(&userParams); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to read body"})
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(userParams.Password), 10)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to hash password"})
		return
	}

	user := models.User{
		Username: userParams.Username,
		Password: string(hash),
	}
	result := initializers.DB.Create(&user)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username is taken"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "User created successfully"})
}

func LogIn(c *gin.Context) {
	var userParams struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}
	if err := c.Bind(&userParams); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to read body"})
		return
	}

	var user models.User
	initializers.DB.First(&user, "username = ?", userParams.Username)
	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid username or password"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(userParams.Password)); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid username or password"})
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_KEY")))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create jwt token"})
		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "/", "localhost", false, true)
	c.JSON(http.StatusOK, gin.H{})
}

func LogOut(c *gin.Context) {
	c.SetCookie("Authorization", "", -1, "/", "", false, true)
	c.JSON(http.StatusOK, gin.H{"message": "Log out successfully"})
}

func Validate(c *gin.Context) {
	user, _ := c.Get("user")

	c.JSON(http.StatusOK, gin.H{"message": user})
}
