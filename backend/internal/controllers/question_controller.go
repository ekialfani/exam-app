package controllers

import (
	"backend/internal/models"
	"backend/internal/services"
	"backend/internal/utils/error_utils"
	"backend/internal/utils/header_value_utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func CreateQuestion(context *gin.Context) {
	contentType := header_value_utils.GetContentType(context, "Content-Type")

	var questionRequest = models.Question{}

	if contentType == "application/json" {
		if err := context.ShouldBindJSON(&questionRequest); err != nil {
			errMessage := error_utils.UnprocessableEntity("Data yang dimasukkan tidak sesuai")
			context.JSON(errMessage.StatusCode(), err)
			return
		}
	} else {
		if err := context.ShouldBind(&questionRequest); err != nil {
			errMessage := error_utils.UnprocessableEntity("Data yang dimasukkan tidak sesuai")
			context.JSON(errMessage.StatusCode(), err)
			return
		}
	}

	questionResponse, err := services.QuestionService.CreateQuestion(&questionRequest)

	if err != nil {
		context.JSON(err.StatusCode(), err)
		return
	}

	context.JSON(http.StatusOK, questionResponse)
}

func GetQuestionsByExamId(context *gin.Context) {
	examId, err := strconv.Atoi(context.Param("examId"))

	if err != nil {
		errMessage := error_utils.BadRequest("Parameter salah")
		context.JSON(errMessage.StatusCode(), errMessage)
		return
	}

	questionsResponse, errMessage := services.QuestionService.GetQuestionsByExamId(uint(examId))

	if errMessage != nil {
		context.JSON(errMessage.StatusCode(), errMessage)
		return
	}

	context.JSON(http.StatusOK, questionsResponse)
}

func UpdateQuestion(context *gin.Context) {
	questionId, _ := strconv.Atoi(context.Param("questionId"))
	contentType := header_value_utils.GetContentType(context, "Content-Type")
	var updatedQuestion = models.UpdateQuestion{}

	if contentType == "application/json" {
		if err := context.ShouldBindJSON(&updatedQuestion); err != nil {
			errMessage := error_utils.BadRequest("Data yang dimasukkan tidak sesuai")
			context.JSON(errMessage.StatusCode(), errMessage)
			return
		}
	} else {
		if err := context.ShouldBind(&updatedQuestion); err != nil {
			errMessage := error_utils.BadRequest("Data yang dimasukkan tidak sesuai")
			context.JSON(errMessage.StatusCode(), errMessage)
			return
		}
	}

	questionResponse, err := services.QuestionService.UpdateQuestion(&updatedQuestion, uint(questionId))

	if err != nil {
		context.JSON(err.StatusCode(), err)
		return
	}

	context.JSON(http.StatusOK, questionResponse)
}
