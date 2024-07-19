package generate_token_utils

import (
	"log"
	"os"

	"github.com/dgrijalva/jwt-go"
	"github.com/joho/godotenv"
)

func GenerateToken(id uint, email string, role string) string {
	if err := godotenv.Load(); err != nil {
		log.Fatal("error loading .env file")
	}

	var secretKey = os.Getenv("SECRETKEY")
	claims := jwt.MapClaims{
		"id": id,
		"email": email,
		"role": role,
	}

	parseToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, _ := parseToken.SignedString([]byte(secretKey))

	return signedToken
}
