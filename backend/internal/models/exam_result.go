package models

import (
	"backend/internal/utils/error_utils"
	"time"

	"github.com/asaskevich/govalidator"
)

type ExamResult struct {
	StudentID uint `gorm:"primaryKey;not null" json:"student_id" form:"student_id" valid:"required~ID mahasiswa tidak boleh kosong"`
	ExamID    uint     `gorm:"primaryKey;not null" json:"exam_id" form:"exam_id" valid:"required~ID ujian tidak boleh kosong"`
	Grade uint `json:"grade" form:"grade" valid:"range(0|100)~Nilai tidak boleh lebih dari 100"`
	TotalCorrect uint `json:"total_correct" form:"total_correct"`
	TotalIncorrect uint `json:"total_incorrect" form:"total_incorrect"`
	ExamDate  *time.Time `json:"exam_date,omitempty"`
	Student *Student `json:"student"`
	Exam      *Exam    `json:"exam"`
}

func (er *ExamResult) Validate() error_utils.ErrorMessage {
	_, err := govalidator.ValidateStruct(er)

	if err != nil {
		return error_utils.BadRequest(err.Error())
	}

	return nil
}

type ExamResultResponse struct {
	StudentID uint `json:"student_id"`
	ExamID    uint     `json:"exam_id"`
	Grade uint `json:"grade"`
	TotalCorrect uint `json:"total_correct"`
	TotalIncorrect uint `json:"total_incorrect"`
	ExamDate  *time.Time `json:"exam_date"`
	Student *StudentResponse `json:"student"`
	Exam      *Exam    `json:"exam"`
}
