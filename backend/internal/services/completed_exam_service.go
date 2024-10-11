package services

import (
	"backend/internal/models"
	"backend/internal/repository"
	"backend/internal/utils/error_utils"
)

type completedServiceRepo interface {
	CreateCompletedExam(*models.CompletedExam) (*models.CompletedExam, error_utils.ErrorMessage)
	GetAllCompletedExams(uint) ([]*models.CompletedExamResponse, error_utils.ErrorMessage)
	GetCompletedExamDetail(uint, uint) (*models.CompletedExamDetailResponse, error_utils.ErrorMessage)
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

func (ces *completedExamService) GetAllCompletedExams(studentId uint) ([]*models.CompletedExamResponse, error_utils.ErrorMessage) {
	completedExamResponse, err := repository.CompletedExamRepository.GetAllCompletedExams(studentId)

	if err != nil {
		return nil, err
	}

	return completedExamResponse, nil
}

func (ces *completedExamService) GetCompletedExamDetail(studentId, examId uint) (*models.CompletedExamDetailResponse, error_utils.ErrorMessage) {
	completedExamDetailRespone, err := repository.CompletedExamRepository.GetCompletedExamDetail(studentId, examId)

	if err != nil {
		return nil, err
	}

	return completedExamDetailRespone, nil
}

var CompletedExamService completedServiceRepo = &completedExamService{}
