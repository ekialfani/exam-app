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

func CreateExamAssignment(context *gin.Context) {
	contentType := header_value_utils.GetContentType(context, "Content-Type")
	var examAssignmentRequest = models.ExamAssignment{}

	if contentType == "application/json" {
		if err := context.ShouldBindJSON(&examAssignmentRequest); err != nil {
			errMessage := error_utils.UnprocessableEntity("Data yang dimasukkan tidak sesuai")
			context.AbortWithStatusJSON(errMessage.StatusCode(), errMessage)
			return
		}
	} else {
		if err := context.ShouldBind(&examAssignmentRequest); err != nil {
			errMessage := error_utils.UnprocessableEntity("Data yang dimasukkan tidak sesuai")
			context.AbortWithStatusJSON(errMessage.StatusCode(), errMessage)
			return
		}
	}

	userData := context.MustGet("userData").(jwt.MapClaims)
	var studentId uint = uint(userData["id"].(float64))

	examAssignmentResponse, err := services.ExamAssignmentService.CreateExamAssignment(&examAssignmentRequest, studentId)

	if err != nil {
		context.AbortWithStatusJSON(err.StatusCode(), err)
		return
	}

	context.JSON(http.StatusOK, examAssignmentResponse)
}
