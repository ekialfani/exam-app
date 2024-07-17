package error_utils

import "net/http"

type ErrorMessage interface {
	Message() string
	StatusCode() int
	ErrorStatus() string
}

type ErrorMessageData struct {
	ErrMessage    string `json:"message"`
	ErrStatusCode int    `json:"status_code"`
	ErrStatus     string `json:"error_status"`
}

func (error *ErrorMessageData) Message() string {
	return error.ErrMessage
}

func (error *ErrorMessageData) StatusCode() int {
	return error.ErrStatusCode
}

func (error *ErrorMessageData) ErrorStatus() string {
	return error.ErrStatus
}

func NotFound(message string) ErrorMessage {
	return &ErrorMessageData{
		ErrMessage:  message,
		ErrStatusCode: http.StatusNotFound,
		ErrStatus: "Not Found",
	}
}

func BadRequest(message string) ErrorMessage {
	return &ErrorMessageData{
		ErrMessage: message,
		ErrStatusCode: http.StatusBadRequest,
		ErrStatus: "Bad Request",
	}
}

func InternalServerError(message string) ErrorMessage {
	return &ErrorMessageData{
		ErrMessage: message,
		ErrStatusCode: http.StatusInternalServerError,
		ErrStatus: "Server Error",
	}
}

func UnprocessableEntity(message string) ErrorMessage {
	return &ErrorMessageData{
		ErrMessage: message,
		ErrStatusCode: http.StatusUnprocessableEntity,
		ErrStatus: "Invalid Request",
	}
}
