package handlers

import (
	"net/http"
	"server/initializers"
	"server/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// GetTasks retrieves all tasks from the database.
func GetTasks(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}

	var tasks []models.Task
	initializers.DB.Where("user_id = ?", user.(models.User).ID).Find(&tasks)
	c.IndentedJSON(http.StatusOK, tasks)
}

// GetTaskByID retrieves a task by its ID from the database.
func GetTaskByID(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}

	id := c.Param("id")
	var task models.Task
	if err := initializers.DB.First(&task, "id = ? AND user_id = ?", id, user.(models.User).ID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"message": "task not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	c.IndentedJSON(http.StatusOK, task)
}

// CreateTask adds a new task to the database.
func CreateTask(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}

	var newTask models.Task
	if err := c.BindJSON(&newTask); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	newTask.UserID = user.(models.User).ID

	if err := initializers.DB.Create(&newTask).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.IndentedJSON(http.StatusCreated, newTask)
}

// DeleteTaskByID deletes a task by its ID from the database.
func DeleteTaskByID(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}

	id := c.Param("id")
	var task models.Task
	if err := initializers.DB.First(&task, "id = ? AND user_id = ?", id, user.(models.User).ID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"message": "task not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	initializers.DB.Delete(&task)
	c.Status(http.StatusNoContent)
}

func UpdateTask(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}

	id := c.Param("id")
	var taskUpdate struct {
		Title       *string `json:"title"`
		Description *string `json:"description"`
	}
	if err := c.BindJSON(&taskUpdate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to read body"})
		return
	}

	var task models.Task
	if err := initializers.DB.First(&task, "id = ? AND user_id = ?", id, user.(models.User).ID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"message": "Task not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	if taskUpdate.Title != nil {
		task.Title = *taskUpdate.Title
	}
	if taskUpdate.Description != nil {
		task.Description = *taskUpdate.Description
	}

	if err := initializers.DB.Save(&task).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update task"})
		return
	}

	c.JSON(http.StatusOK, task)
}
