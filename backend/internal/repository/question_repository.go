package repository

import (
	"backend/internal/database"
	"backend/internal/models"
	"backend/internal/utils/error_formats"
	"backend/internal/utils/error_utils"
)

type questionDomainRepo interface {
	CreateQuestion(*models.Question) (*models.Question, error_utils.ErrorMessage)
	GetQuestionsByExamId(uint) ([]*models.Question, error_utils.ErrorMessage)
	UpdateQuestion(*models.UpdateQuestion, uint) (*models.Question, error_utils.ErrorMessage)
}

type questionDomain struct {}

func (qd *questionDomain) CreateQuestion(questionRequest *models.Question) (*models.Question, error_utils.ErrorMessage) {
	db := database.GetDB()

	err := db.Debug().Create(&questionRequest).Error

	if err != nil {
		return nil, error_formats.ParseError(err)
	}

	return questionRequest, nil
}

func (qd *questionDomain) GetQuestionsByExamId(examId uint) ([]*models.Question, error_utils.ErrorMessage) {
	db := database.GetDB()
	var questions []*models.Question

	err := db.Where("exam_id = ?", examId).Find(&questions).Error

	if err != nil {
		return nil, error_formats.ParseError(err)
	}

	if len(questions) == 0 {
		return nil, error_utils.NotFound("Data soal tidak ditemukan")
	}

	return questions, nil
}

func (qd *questionDomain) UpdateQuestion(updatedQuestion *models.UpdateQuestion, questionId uint) (*models.Question, error_utils.ErrorMessage) {
	db := database.GetDB()
	var question *models.Question

	err := db.Model(&question).Where("id = ?", questionId).Updates(updatedQuestion).Error

	if err != nil {
		return nil, error_formats.ParseError(err)
	}

	db.First(&question, questionId)

	return question, nil
}

var QuestionRepository questionDomainRepo = &questionDomain{}
