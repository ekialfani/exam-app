package repository

import (
	"backend/internal/database"
	"backend/internal/models"
	"backend/internal/utils/error_utils"
)

type userLoginDomainRepo interface {
	Login(*models.UserLogin) (*models.UserLoginResponse, error_utils.ErrorMessage)
}

type userLoginDomain struct {}

func (uld *userLoginDomain) Login(userRequest *models.UserLogin) (*models.UserLoginResponse, error_utils.ErrorMessage) {
	db := database.GetDB()
	var student *models.Student
	var lecturer *models.Lecturer
	var userLoginResponse *models.UserLoginResponse

	err := db.Where("email = ?", userRequest.Email).Take(&student).Error

	if err != nil {
		err = db.Where("email = ?", userRequest.Email).Take(&lecturer).Error

		if err != nil {
			return nil, error_utils.Unauthorized("Email/password salah")
		} else {
			userLoginResponse = &models.UserLoginResponse{
				ID: lecturer.ID,
				Email: lecturer.Email,
				Password: lecturer.Password,
				Role: lecturer.Role,
			}
		}
	} else {
		userLoginResponse = &models.UserLoginResponse{
			ID: student.ID,
			Email: student.Email,
			Password: student.Password,
			Role: student.Role,
		}
	}

	return userLoginResponse, nil
}

var UserLoginRepository userLoginDomainRepo = &userLoginDomain{}
