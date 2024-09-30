package controllers

import (
	"backend/internal/models"
	"backend/internal/services"
	"backend/internal/utils/error_utils"
	"backend/internal/utils/header_value_utils"
	"net/http"
	"strconv"

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

func GetAllExamsByLecturerId(context *gin.Context) {
	userData := context.MustGet("userData").(jwt.MapClaims)
	var lecturerID uint = uint(userData["id"].(float64))

	examsResponse, err := services.ExamService.GetAllExamsByLecturerId(lecturerID)

	if err != nil {
		context.JSON(err.StatusCode(), err)
		return
	}

	context.JSON(http.StatusOK, examsResponse)
}

func GetAllExamReports(context *gin.Context) {
	userData := context.MustGet("userData").(jwt.MapClaims)

	var lectureId uint = uint(userData["id"].(float64))

	examsResponse, err := services.ExamService.GetAllExamReports(lectureId)

	if err != nil {
		context.AbortWithStatusJSON(err.StatusCode(), err)
		return
	}

	context.JSON(http.StatusOK, examsResponse)
}

func GetExamById(context *gin.Context) {
	examId, err := strconv.Atoi(context.Param("examId"))

	if err != nil {
		errMessage := error_utils.BadRequest("Parameter salah")
		context.AbortWithStatusJSON(errMessage.StatusCode(), errMessage)
		return
	}

	examResponse, errMessage := services.ExamService.GetExamById(uint(examId))

	if errMessage != nil {
		context.AbortWithStatusJSON(errMessage.StatusCode(), errMessage)
		return
	}

	context.JSON(http.StatusOK, examResponse)
}

func GetExamByToken(context *gin.Context) {
	var examToken string = context.Param("examToken")

	examResponse, err := services.ExamService.GetExamByToken(examToken)

	if err != nil {
		context.JSON(err.StatusCode(), err)
		return
	}

	context.JSON(http.StatusOK, examResponse)
}

func UpdateExam(context *gin.Context) {
	contentType := header_value_utils.GetContentType(context, "Content-Type")
	examId, _ := strconv.Atoi(context.Param("examId"))
	var updatedExam models.ExamUpdate = models.ExamUpdate{}

	if contentType == "application/json" {
		if err := context.ShouldBindJSON(&updatedExam); err != nil {
			errMessage := error_utils.UnprocessableEntity("Data yang dimasukkan tidak sesuai")
			context.JSON(errMessage.StatusCode(), err)
			return
		}
	} else {
		if err := context.ShouldBind(&updatedExam); err != nil {
			errMessage := error_utils.UnprocessableEntity("Data yang dimasukkan tidak sesuai")
			context.JSON(errMessage.StatusCode(), err)
			return
		}
	}

	examResponse, err := services.ExamService.UpdateExam(&updatedExam, uint(examId))

	if err != nil {
		context.JSON(err.StatusCode(), err)
		return
	}

	context.JSON(http.StatusOK, examResponse)
}

func DeleteExam(context *gin.Context) {
	examId, _ := strconv.Atoi(context.Param("examId"))

	message, err := services.ExamService.DeleteExam(uint(examId))

	if err != nil {
		context.JSON(err.StatusCode(), err)
		return
	}

	context.JSON(http.StatusOK, gin.H{
		"message": message,
	})
}
