package services

import (
	"backend/internal/models"
	"backend/internal/repository"
	"backend/internal/utils/error_utils"
)

type examResultServiceRepo interface {
	CreateExamResult(*models.ExamResult) (*models.ExamResult, error_utils.ErrorMessage)
}

type examResultService struct {}

func (ers *examResultService) CreateExamResult(examResultRequest *models.ExamResult) (*models.ExamResult, error_utils.ErrorMessage) {
	if err := examResultRequest.Validate(); err != nil {
		return nil, err
	}

	examResultResponse, err := repository.ExamResultRepository.CreateExamResult(examResultRequest)

	if err != nil {
		return nil, err
	}

	return examResultResponse, nil
}

var ExamResultService examResultServiceRepo = &examResultService{}
