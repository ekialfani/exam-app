package services

import (
	"backend/internal/models"
	"backend/internal/repository"
	"backend/internal/utils/error_utils"
	"backend/internal/utils/token_utils"
)

type examServiceRepo interface {
	CreateExam(*models.Exam, uint) (*models.Exam, error_utils.ErrorMessage)
	GetAllExams(uint) ([]*models.ExamResponse, error_utils.ErrorMessage)
	UpdateExam(*models.ExamUpdate, uint) (*models.ExamResponse, error_utils.ErrorMessage)
}

type examService struct {}

func (es *examService) CreateExam(examRequest *models.Exam, lecturerID uint) (*models.Exam, error_utils.ErrorMessage) {
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

func (es *examService) GetAllExams(lecturerID uint) ([]*models.ExamResponse, error_utils.ErrorMessage) {
	examsResponse, err := repository.ExamRepository.GetAllExams(lecturerID)

	if err != nil {
		return nil, err
	}

	return examsResponse, nil
}

func (es *examService) UpdateExam(updatedExam *models.ExamUpdate, examId uint) (*models.ExamResponse, error_utils.ErrorMessage) {
	err := updatedExam.Validate()

	if err != nil {
		return nil, err
	}

	examResponse, err := repository.ExamRepository.UpdateExam(updatedExam, examId)

	if err != nil {
		return nil, err
	}

	return examResponse, nil
}

var ExamService examServiceRepo = &examService{}
