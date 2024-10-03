package repository

import (
	"backend/internal/database"
	"backend/internal/models"
	"backend/internal/utils/error_formats"
	"backend/internal/utils/error_utils"
)

type examResultDomainRepo interface {
	CreateExamResult(*models.ExamResult) (*models.ExamResult, error_utils.ErrorMessage)
}

type examResultDomain struct {}

func (erd *examResultDomain) CreateExamResult(examResultRequest *models.ExamResult) (*models.ExamResult, error_utils.ErrorMessage) {
	db := database.GetDB()

	err := db.Debug().Create(&examResultRequest).Error

	if err != nil {
		return nil, error_formats.ParseError(err)
	}

	return examResultRequest, nil
}

var ExamResultRepository examResultDomainRepo = &examResultDomain{}
