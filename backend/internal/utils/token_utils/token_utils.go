package token_utils

import (
	"backend/internal/utils/error_utils"
	"backend/internal/utils/header_value_utils"
	"errors"
	"log"
	"math/rand"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
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

func VerifyToken(context *gin.Context) (interface{}, error_utils.ErrorMessage) {
	if err := godotenv.Load(); err != nil {
		log.Fatal("error loading .env file")
	}

	headerToken := header_value_utils.GetContentType(context, "Authorization")
	bearer := strings.HasPrefix(headerToken, "Bearer")
	var secretKey = os.Getenv("SECRETKEY")

	if !bearer {
		return nil, error_utils.Unauthorized("Silahkan login terlebih dahulu")
	}

	stringToken := strings.Split(headerToken, " ")[1]

	token, err := jwt.Parse(stringToken, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("silahkan login terlebih dahulu")
		}

		return []byte(secretKey), nil
	})

	if err != nil {
		return nil, error_utils.Unauthorized(err.Error())
	}

	if _, ok := token.Claims.(jwt.MapClaims); !ok && !token.Valid {
		return nil, error_utils.Unauthorized("Silahkan login terlebih dahulu")
	}

	return token.Claims.(jwt.MapClaims), nil
}

func GenerateExamToken(tokenLength int) string {
	var randomizer = rand.New(rand.NewSource(time.Now().UTC().UnixNano()))
	var letters = []rune("abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ")
	token := make([]rune, tokenLength)

	for index := range token {
		token[index] = letters[randomizer.Intn(len(letters))]
	}

	return string(token)
}
