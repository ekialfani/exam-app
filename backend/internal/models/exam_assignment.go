package models

import (
	"backend/internal/utils/error_utils"

	"github.com/asaskevich/govalidator"
)

type ExamAssignment struct {
	StudentID uint     `gorm:"primaryKey" json:"student_id"`
	ExamID    uint     `gorm:"primaryKey;not null" json:"exam_id" form:"exam_id" valid:"required~ID ujian tidak boleh kosong"`
	Student   *Student `json:"student"`
	Exam      *Exam    `json:"exam"`
}

func (ea *ExamAssignment) Validate() error_utils.ErrorMessage {
	_, err := govalidator.ValidateStruct(ea)

	if err != nil {
		return error_utils.BadRequest(err.Error())
	}

	return nil
}

type ExamAssignmentResponse struct {
	StudentID uint `json:"student_id"`
	ExamID uint `json:"exam_id"`
	Exam *ExamResponse `json:"exam"`
}
