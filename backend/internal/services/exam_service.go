package services

import (
	"backend/internal/models"
	"backend/internal/repository"
	"backend/internal/utils/error_utils"
	"backend/internal/utils/token_utils"
)

type examServiceRepo interface {
	CreateExam(*models.Exam, uint) (*models.Exam, error_utils.ErrorMessage)
	GetAllExamsByLecturerId(uint) ([]*models.ExamResponse, error_utils.ErrorMessage)
	GetExamById(uint) (*models.ExamResponse, error_utils.ErrorMessage)
	GetExamByToken(string) (*models.Exam, error_utils.ErrorMessage)
	UpdateExam(*models.ExamUpdate, uint) (*models.ExamResponse, error_utils.ErrorMessage)
	DeleteExam(uint) (string, error_utils.ErrorMessage)
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

func (es *examService) GetAllExamsByLecturerId(lecturerID uint) ([]*models.ExamResponse, error_utils.ErrorMessage) {
	examsResponse, err := repository.ExamRepository.GetAllExamsByLecturerId(lecturerID)

	if err != nil {
		return nil, err
	}

	return examsResponse, nil
}

func (es *examService) GetExamById(examId uint) (*models.ExamResponse, error_utils.ErrorMessage) {
	examResponse, err := repository.ExamRepository.GetExamById(examId)

	if err != nil {
		return nil, err
	}

	return examResponse, nil
}

func (es *examService) GetExamByToken(examToken string) (*models.Exam, error_utils.ErrorMessage) {
	examResponse, err := repository.ExamRepository.GetExamByToken(examToken)

	if err != nil {
		return nil, err
	}

	return examResponse, nil
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

func (es *examService) DeleteExam(examId uint) (string, error_utils.ErrorMessage) {
	message, err := repository.ExamRepository.DeleteExam(examId)

	if err != nil {
		return "", nil
	}

	return message, nil
}

var ExamService examServiceRepo = &examService{}
