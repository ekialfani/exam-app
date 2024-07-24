package services

import (
	"backend/internal/models"
	"backend/internal/repository"
	"backend/internal/utils/error_utils"
	"backend/internal/utils/token_utils"
)

type examServiceRepo interface {
	CreateExam(*models.Exam, uint) (*models.Exam, error_utils.ErrorMessage)
}

type examService struct {}

func (e *examService) CreateExam(examRequest *models.Exam, lecturerID uint) (*models.Exam, error_utils.ErrorMessage) {
	err := examRequest.Validate()

	if err != nil {
		return nil, err
	}

	examRequest.LecturerID = lecturerID
	examRequest.Token = token_utils.GenerateExamToken(5)

	examResponse, err := repository.ExamRepository.CreateExam(examRequest)

	if err != nil {
		return nil, err
	}

	return examResponse, nil
}

var ExamService examServiceRepo = &examService{}
