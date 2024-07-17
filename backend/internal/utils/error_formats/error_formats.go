package error_formats

import (
	"backend/internal/utils/error_utils"
	"strings"
)

func ParseError(err error) error_utils.ErrorMessage {
	if strings.Contains(err.Error(), "no rows in result set") {
		return error_utils.NotFound("data tidak ditemukan")
	}

	return error_utils.InternalServerError("terjadi kesalahan")
}
