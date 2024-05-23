package routes

import (
	"server/handlers"
	"server/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterUserRoutes(router *gin.Engine) {
	router.POST("/signup", handlers.SignUp)
	router.POST("/login", handlers.LogIn)
	router.POST("/logout", middleware.RequireAuth, handlers.LogOut)
	router.GET("/validate", middleware.RequireAuth, handlers.Validate)
}
