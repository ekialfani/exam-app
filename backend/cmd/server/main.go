package main

import (
	"backend/internal/database"
	"backend/internal/routers"
	"backend/internal/services"
	"context"
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

	ctx, cancel := context.WithCancel(context.Background())

	defer cancel()

	go services.ScheduleExamStatusUpdater(ctx)

	serverPort := os.Getenv("SERVERPORT")
	routers.StartServer().Run(serverPort)
}
