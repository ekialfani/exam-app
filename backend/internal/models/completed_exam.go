package models

import (
	"backend/internal/utils/error_utils"

	"github.com/asaskevich/govalidator"
)

type CompletedExam struct {
	StudentID uint     `gorm:"primaryKey" json:"student_id" form:"student_id" valid:"required~ID mahasiswa tidak boleh kosong"`
	ExamID    uint     `gorm:"primaryKey" json:"exam_id" form:"exam_id" valid:"required~ID ujian tidak boleh kosong"`
	Student   *Student `json:"student"`
	Exam      *Exam    `json:"exam"`
}

func (ce *CompletedExam) Validate() error_utils.ErrorMessage {
	_, err := govalidator.ValidateStruct(ce)

	if err != nil {
		return error_utils.BadRequest(err.Error())
	}

	return nil
}

type CompletedExamResponse struct {
	StudentID uint `json:"student_id"`
	ExamID uint `json:"exam_id"`
	Exam *ExamResponse `json:"exam"`
	QuestionsLength int `json:"questions_length"`
}

type CompletedExamDetailResponse struct {
	StudentID uint `json:"student_id"`
	ExamID uint `json:"exam_id"`
	Exam *ExamResponse `json:"exam"`
	QuestionsLength int `json:"questions_length"`
	ExamResult *ExamResult `json:"exam_result"`
}
