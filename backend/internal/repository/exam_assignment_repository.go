package repository

import (
	"backend/internal/database"
	"backend/internal/models"
	"backend/internal/utils/error_formats"
	"backend/internal/utils/error_utils"
)

type examAssignmentDomainRepo interface {
	CreateExamAssignment(*models.ExamAssignment) (*models.ExamAssignmentResponse, error_utils.ErrorMessage)
}

type examAssignmentDomain struct {}

func (ead *examAssignmentDomain) CreateExamAssignment(examAssignmentRequest *models.ExamAssignment) (*models.ExamAssignmentResponse, error_utils.ErrorMessage) {
	db := database.GetDB()

	err := db.Debug().Create(&examAssignmentRequest).Error

	if err != nil {
		return nil, error_formats.ParseError(err)
	}

	db.Preload("Exam.Lecturer").Preload("Exam.Questions").First(&examAssignmentRequest)

	var examAssignmentResponse = &models.ExamAssignmentResponse{
		StudentID: examAssignmentRequest.StudentID,
		ExamID: examAssignmentRequest.ExamID,
		Exam: &models.ExamResponse{
			ID: examAssignmentRequest.ExamID,
			LecturerID: examAssignmentRequest.Exam.LecturerID,
			Lecturer: &models.LecturerResponse{
				ID: examAssignmentRequest.Exam.LecturerID,
				FullName: examAssignmentRequest.Exam.Lecturer.FullName,
				Nip: examAssignmentRequest.Exam.Lecturer.Nip,
				DateOfBirth: examAssignmentRequest.Exam.Lecturer.DateOfBirth,
				Gender: examAssignmentRequest.Exam.Lecturer.Gender,
				Email: examAssignmentRequest.Exam.Lecturer.Email,
				Role: examAssignmentRequest.Exam.Lecturer.Role,
				CreatedAt: examAssignmentRequest.Exam.Lecturer.CreatedAt,
				UpdatedAt: examAssignmentRequest.Exam.Lecturer.UpdatedAt,
			},
			Title: examAssignmentRequest.Exam.Title,
			Description: examAssignmentRequest.Exam.Description,
			Status: examAssignmentRequest.Exam.Status,
			StartTime: examAssignmentRequest.Exam.StartTime,
			EndTime: examAssignmentRequest.Exam.EndTime,
			Token: examAssignmentRequest.Exam.Token,
			CreatedAt: examAssignmentRequest.Exam.CreatedAt,
			UpdatedAt: examAssignmentRequest.Exam.UpdatedAt,
			Questions: examAssignmentRequest.Exam.Questions,
		},
	}

	return examAssignmentResponse, nil
}

var ExamAssignmentRepository examAssignmentDomainRepo = &examAssignmentDomain{}
