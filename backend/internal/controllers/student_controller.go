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

func StudentRegister(context *gin.Context) {
	contentType := header_value_utils.GetContentType(context, "Content-Type")
	var studentRequest = models.Student{}

	if contentType == "application/json" {
		if err := context.ShouldBindJSON(&studentRequest); err != nil {
			errMessage := error_utils.UnprocessableEntity("Data yang dimasukkan tidak sesuai")
			context.JSON(errMessage.StatusCode(), errMessage)
			return
		}
	} else {
		if err := context.ShouldBind(&studentRequest); err != nil {
			errMessage := error_utils.UnprocessableEntity("Data yang dimasukkan tidak sesuai")
			context.JSON(errMessage.StatusCode(), errMessage)
			return
		}
	}

	studentResponse, err := services.StudentService.Register(&studentRequest)

	if err != nil {
		context.JSON(err.StatusCode(), err)
		return
	}

	context.JSON(http.StatusOK, studentResponse)
}

func StudentLogin(context *gin.Context) {
	contentType := header_value_utils.GetContentType(context, "Content-Type")

	var studentRequest = models.Student{}

	if contentType == "application/json" {
		if err := context.ShouldBindJSON(&studentRequest); err != nil {
			errMessage := error_utils.UnprocessableEntity("Data yang dimasukkan tidak sesuai")
			context.JSON(errMessage.StatusCode(), errMessage)
			return
		}
	} else {
		if err := context.ShouldBind(&studentRequest); err != nil {
			errMessage := error_utils.UnprocessableEntity("Data yang dimasukkan tidak sesuai")
			context.JSON(errMessage.StatusCode(), errMessage)
			return
		}
	}

	token, err := services.StudentService.Login(&studentRequest)

	if err != nil {
		context.JSON(err.StatusCode(), err)
		return
	}

	context.JSON(http.StatusOK, gin.H{
		"token": token,
	})
}

func UpdateStudent(context *gin.Context) {
	studentId, _ := strconv.Atoi(context.Param("studentId"))
	contentType := header_value_utils.GetContentType(context, "Content-Type")
	var updatedStudent = models.UpdateStudent{}

	if contentType == "application/json" {
		if err := context.ShouldBindJSON(&updatedStudent); err != nil {
			errMessage := error_utils.UnprocessableEntity("Data yang dimasukkan tidak sesuai")
			context.JSON(errMessage.StatusCode(), errMessage)
			return
		}
	} else {
		if err := context.ShouldBind(&updatedStudent); err != nil {
			errMessage := error_utils.UnprocessableEntity("Data yang dimasukkan tidak sesuai")
			context.JSON(errMessage.StatusCode(), errMessage)
			return
		}
	}

	studentResponse, err := services.StudentService.UpdateStudent(&updatedStudent, uint(studentId))

	if err != nil {
		context.JSON(err.StatusCode(), err)
		return
	}

	context.JSON(http.StatusOK, studentResponse)
}

func DeleteStudent(context *gin.Context) {
	studentId, _ := strconv.Atoi(context.Param("studentId"))

	message, err := services.StudentService.DeleteStudent(uint(studentId))

	if err != nil {
		context.JSON(err.StatusCode(), err)
		return
	}

	context.JSON(http.StatusOK, gin.H{
		"message": message,
	})
}
