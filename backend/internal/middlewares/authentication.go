package middlewares

import (
	"backend/internal/utils/token_utils"

	"github.com/gin-gonic/gin"
)

func Authentication() gin.HandlerFunc {
	return func(context *gin.Context) {
		verifyToken, err := token_utils.VerifyToken(context)

		if err != nil {
			context.JSON(err.StatusCode(), err)
			return
		}

		context.Set("userData", verifyToken)
		context.Next()
	}
}
