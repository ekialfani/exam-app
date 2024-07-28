package services

import (
	"backend/internal/models"
	"backend/internal/repository"
	"backend/internal/utils/error_utils"
)

type questionServiceRepo interface {
	CreateQuestion(*models.Question) (*models.Question, error_utils.ErrorMessage)
	GetQuestionsByExamId(uint) ([]*models.Question, error_utils.ErrorMessage)
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

func (qs *questionService) GetQuestionsByExamId(examId uint) ([]*models.Question, error_utils.ErrorMessage) {
	questionsResponse, err := repository.QuestionRepository.GetQuestionsByExamId(examId)

	if err != nil {
		return nil, err
	}

	return questionsResponse, nil
}

var QuestionService questionServiceRepo = &questionService{}
