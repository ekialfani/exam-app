package services

import (
	"backend/internal/models"
	"backend/internal/repository"
	"backend/internal/utils/error_utils"
)

type questionServiceRepo interface {
	CreateQuestion(*models.Question) (*models.Question, error_utils.ErrorMessage)
	GetQuestionsByExamId(uint) ([]*models.Question, error_utils.ErrorMessage)
	UpdateQuestion(*models.UpdateQuestion, uint) (*models.Question, error_utils.ErrorMessage)
	DeleteQuestion(uint) (string, error_utils.ErrorMessage)
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

func (qs *questionService) UpdateQuestion(updatedQuestion *models.UpdateQuestion, questionId uint) (*models.Question, error_utils.ErrorMessage) {
	err := updatedQuestion.Validate()

	if err != nil {
		return nil, err
	}

	questionResponse, err := repository.QuestionRepository.UpdateQuestion(updatedQuestion, questionId)

	if err != nil {
		return nil, err
	}

	return questionResponse, nil
}

func (qs *questionService) DeleteQuestion(questionId uint) (string, error_utils.ErrorMessage) {
	message, err := repository.QuestionRepository.DeleteQuestion(questionId)

	if err != nil {
		return "", err
	}

	return message, nil
}

var QuestionService questionServiceRepo = &questionService{}
