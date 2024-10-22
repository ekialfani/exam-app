package repository

import (
	"backend/internal/database"
	"backend/internal/models"
	"backend/internal/utils/error_formats"
	"backend/internal/utils/error_utils"
	"path/filepath"
)

type completedExamDomainRepo interface {
	CreateCompletedExam(*models.CompletedExam) (*models.CompletedExam, error_utils.ErrorMessage)
	GetAllCompletedExams(uint) ([]*models.CompletedExamResponse, error_utils.ErrorMessage)
	GetCompletedExamDetail(uint, uint) (*models.CompletedExamDetailResponse, error_utils.ErrorMessage)
}

type completedExamDomain struct {}

func (ced *completedExamDomain) CreateCompletedExam(completedExamRequest *models.CompletedExam) (*models.CompletedExam, error_utils.ErrorMessage) {
	db := database.GetDB()

	err := db.Debug().Create(&completedExamRequest).Error

	if err != nil {
		return nil, error_formats.ParseError(err)
	}

	return completedExamRequest, nil
}

func (ced *completedExamDomain) GetAllCompletedExams(studentId uint) ([]*models.CompletedExamResponse, error_utils.ErrorMessage) {
	db := database.GetDB()

	var completedExams []*models.CompletedExam

	var completedExamsResponse []*models.CompletedExamResponse

	err := db.Preload("Exam").Preload("Exam.BackgroundImage").Preload("Exam.Lecturer").Preload("Exam.Questions").Where("student_id = ?", studentId).Find(&completedExams).Error

	if err != nil {
		return nil, error_formats.ParseError(err)
	}

	for _, completedExam := range completedExams {
		var newCompletedExams = &models.CompletedExamResponse{
			StudentID: completedExam.StudentID,
			ExamID: completedExam.ExamID,
			Exam: &models.ExamResponse{
				ID: completedExam.ExamID,
				LecturerID: completedExam.Exam.Lecturer.ID,
				Lecturer: &models.LecturerResponse{
					ID: completedExam.Exam.LecturerID,
					FullName: completedExam.Exam.Lecturer.FullName,
				},
				BackgroundImage: func() string {
					if completedExam.Exam.BackgroundImage != nil && completedExam.Exam.BackgroundImage.Image != "" {
							return BASE_IMAGE_URL + filepath.Base(completedExam.Exam.BackgroundImage.Image)
					}
					return ""
			}(),
				Title: completedExam.Exam.Title,
				Description: completedExam.Exam.Description,
				Status: completedExam.Exam.Status,
				StartTime: completedExam.Exam.StartTime,
				EndTime: completedExam.Exam.EndTime,
				Token: completedExam.Exam.Token,
				CreatedAt: completedExam.Exam.CreatedAt,
				UpdatedAt: completedExam.Exam.UpdatedAt,
			},
			QuestionsLength: len(completedExam.Exam.Questions),
		}

		completedExamsResponse = append(completedExamsResponse, newCompletedExams)
	}

	return completedExamsResponse, nil
}

func (ced *completedExamDomain) GetCompletedExamDetail(studentId, examId uint) (*models.CompletedExamDetailResponse, error_utils.ErrorMessage) {
	db := database.GetDB()

	var completedExam *models.CompletedExam
	var examResult *models.ExamResult

	err := db.Preload("Exam").Preload("Exam.BackgroundImage").Preload("Exam.Lecturer").Preload("Exam.Questions").Where("exam_id = ?", examId).First(&completedExam).Error

	if err != nil {
		return nil, error_formats.ParseError(err)
	}

	err = db.Where("student_id = ?", studentId).Where("exam_id = ?", examId).First(&examResult).Error

	if err != nil {
		return nil, error_formats.ParseError(err)
	}

	var completedExamDetailResponse = &models.CompletedExamDetailResponse{
		StudentID: completedExam.StudentID,
		ExamID: completedExam.ExamID,
		Exam: &models.ExamResponse{
			ID: completedExam.ExamID,
			LecturerID: completedExam.Exam.Lecturer.ID,
			Lecturer: &models.LecturerResponse{
				ID: completedExam.Exam.LecturerID,
				FullName: completedExam.Exam.Lecturer.FullName,
			},
			BackgroundImage: func() string {
				if completedExam.Exam.BackgroundImage != nil && completedExam.Exam.BackgroundImage.Image != "" {
						return BASE_IMAGE_URL + filepath.Base(completedExam.Exam.BackgroundImage.Image)
				}
				return ""
		}(),
			Title: completedExam.Exam.Title,
			Description: completedExam.Exam.Description,
			Status: completedExam.Exam.Status,
			StartTime: completedExam.Exam.StartTime,
			EndTime: completedExam.Exam.EndTime,
			Token: completedExam.Exam.Token,
			CreatedAt: completedExam.Exam.CreatedAt,
			UpdatedAt: completedExam.Exam.UpdatedAt,
		},
		QuestionsLength: len(completedExam.Exam.Questions),
		ExamResult: examResult,
	}

	return completedExamDetailResponse, nil
}

var CompletedExamRepository completedExamDomainRepo = &completedExamDomain{}
