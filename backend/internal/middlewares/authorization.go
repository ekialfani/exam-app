package middlewares

import (
	"backend/internal/database"
	"backend/internal/models"
	"backend/internal/utils/error_formats"
	"backend/internal/utils/error_utils"

	"strconv"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func LecturerAuthorization() gin.HandlerFunc {
	return func(context *gin.Context) {
		db := database.GetDB()
		lecturerId, err := strconv.Atoi(context.Param("lecturerId"))

		if err != nil {
			errMessage := error_utils.BadRequest("parameter salah")
			context.AbortWithStatusJSON(errMessage.StatusCode(), errMessage)
			return
		}

		userData := context.MustGet("userData").(jwt.MapClaims)
		var id uint = uint(userData["id"].(float64))
		var lecturer models.Lecturer = models.Lecturer{}

		err = db.First(&lecturer, uint(lecturerId)).Error

		if err != nil {
			errMessage := error_formats.ParseError(err)
			context.AbortWithStatusJSON(errMessage.StatusCode(), errMessage)
			return
		}

		if lecturer.ID != id {
			errMessage := error_utils.Unauthorized("Tidak dapat mengakses data")

			context.AbortWithStatusJSON(errMessage.StatusCode(), errMessage)
			return
		}

		context.Next()
	}
}
