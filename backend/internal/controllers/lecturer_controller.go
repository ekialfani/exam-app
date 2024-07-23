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

func LecturerRegister(context *gin.Context) {
	contentType := header_value_utils.GetContentType(context, "Content-Type")
	var lecturerRequest = models.Lecturer{}

	if contentType == "application/json" {
		if err := context.ShouldBindJSON(&lecturerRequest); err != nil {
			errMessage := error_utils.UnprocessableEntity(err.Error())
			context.JSON(errMessage.StatusCode(), errMessage)
			return
		}
	} else {
		if err := context.ShouldBind(&lecturerRequest); err != nil {
			errMessage := error_utils.UnprocessableEntity(err.Error())
			context.JSON(errMessage.StatusCode(), errMessage)
			return
		}
	}

	lecturerResponse, err := services.LecturerService.Register(&lecturerRequest)

	if err != nil {
		context.JSON(err.StatusCode(), err)
		return
	}

	context.JSON(http.StatusCreated, lecturerResponse)
}

func LecturerLogin(context *gin.Context) {
	contentType := header_value_utils.GetContentType(context, "Content-Type")
	var lecturerRequest = models.Lecturer{}

	if contentType == "application/json" {
		if err := context.ShouldBindJSON(&lecturerRequest); err != nil {
			errMessage := error_utils.UnprocessableEntity(err.Error())
			context.JSON(errMessage.StatusCode(), errMessage)
			return
		}
	} else {
		if err := context.ShouldBind(&lecturerRequest); err != nil {
			errMessage := error_utils.UnprocessableEntity(err.Error())
			context.JSON(errMessage.StatusCode(), errMessage)
			return
		}
	}

	token, err := services.LecturerService.Login(&lecturerRequest)

	if err != nil {
		context.JSON(err.StatusCode(), err)
		return
	}

	context.JSON(http.StatusOK, gin.H{
		"token": token,
	})
}

func UpdateLecturer(context *gin.Context) {
	contentType := header_value_utils.GetContentType(context, "Content-Type")
	lecturerId, _ := strconv.Atoi(context.Param("lecturerId"))
	var updatedLecturer = models.LecturerUpdate{}

	if contentType == "application/json" {
		if err := context.ShouldBindJSON(&updatedLecturer); err != nil {
			errMessage := error_utils.UnprocessableEntity(err.Error())
			context.JSON(errMessage.StatusCode(), errMessage)
			return
		}
	} else {
		if err := context.ShouldBind(&updatedLecturer); err != nil {
			errMessage := error_utils.UnprocessableEntity(err.Error())
			context.JSON(errMessage.StatusCode(), errMessage)
			return
		}
	}

	lecturerResponse, err := services.LecturerService.UpdateLecturer(&updatedLecturer, uint(lecturerId))

	if err != nil {
		context.JSON(err.StatusCode(), err)
		return
	}

	context.JSON(http.StatusOK, lecturerResponse)
}

func DeleteLecturer(context *gin.Context) {
	lecturerId, _ := strconv.Atoi(context.Param("lecturerId"))

	message, err := services.LecturerService.DeleteLecturer(uint(lecturerId))

	if err != nil {
		context.JSON(err.StatusCode(), err)
		return
	}

	context.JSON(http.StatusOK, gin.H{
		"message": message,
	})
}
