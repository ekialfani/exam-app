package services

import (
	"backend/internal/models"
	"backend/internal/repository"
	"backend/internal/utils/error_utils"
	lcm_algorithm_utils "backend/internal/utils/lcm_algorithm"
	"backend/internal/utils/token_utils"
)

type examServiceRepo interface {
	CreateExam(*models.Exam, uint) (*models.Exam, error_utils.ErrorMessage)
	GetAllExamsByLecturerId(uint) ([]*models.ExamResponse, error_utils.ErrorMessage)
	GetAllExams() ([]*models.Exam, error_utils.ErrorMessage)
	GetAllExamReports(uint) ([]*models.ExamResponse, error_utils.ErrorMessage)
	GetExamReportByExamId(uint) (*models.ExamResponse, error_utils.ErrorMessage)
	GetExamById(uint) (*models.ExamResponse, error_utils.ErrorMessage)
	GetExamByToken(string) (*models.Exam, error_utils.ErrorMessage)
	GetExamWithShuffledQuestions(uint) (*models.Exam, error_utils.ErrorMessage)
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

func (es *examService) GetAllExams() ([]*models.Exam, error_utils.ErrorMessage) {
	examsResponse, err := repository.ExamRepository.GetAllExams()

	if err != nil {
		return nil, err
	}

	return examsResponse, nil
}

func (es *examService) GetAllExamReports(lecturerId uint) ([]*models.ExamResponse, error_utils.ErrorMessage) {
	examsResponse, err := repository.ExamRepository.GetAllExamReports(lecturerId)

	if err != nil {
		return nil, err
	}

	return examsResponse, nil
}

func (es *examService) GetExamReportByExamId(examId uint) (*models.ExamResponse, error_utils.ErrorMessage) {
	examReportResponse, err := repository.ExamRepository.GetExamReportByExamId(examId)

	if err != nil {
		return nil, err
	}

	return examReportResponse, nil
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

func (es *examService) GetExamWithShuffledQuestions(examId uint) (*models.Exam, error_utils.ErrorMessage) {
	examResponse, err := repository.ExamRepository.GetExamWithShuffledQuestions(examId)

	if err != nil {
		return nil, err
	}

	if len(examResponse.Questions) == 0 {
		return examResponse, nil
	}

	shuffledQuestions := lcm_algorithm_utils.ShuffleQuestionsLCM(1, 3, len(examResponse.Questions), examResponse.Questions)

	examResponse.Questions = shuffledQuestions

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
