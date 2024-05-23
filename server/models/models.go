package models

import "gorm.io/gorm"

type Task struct {
	gorm.Model
	Title       string `json:"title" gorm:"unique"`
	Description string `json:"description"`
	UserID      uint   `json:"user_id"`
}

type User struct {
	gorm.Model
	Username string `gorm:"unique"`
	Password string
	Tasks    []Task `json:"tasks" gorm:"foreignKey:UserID"`
}
