package initializers

import (
	"log"
	"os"
	"server/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	dbUrl := os.Getenv("DB_URL")
	if dbUrl == "" {
		log.Fatalf("DB_URL is not set in the environment variables")
	}

	db, err := gorm.Open(postgres.Open(dbUrl), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&models.User{}, &models.Task{})
	DB = db
}
