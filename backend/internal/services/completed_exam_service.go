package services

import (
	"backend/internal/models"
	"backend/internal/repository"
	"backend/internal/utils/error_utils"
)

type completedServiceRepo interface {
	CreateCompletedExam(*models.CompletedExam) (*models.CompletedExam, error_utils.ErrorMessage)
}

type completedExamService struct {}

func (ces *completedExamService) CreateCompletedExam(completedExamRequest *models.CompletedExam) (*models.CompletedExam, error_utils.ErrorMessage) {
	if err := completedExamRequest.Validate(); err != nil {
		return nil, err
	}

	completedExamResponse, err := repository.CompletedExamRepository.CreateCompletedExam(completedExamRequest)

	if err != nil {
		return nil, err
	}

	return completedExamResponse, nil
}

var CompletedExamService completedServiceRepo = &completedExamService{}
