package header_value_utils

import "github.com/gin-gonic/gin"

func GetContentType(context *gin.Context) string {
	return context.Request.Header.Get("Content-Type")
}
