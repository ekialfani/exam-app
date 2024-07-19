package bcrypt_utils

import (
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password []byte) string {
	if err := godotenv.Load(); err != nil {
		log.Fatal("error loading .env file")
	}

	salt, _ := strconv.Atoi(os.Getenv("SALT"))
	hashedPassword, _ := bcrypt.GenerateFromPassword(password, salt)

	return string(hashedPassword)
}

func ComparePassword(hash, password []byte) bool {
	err := bcrypt.CompareHashAndPassword(hash, password)

	return err == nil
}
