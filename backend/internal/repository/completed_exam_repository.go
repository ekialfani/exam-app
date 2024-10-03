package repository

import (
	"backend/internal/database"
	"backend/internal/models"
	"backend/internal/utils/error_formats"
	"backend/internal/utils/error_utils"
)

type completedExamDomainRepo interface {
	CreateCompletedExam(*models.CompletedExam) (*models.CompletedExam, error_utils.ErrorMessage)
}

type completedExamDomain struct {}

func (ced *completedExamDomain) CreateCompletedExam(completedExamRequest *models.CompletedExam) (*models.CompletedExam, error_utils.ErrorMessage) {
	db := database.GetDB()

	err := db.Debug().Create(&completedExamRequest).Error

	if err != nil {
		return nil, error_formats.ParseError(err)
	}

	return completedExamRequest, nil
}

var CompletedExamRepository completedExamDomainRepo = &completedExamDomain{}
