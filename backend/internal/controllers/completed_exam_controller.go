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

func CreateCompletedExam(context *gin.Context) {
	contentType := header_value_utils.GetContentType(context, "Content-Type")
	var completedExamRequest = models.CompletedExam{}

	if contentType == "application/json" {
		if err := context.ShouldBindJSON(&completedExamRequest); err != nil {
			errMessage := error_utils.UnprocessableEntity("Data yang dimasukkan tidak sesuai")
			context.AbortWithStatusJSON(errMessage.StatusCode(), errMessage)
			return
		}
	} else {
		if err := context.ShouldBind(&completedExamRequest); err != nil {
			errMessage := error_utils.UnprocessableEntity("Data yang dimasukkan tidak sesuai")
			context.AbortWithStatusJSON(errMessage.StatusCode(), errMessage)
			return
		}
	}

	completedExamResponse, err := services.CompletedExamService.CreateCompletedExam(&completedExamRequest)

	if err != nil {
		context.AbortWithStatusJSON(err.StatusCode(), err)
		return
	}

	context.JSON(http.StatusOK, completedExamResponse)
}

func GetAllCompletedExams(context *gin.Context) {
	userData := context.MustGet("userData").(jwt.MapClaims)
	var studentId = uint(userData["id"].(float64))

	completedExamsReponse, err := services.CompletedExamService.GetAllCompletedExams(studentId)

	if err != nil {
		context.AbortWithStatusJSON(err.StatusCode(), err)
		return
	}

	context.JSON(http.StatusOK, completedExamsReponse)
}
