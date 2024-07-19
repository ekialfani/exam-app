package services

import (
	"backend/internal/models"
	"backend/internal/repository"
	"backend/internal/utils/bcrypt_utils"
	"backend/internal/utils/error_utils"
	"backend/internal/utils/generate_token_utils"
)

type lecturerServiceRepo interface {
	Register(*models.Lecturer) (*models.LecturerResponse, error_utils.ErrorMessage)
	Login(*models.Lecturer) (string, error_utils.ErrorMessage)
}

type lecturerService struct{}

func (lecturer *lecturerService) Register(lecturerRequest *models.Lecturer) (*models.LecturerResponse, error_utils.ErrorMessage) {
	err := lecturerRequest.Validate()

	if err != nil {
		return nil, err
	}

	lecturerRequest.Password = bcrypt_utils.HashPassword([]byte(lecturerRequest.Password))

	lecturerResponse, err := repository.LecturerRepository.Register(lecturerRequest)

	if err != nil {
		return nil, err
	}

	return lecturerResponse, nil
}

func (lecturer *lecturerService) Login(lecturerRequest *models.Lecturer) (string, error_utils.ErrorMessage) {
	var password string
	password = lecturerRequest.Password

	lecturerResponse, err := repository.LecturerRepository.Login(lecturerRequest)

	if err != nil {
		return "", err
	}

	comparedPassword := bcrypt_utils.ComparePassword([]byte(lecturerResponse.Password), []byte(password))

	if !comparedPassword {
		return "", error_utils.Unauthorized("Email/password salah")
	}

	token := generate_token_utils.GenerateToken(lecturerResponse.ID, lecturerResponse.Email, lecturerResponse.Role)

	return token, nil
}

var LecturerService lecturerServiceRepo = &lecturerService{}
