package models

import (
	"backend/internal/utils/error_utils"

	"github.com/asaskevich/govalidator"
)

type UserLogin struct {
	Email    string `gorm:"not null" json:"email" form:"email" valid:"required~Email tidak boleh kosong, email~Format email salah"`
	Password string `gorm:"not null" json:"password" form:"password" valid:"required~Password tidak boleh kosong"`
}

func (ul *UserLogin) Validate() error_utils.ErrorMessage {
	_, err := govalidator.ValidateStruct(ul)

	if err != nil {
		return error_utils.BadRequest(err.Error())
	}

	return nil
}

type UserLoginResponse struct {
	ID uint
	Email string
	Password string
	Role string
}
