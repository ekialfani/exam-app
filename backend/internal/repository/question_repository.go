package repository

import (
	"backend/internal/database"
	"backend/internal/models"
	"backend/internal/utils/error_formats"
	"backend/internal/utils/error_utils"
)

type questionDomainRepo interface {
	CreateQuestion(*models.Question) (*models.Question, error_utils.ErrorMessage)
}

type questionDomain struct {}

func (qd *questionDomain) CreateQuestion(questionRequest *models.Question) (*models.Question, error_utils.ErrorMessage) {
	db := database.GetDB()

	err := db.Debug().Create(&questionRequest).Error

	if err != nil {
		return nil, error_formats.ParseError(err)
	}

	return questionRequest, nil
}

var QuestionRepository questionDomainRepo = &questionDomain{}
