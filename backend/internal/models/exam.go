package models

import (
	"backend/internal/utils/error_utils"
	"time"

	"github.com/asaskevich/govalidator"
)

type Exam struct {
	GormModel
	LecturerID uint	`json:"lecturer_id"`
	Title       string `gorm:"type:varchar(200);not null" json:"title" form:"title" valid:"required~Judul ujian tidak boleh kosong"`
	Description string `gorm:"type:text" json:"description" form:"description"`
	Status      bool   `gorm:"not null;default:false" json:"status" form:"status"`
	StartTime   *time.Time `gorm:"not null" json:"start_time" form:"start_time" valid:"required~Waktu mulai ujian tidak boleh kosong"`
	EndTime *time.Time `gorm:"not null" json:"end_time" form:"end_time" valid:"required~Waktu selesai ujian tidak boleh kosong"`
	Token string `json:"token" form:"token"`
}

func (e *Exam) Validate() error_utils.ErrorMessage {
	_, err := govalidator.ValidateStruct(e)

	if err != nil {
		return error_utils.BadRequest(err.Error())
	}

	return nil
}
