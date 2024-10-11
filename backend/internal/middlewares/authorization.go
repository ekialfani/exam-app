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

func AdminAuthorization() gin.HandlerFunc {
	return func(context *gin.Context) {
		userData := context.MustGet("userData").(jwt.MapClaims)
		var role string = userData["role"].(string)

		if role != "Dosen" {
			err := error_utils.Unauthorized("Tidak dapat mengakses data. Silahkan masuk sebagai dosen terlebih dahulu")
			context.AbortWithStatusJSON(err.StatusCode(), err)
			return
		}

		context.Next()
	}
}

func ExamAuthorization() gin.HandlerFunc {
	return func(context *gin.Context) {
		db := database.GetDB()
		examId, err := strconv.Atoi(context.Param("examId"))
		var errMessage error_utils.ErrorMessage
		var exam models.Exam = models.Exam{}

		if err != nil {
			errMessage = error_utils.BadRequest("Parameter salah")
			context.AbortWithStatusJSON(errMessage.StatusCode(), errMessage)
			return
		}

		err = db.Select("lecturer_id").First(&exam, uint(examId)).Error

		if err != nil {
			errMessage = error_formats.ParseError(err)
			context.AbortWithStatusJSON(errMessage.StatusCode(), errMessage)
			return
		}

		userData := context.MustGet("userData").(jwt.MapClaims)
		var lecturerId uint = uint(userData["id"].(float64))

		if exam.LecturerID != lecturerId {
			errMessage = error_utils.Unauthorized("Tidak dapat mengakses data")
			context.AbortWithStatusJSON(errMessage.StatusCode(), errMessage)
			return
		}

		context.Next()
	}
}

func QuestionAuthorization() gin.HandlerFunc {
	return func(context *gin.Context) {
		db := database.GetDB()
		questionId, err := strconv.Atoi(context.Param("questionId"))
		var question *models.Question

		if err != nil {
			errMessage := error_utils.BadRequest("Parameter salah")
			context.AbortWithStatusJSON(errMessage.StatusCode(), errMessage)
			return
		}

		err = db.Preload("Exam").Where("id = ?", questionId).First(&question).Error

		if err != nil {
			errMessage := error_formats.ParseError(err)
			context.AbortWithStatusJSON(errMessage.StatusCode(), errMessage)
			return
		}

		userData := context.MustGet("userData").(jwt.MapClaims)
		var lecturerId uint = uint(userData["id"].(float64))

		if question.Exam.LecturerID != lecturerId {
			errMessage := error_utils.Unauthorized("Tidak dapat mengakses data")
			context.AbortWithStatusJSON(errMessage.StatusCode(), errMessage)
			return
		}

		context.Next()
	}
}

func StudentAuthorization() gin.HandlerFunc {
	return func(context *gin.Context) {
		db := database.GetDB()
		studentId, err := strconv.Atoi(context.Param("studentId"))

		if err != nil {
			errMessage := error_utils.BadRequest("Parameter salah")
			context.AbortWithStatusJSON(errMessage.StatusCode(), errMessage)
			return
		}

		var student = models.Student{}

		err = db.First(&student, studentId).Error

		if err != nil {
			errMessage := error_formats.ParseError(err)
			context.AbortWithStatusJSON(errMessage.StatusCode(), errMessage)
			return
		}

		userData := context.MustGet("userData").(jwt.MapClaims)
		var id uint = uint(userData["id"].(float64))

		if student.ID != id {
			errMessage := error_utils.Unauthorized("Tidak dapat Mengakses Data")
			context.AbortWithStatusJSON(errMessage.StatusCode(), errMessage)
			return
		}

		context.Next()
	}
}
