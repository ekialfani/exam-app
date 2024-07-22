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
	}

	return router
}
