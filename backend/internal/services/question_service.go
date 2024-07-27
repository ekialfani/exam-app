package services

import (
	"backend/internal/models"
	"backend/internal/repository"
	"backend/internal/utils/error_utils"
)

type questionServiceRepo interface {
	CreateQuestion(*models.Question) (*models.Question, error_utils.ErrorMessage)
}

type questionService struct {}

func (qs *questionService) CreateQuestion(questionRequest *models.Question) (*models.Question, error_utils.ErrorMessage) {
	err := questionRequest.Validate()

	if err != nil {
		return nil, err
	}

	questionResponse, err := repository.QuestionRepository.CreateQuestion(questionRequest)

	if err != nil {
		return nil, err
	}

	return questionResponse, nil
}

var QuestionService questionServiceRepo = &questionService{}
