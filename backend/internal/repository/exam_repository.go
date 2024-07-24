package repository

import (
	"backend/internal/database"
	"backend/internal/models"
	"backend/internal/utils/error_formats"
	"backend/internal/utils/error_utils"
)

type examDomainRepo interface {
	CreateExam(*models.Exam) (*models.Exam, error_utils.ErrorMessage)
}

type examDomain struct {}

func (e *examDomain) CreateExam(examRequest *models.Exam) (*models.Exam, error_utils.ErrorMessage) {
	db := database.GetDB()
	err := db.Debug().Create(&examRequest).Error

	if err != nil {
		return nil, error_formats.ParseError(err)
	}

	return examRequest, nil
}

var ExamRepository examDomainRepo = &examDomain{}
