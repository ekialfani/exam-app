package routers

import (
	"backend/internal/controllers"

	"github.com/gin-gonic/gin"
)

func StartServer() *gin.Engine {
	router := gin.Default()
	lecturerRouter := router.Group("/lecturers")
	{
		lecturerRouter.POST("/register", controllers.LecturerRegister)
	}
	return router
}
