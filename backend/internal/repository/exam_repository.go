package repository

import (
	"backend/internal/database"
	"backend/internal/models"
	"backend/internal/utils/error_formats"
	"backend/internal/utils/error_utils"
)

type examDomainRepo interface {
	CreateExam(*models.Exam) (*models.Exam, error_utils.ErrorMessage)
	GetAllExams(uint) ([]*models.ExamResponse, error_utils.ErrorMessage)
}

type examDomain struct {}

func (ed *examDomain) CreateExam(examRequest *models.Exam) (*models.Exam, error_utils.ErrorMessage) {
	db := database.GetDB()
	err := db.Debug().Create(&examRequest).Error

	if err != nil {
		return nil, error_formats.ParseError(err)
	}

	return examRequest, nil
}

func (ed *examDomain) GetAllExams(lecturerID uint) ([]*models.ExamResponse, error_utils.ErrorMessage) {
	db := database.GetDB()
	var exams []*models.Exam
	var examsResponse []*models.ExamResponse

	err := db.Preload("Lecturer").Where("lecturer_id = ?", lecturerID).Find(&exams).Error

	if err != nil {
		return nil, error_formats.ParseError(err)
	}

	if len(exams) == 0 {
		return nil, error_utils.NotFound("Data masih kosong")
	}

	for _, exam := range exams {
		var newExam = models.ExamResponse{
			ID: exam.ID,
			LecturerID: exam.LecturerID,
			Lecturer: &models.LecturerResponse{
				ID: exam.Lecturer.ID,
				FullName: exam.Lecturer.FullName,
				Nip: exam.Lecturer.Nip,
				DateOfBirth: exam.Lecturer.DateOfBirth,
				Gender: exam.Lecturer.Gender,
				Email: exam.Lecturer.Email,
				Role: exam.Lecturer.Role,
				CreatedAt: exam.Lecturer.CreatedAt,
				UpdatedAt: exam.Lecturer.UpdatedAt,
			},
			Title: exam.Title,
			Description: exam.Description,
			Status: exam.Status,
			StartTime: exam.StartTime,
			EndTime: exam.EndTime,
			Token: exam.Token,
			CreatedAt: exam.CreatedAt,
			UpdatedAt: exam.UpdatedAt,
		}

		examsResponse = append(examsResponse, &newExam)
	}

	return examsResponse, nil
}

var ExamRepository examDomainRepo = &examDomain{}
