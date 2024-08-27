package models

import (
	"backend/internal/utils/error_utils"
	"time"

	"github.com/asaskevich/govalidator"
)

type Question struct {
	GormModel
	ExamID        uint   `json:"exam_id" form:"exam_id"`
	Exam          *Exam  `json:"exam"`
	QuestionText  string `gorm:"type:text;not null" json:"question_text" form:"question_text" valid:"required~Pertanyaan tidak boleh kosong"`
	FirstOption   string `gorm:"type:text;not null" json:"first_option" form:"first_option" valid:"required~Opsi jawaban pertama tidak boleh kosong"`
	SecondOption  string `gorm:"type:text;not null" json:"second_option" form:"second_option" valid:"required~Opsi jawaban kedua tidak boleh kosong"`
	ThirdOption   string `gorm:"type:text;not null" json:"third_option" form:"third_option" valid:"required~Opsi jawaban ketiga tidak boleh kosong"`
	FourthOption  string `gorm:"type:text;not null" json:"fourth_option" form:"fourth_option" valid:"required~Opsi jawaban keempat tidak boleh kosong"`
	CorrectAnswer string `gorm:"type:text;not null" json:"correct_answer" form:"correct_answer" valid:"required~Kunci jawaban tidak boleh kosong"`
	Point         uint   `gorm:"not null" json:"point" form:"point" valid:"required~Bobot poin tidak boleh kosong"`
}

func (q *Question) Validate() error_utils.ErrorMessage {
	_, err := govalidator.ValidateStruct(q)

	if err != nil {
		return error_utils.BadRequest(err.Error())
	}

	return nil
}

type UpdateQuestion struct {
	QuestionText  string `gorm:"type:text;not null" json:"question_text" form:"question_text" valid:"required~Pertanyaan tidak boleh kosong"`
	FirstOption   string `gorm:"type:text;not null" json:"first_question" form:"first_option" valid:"required~Opsi jawaban pertama tidak boleh kosong"`
	SecondOption  string `gorm:"type:text;not null" json:"second_option" form:"second_option" valid:"required~Opsi jawaban kedua tidak boleh kosong"`
	ThirdOption   string `gorm:"type:text;not null" json:"third_option" form:"third_option" valid:"required~Opsi jawaban ketiga tidak boleh kosong"`
	FourthOption  string `gorm:"type:text;not null" json:"fourth_option" form:"fourth_option" valid:"required~Opsi jawaban keempat tidak boleh kosong"`
	CorrectAnswer string `gorm:"type:text;not null" json:"correct_answer" form:"correct_answer" valid:"required~Kunci jawaban tidak boleh kosong"`
	Point         uint   `gorm:"not null" json:"point" form:"point" valid:"required~Bobot poin tidak boleh kosong"`
	UpdatedAt *time.Time `json:"updated_at,omitempty"`
}

func (uq *UpdateQuestion) Validate() error_utils.ErrorMessage {
	_, err := govalidator.ValidateStruct(uq)

	if err != nil {
		return error_utils.BadRequest(err.Error())
	}

	return nil
}
