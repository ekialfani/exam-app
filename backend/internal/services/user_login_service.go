package services

import (
	"backend/internal/models"
	"backend/internal/repository"
	"backend/internal/utils/bcrypt_utils"
	"backend/internal/utils/error_utils"
	"backend/internal/utils/token_utils"
)

type userLoginServiceRepo interface {
	Login(*models.UserLogin) (string, error_utils.ErrorMessage)
}

type userLoginService struct {}

func (uls *userLoginService) Login(userRequest *models.UserLogin) (string, error_utils.ErrorMessage) {
	var password string = ""

	password = userRequest.Password

	userResponse, err := repository.UserLoginRepository.Login(userRequest)

	if err != nil {
		return "", err
	}

	var comparedPassword bool = bcrypt_utils.ComparePassword([]byte(userResponse.Password), []byte(password))

	if !comparedPassword {
		return "", error_utils.Unauthorized("Email/password salah")
	}

	var token string = token_utils.GenerateToken(userResponse.ID, userRequest.Email, userResponse.Role)

	return token, nil
}

var UserLoginService userLoginServiceRepo = &userLoginService{}
