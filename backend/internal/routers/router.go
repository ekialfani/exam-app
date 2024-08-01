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
		examRouter.GET("/:examToken", controllers.GetExamByToken)
		examRouter.PUT("/:examId", middlewares.AdminAuthorization(), middlewares.ExamAuthorization(), controllers.UpdateExam)
		examRouter.DELETE("/:examId", middlewares.AdminAuthorization(), middlewares.ExamAuthorization(), controllers.DeleteExam)
	}

	questionRouter := router.Group("/questions")
	{
		questionRouter.Use(middlewares.Authentication())
		questionRouter.POST("/", middlewares.AdminAuthorization(), controllers.CreateQuestion)
		questionRouter.GET("/:examId", controllers.GetQuestionsByExamId)
		questionRouter.PUT("/:questionId", middlewares.AdminAuthorization(), middlewares.QuestionAuthorization(), controllers.UpdateQuestion)
		questionRouter.DELETE("/:questionId", middlewares.AdminAuthorization(), middlewares.QuestionAuthorization(), controllers.DeleteQuestion)
	}

	studentRouter := router.Group("/students")
	{
		studentRouter.POST("/register", controllers.StudentRegister)
		studentRouter.POST("/login", controllers.StudentLogin)
		studentRouter.Use(middlewares.Authentication())
		studentRouter.PUT("/:studentId", middlewares.StudentAuthorization(), controllers.UpdateStudent)
		studentRouter.DELETE("/:studentId", middlewares.StudentAuthorization(), controllers.DeleteStudent)
	}

	return router
}
