package database

import (
	"backend/internal/models"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	db *gorm.DB
	err error
)

func StartDB() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("error loading .env file")
	}

	username := os.Getenv("DBUSER")
	password := os.Getenv("DBPASSWORD")
	host := os.Getenv("DBHOST")
	port := os.Getenv("DBPORT")
	dbName := os.Getenv("DBNAME")

	config := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", username, password, host, port, dbName)

	db, err = gorm.Open(mysql.Open(config), &gorm.Config{})

	if err != nil {
		log.Fatal(err.Error())
	}

	fmt.Println("berhasil terhubung ke database...")

	db.Debug().AutoMigrate(models.Lecturer{}, models.Exam{})
}

func GetDB() *gorm.DB {
	return db
}
