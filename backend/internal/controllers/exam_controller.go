package controllers

import (
	"backend/internal/models"
	"backend/internal/services"
	"backend/internal/utils/error_utils"
	"backend/internal/utils/header_value_utils"
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func CreateExam(context *gin.Context) {
	contentType := header_value_utils.GetContentType(context, "Content-Type")
	userData := context.MustGet("userData").(jwt.MapClaims)
	var examRequest = models.Exam{}

	if contentType == "application/json" {
		if err := context.ShouldBindJSON(&examRequest); err != nil {
			errMessage := error_utils.UnprocessableEntity("Data yang dimasukkan tidak sesuai")
			context.JSON(errMessage.StatusCode(), err)
			return
		}
	} else {
		if err := context.ShouldBind(&examRequest); err != nil {
			errMessage := error_utils.UnprocessableEntity("Data yang dimasukkan tidak sesuai")
			context.JSON(errMessage.StatusCode(), err)
			return
		}
	}

	var lecturerID uint = uint(userData["id"].(float64))

	examResponse, err := services.ExamService.CreateExam(&examRequest, lecturerID)

	if err != nil {
		context.JSON(err.StatusCode(), err)
		return
	}

	context.JSON(http.StatusOK, examResponse)
}

func GetAllExams(context *gin.Context) {
	userData := context.MustGet("userData").(jwt.MapClaims)
	var lecturerID uint = uint(userData["id"].(float64))

	examsResponse, err := services.ExamService.GetAllExams(lecturerID)

	if err != nil {
		context.JSON(err.StatusCode(), err)
		return
	}

	context.JSON(http.StatusOK, examsResponse)
}
