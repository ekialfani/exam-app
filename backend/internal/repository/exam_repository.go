package repository

import (
	"backend/internal/database"
	"backend/internal/models"
	"backend/internal/utils/error_formats"
	"backend/internal/utils/error_utils"
	"fmt"
)

type examDomainRepo interface {
	CreateExam(*models.Exam) (*models.Exam, error_utils.ErrorMessage)
	GetAllExams(uint) ([]*models.ExamResponse, error_utils.ErrorMessage)
	GetExamByToken(string) (*models.Exam, error_utils.ErrorMessage)
	UpdateExam(*models.ExamUpdate, uint) (*models.ExamResponse, error_utils.ErrorMessage)
	DeleteExam(uint) (string, error_utils.ErrorMessage)
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

func (ed *examDomain) GetExamByToken(examToken string) (*models.Exam, error_utils.ErrorMessage) {
	db := database.GetDB()
	var exam *models.Exam

	err := db.Where("token = ?", examToken).First(&exam).Error

	if err != nil {
		return nil, error_formats.ParseError(err)
	}

	return exam, nil
}

func (ed *examDomain) UpdateExam(updatedExam *models.ExamUpdate, examId uint) (*models.ExamResponse, error_utils.ErrorMessage) {
	db := database.GetDB()
	var exam models.Exam

	err := db.Model(&exam).Where("id = ?", examId).Updates(updatedExam).Error

	if err != nil {
		return nil, error_formats.ParseError(err)
	}

	db.Preload("Lecturer").First(&exam, examId)

	var examResponse = models.ExamResponse{
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

	return &examResponse, nil
}

func (ed *examDomain) DeleteExam(examId uint) (string, error_utils.ErrorMessage) {
	db := database.GetDB()
	var exam models.Exam
	var message string

	err := db.Where("id = ?", examId).Delete(&exam).Error

	if err != nil {
		message = ""
		return message, error_formats.ParseError(err)
	}

	message = fmt.Sprintf("Ujian dengan id %d berhasil dihapus", examId)

	return message, nil
}

var ExamRepository examDomainRepo = &examDomain{}
