package models

import (
	"backend/internal/utils/error_utils"
	"time"

	"github.com/asaskevich/govalidator"
)

type Exam struct {
	GormModel
	LecturerID uint	`json:"lecturer_id"`
	Lecturer *Lecturer `json:"lecturer"`
	Title       string `gorm:"type:varchar(200);not null" json:"title" form:"title" valid:"required~Judul ujian tidak boleh kosong"`
	Description string `gorm:"type:text" json:"description" form:"description"`
	Status      bool   `gorm:"not null;default:false" json:"status" form:"status"`
	StartTime   *time.Time `gorm:"not null" json:"start_time" form:"start_time" valid:"required~Waktu mulai ujian tidak boleh kosong"`
	EndTime *time.Time `gorm:"not null" json:"end_time" form:"end_time" valid:"required~Waktu selesai ujian tidak boleh kosong"`
	Token string `json:"token" form:"token"`
	Questions []Question
}

func (e *Exam) Validate() error_utils.ErrorMessage {
	_, err := govalidator.ValidateStruct(e)

	if err != nil {
		return error_utils.BadRequest(err.Error())
	}

	return nil
}

type ExamResponse struct {
	ID uint `json:"id"`
	LecturerID uint	`json:"lecturer_id"`
	Lecturer *LecturerResponse `json:"lecturer"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Status      bool   `json:"status"`
	StartTime   *time.Time `json:"start_time"`
	EndTime *time.Time `json:"end_time"`
	Token string `json:"token"`
	CreatedAt *time.Time `json:"created_at"`
	UpdatedAt *time.Time `json:"updated_at"`
	Questions []Question
}

type ExamUpdate struct {
	Title       string `gorm:"type:varchar(200);not null" json:"title" form:"title" valid:"required~Judul ujian tidak boleh kosong"`
	Description string `gorm:"type:text" json:"description" form:"description"`
	Status      bool   `gorm:"not null;default:false" json:"status" form:"status"`
	StartTime   *time.Time `gorm:"not null" json:"start_time" form:"start_time" valid:"required~Waktu mulai ujian tidak boleh kosong"`
	EndTime *time.Time `gorm:"not null" json:"end_time" form:"end_time" valid:"required~Waktu selesai ujian tidak boleh kosong"`
}

func (eu *ExamUpdate) Validate() error_utils.ErrorMessage {
	_, err := govalidator.ValidateStruct(eu)

	if err != nil {
		return error_utils.BadRequest(err.Error())
	}

	return nil
}
