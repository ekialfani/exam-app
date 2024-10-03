package controllers

import (
	"backend/internal/models"
	"backend/internal/services"
	"backend/internal/utils/error_utils"
	"backend/internal/utils/header_value_utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateExamResult(context *gin.Context) {
	contentType := header_value_utils.GetContentType(context, "Content-Type")

	var examResultRequest = models.ExamResult{}

	if contentType == "application/json" {
		if err := context.ShouldBindJSON(&examResultRequest); err != nil {
			errMessage := error_utils.UnprocessableEntity("Data yang dimasukkan tidak sesuai")
			context.AbortWithStatusJSON(errMessage.StatusCode(), errMessage)

			return
		}
	} else {
		if err := context.ShouldBind(&examResultRequest); err != nil {
			errMessage := error_utils.UnprocessableEntity("Data yang dimasukkan tidak sesuai")
			context.AbortWithStatusJSON(errMessage.StatusCode(), errMessage)

			return
		}
	}

	examResultResponse, err := services.ExamResultService.CreateExamResult(&examResultRequest)

	if err != nil {
		context.AbortWithStatusJSON(err.StatusCode(), err)
		return
	}

	context.JSON(http.StatusOK, examResultResponse)
}
