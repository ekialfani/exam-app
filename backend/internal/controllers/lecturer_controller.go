package controllers

import (
	"backend/internal/models"
	"backend/internal/services"
	"backend/internal/utils/error_utils"
	"backend/internal/utils/header_value_utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func LecturerRegister(context *gin.Context) {
	contentType := header_value_utils.GetContentType(context)
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
	contentType := header_value_utils.GetContentType(context)
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
