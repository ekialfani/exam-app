package header_value_utils

import "github.com/gin-gonic/gin"

func GetContentType(context *gin.Context, valueName string) string {
	return context.Request.Header.Get(valueName)
}
