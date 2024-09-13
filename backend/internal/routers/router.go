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
		lecturerRouter.Use(middlewares.Authentication())
		lecturerRouter.GET("/:lecturerId", controllers.GetLecturerById)
		lecturerRouter.PUT("/:lecturerId", middlewares.LecturerAuthorization(), controllers.UpdateLecturer)
		lecturerRouter.DELETE("/:lecturerId", middlewares.LecturerAuthorization(), controllers.DeleteLecturer)
	}

	userLoginRouter := router.Group("/users")
	{
		userLoginRouter.POST("/login", controllers.UserLogin)
	}

	examRouter := router.Group("/exams")
	{
		examRouter.Use(middlewares.Authentication())
		examRouter.POST("/", middlewares.AdminAuthorization(), controllers.CreateExam)
		examRouter.GET("/", middlewares.AdminAuthorization(), controllers.GetAllExams)
		examRouter.GET("/:examId", controllers.GetExamById)
		examRouter.GET("/token/:examToken", controllers.GetExamByToken)
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
		studentRouter.Use(middlewares.Authentication())
		studentRouter.PUT("/:studentId", middlewares.StudentAuthorization(), controllers.UpdateStudent)
		studentRouter.DELETE("/:studentId", middlewares.StudentAuthorization(), controllers.DeleteStudent)
	}

	examAssignmentRouter := router.Group("/exam-assignments")
	{
		examAssignmentRouter.Use(middlewares.Authentication())
		examAssignmentRouter.POST("/", controllers.CreateExamAssignment)
		examAssignmentRouter.GET("/", controllers.GetAllExamAssignments)
		examAssignmentRouter.DELETE("/:examId", middlewares.ExamAssignmentAuthorization(), controllers.DeleteExamAssignment)
	}

	return router
}
