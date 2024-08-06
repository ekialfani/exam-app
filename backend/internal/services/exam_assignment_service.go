package services

import (
	"backend/internal/models"
	"backend/internal/repository"
	"backend/internal/utils/error_utils"
)

type examAssignmentServiceRepo interface {
	CreateExamAssignment(*models.ExamAssignment, uint) (*models.ExamAssignmentResponse, error_utils.ErrorMessage)
	GetAllExamAssignments(uint) ([]*models.ExamAssignmentResponse, error_utils.ErrorMessage)
	DeleteExamAssignment(uint) (string, error_utils.ErrorMessage)
}

type examAssignmentService struct {}

func (eas *examAssignmentService) CreateExamAssignment(examAssignmentRequest *models.ExamAssignment, studentId uint) (*models.ExamAssignmentResponse, error_utils.ErrorMessage) {
	if err := examAssignmentRequest.Validate(); err != nil {
		return nil, err
	}

	examAssignmentRequest.StudentID = studentId

	examAssignmentResponse, err := repository.ExamAssignmentRepository.CreateExamAssignment(examAssignmentRequest)

	if err != nil {
		return nil, err
	}

	return examAssignmentResponse, nil
}

func (eas *examAssignmentService) GetAllExamAssignments(studentId uint) ([]*models.ExamAssignmentResponse, error_utils.ErrorMessage) {
	examAssignmentsResponse, err := repository.ExamAssignmentRepository.GetAllExamAssignments(studentId)

	if err != nil {
		return nil, err
	}

	return examAssignmentsResponse, nil
}

func (eas *examAssignmentService) DeleteExamAssignment(examId uint) (string, error_utils.ErrorMessage) {
	message, err := repository.ExamAssignmentRepository.DeleteExamAssignment(examId)

	if err != nil {
		return "", err
	}

	return message, nil
}

var ExamAssignmentService examAssignmentServiceRepo = &examAssignmentService{}
