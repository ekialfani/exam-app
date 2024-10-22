package repository

import (
	"backend/internal/database"
	"backend/internal/models"
	"backend/internal/utils/error_formats"
	"backend/internal/utils/error_utils"
	"fmt"
	"path/filepath"
)

type examAssignmentDomainRepo interface {
	CreateExamAssignment(*models.ExamAssignment) (*models.ExamAssignmentResponse, error_utils.ErrorMessage)
	GetAllExamAssignments(uint) ([]*models.ExamAssignmentResponse, error_utils.ErrorMessage)
	DeleteExamAssignment(uint, uint) (string, error_utils.ErrorMessage)
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

func (ead *examAssignmentDomain) GetAllExamAssignments(studentId uint) ([]*models.ExamAssignmentResponse, error_utils.ErrorMessage) {
	db := database.GetDB()
	var examAssignments []*models.ExamAssignment
	var examAssignmentsResponse []*models.ExamAssignmentResponse

	err := db.Preload("Exam.Lecturer").Preload("Exam.BackgroundImage").Preload("Exam.Questions").Where("student_id = ?", studentId).Find(&examAssignments).Error

	if err != nil {
		return nil, error_formats.ParseError(err)
	}

	if len(examAssignments) == 0 {
		return nil, error_utils.NotFound("Data tidak ditemukan")
	}

	for _, examAssignment := range examAssignments {
		var newExamAssignment = &models.ExamAssignmentResponse{
			StudentID: examAssignment.StudentID,
			ExamID: examAssignment.ExamID,
			Exam: &models.ExamResponse{
				ID: examAssignment.ExamID,
				LecturerID: examAssignment.Exam.LecturerID,
				Lecturer: &models.LecturerResponse{
					ID: examAssignment.Exam.LecturerID,
					FullName: examAssignment.Exam.Lecturer.FullName,
					Nip: examAssignment.Exam.Lecturer.Nip,
					DateOfBirth: examAssignment.Exam.Lecturer.DateOfBirth,
					Gender: examAssignment.Exam.Lecturer.Gender,
					Email: examAssignment.Exam.Lecturer.Email,
					Role: examAssignment.Exam.Lecturer.Role,
					CreatedAt: examAssignment.Exam.Lecturer.CreatedAt,
					UpdatedAt: examAssignment.Exam.Lecturer.UpdatedAt,
				},
				BackgroundImage: func() string {
					if examAssignment.Exam.BackgroundImage != nil && examAssignment.Exam.BackgroundImage.Image != "" {
							return BASE_IMAGE_URL + filepath.Base(examAssignment.Exam.BackgroundImage.Image)
					}
					return ""
			}(),
				Title: examAssignment.Exam.Title,
				Description: examAssignment.Exam.Description,
				Status: examAssignment.Exam.Status,
				StartTime: examAssignment.Exam.StartTime,
				EndTime: examAssignment.Exam.EndTime,
				Token: examAssignment.Exam.Token,
				CreatedAt: examAssignment.Exam.CreatedAt,
				UpdatedAt: examAssignment.Exam.UpdatedAt,
				Questions: examAssignment.Exam.Questions,
			},
		}

		examAssignmentsResponse = append(examAssignmentsResponse, newExamAssignment)
	}

	return examAssignmentsResponse, nil
}

func (ead *examAssignmentDomain) DeleteExamAssignment(examId, studentId uint) (string, error_utils.ErrorMessage) {
	db := database.GetDB()
	var message string
	var examAssignment *models.ExamAssignment

	err := db.Where("exam_id = ?", examId).Where("student_id = ?", studentId).Delete(&examAssignment).Error

	if err != nil {
		message = ""
		return message, error_formats.ParseError(err)
	}

	message = fmt.Sprintf("Ujian dengan id %d berhasil dihapus", examId)
	return message, nil
}

var ExamAssignmentRepository examAssignmentDomainRepo = &examAssignmentDomain{}
