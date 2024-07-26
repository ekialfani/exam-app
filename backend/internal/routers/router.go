package routers

import (
	"backend/internal/controllers"
	"backend/internal/middlewares"

	"github.com/gin-gonic/gin"
)

func StartServer() *gin.Engine {
	router := gin.Default()

	lecturerRouter := router.Group("/lecturers")
	{
		lecturerRouter.POST("/register", controllers.LecturerRegister)
		lecturerRouter.POST("/login", controllers.LecturerLogin)
		lecturerRouter.Use(middlewares.Authentication())
		lecturerRouter.PUT("/:lecturerId", middlewares.LecturerAuthorization(), controllers.UpdateLecturer)
		lecturerRouter.DELETE("/:lecturerId", middlewares.LecturerAuthorization(), controllers.DeleteLecturer)
	}

	examRouter := router.Group("/exams")
	{
		examRouter.Use(middlewares.Authentication())
		examRouter.POST("/", middlewares.AdminAuthorization(), controllers.CreateExam)
		examRouter.GET("/", middlewares.AdminAuthorization(), controllers.GetAllExams)
		examRouter.PUT("/:examId", middlewares.AdminAuthorization(), middlewares.ExamAuthorization(), controllers.UpdateExam)
	}

	return router
}
