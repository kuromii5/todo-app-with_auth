package routes

import (
	"server/handlers"
	"server/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterTaskRoutes(router *gin.Engine) {
	router.GET("/tasks", middleware.RequireAuth, handlers.GetTasks)
	router.GET("/tasks/:id", middleware.RequireAuth, handlers.GetTaskByID)
	router.POST("/tasks", middleware.RequireAuth, handlers.CreateTask)
	router.DELETE("/tasks/:id", middleware.RequireAuth, handlers.DeleteTaskByID)
	router.PUT("/tasks/:id", middleware.RequireAuth, handlers.UpdateTask)
}
