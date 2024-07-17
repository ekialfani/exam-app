package main

import (
	"backend/internal/database"
	"backend/internal/routers"
	"log"
	"os"

	"github.com/joho/godotenv"
)

func init() {
	database.StartDB()
}

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("error loading .env file")
	}

	serverPort := os.Getenv("SERVERPORT")
	routers.StartServer().Run(serverPort)
}
