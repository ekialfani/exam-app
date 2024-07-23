package services

import (
	"backend/internal/models"
	"backend/internal/repository"
	"backend/internal/utils/bcrypt_utils"
	"backend/internal/utils/error_utils"
	"backend/internal/utils/token_utils"
)

type lecturerServiceRepo interface {
	Register(*models.Lecturer) (*models.LecturerResponse, error_utils.ErrorMessage)
	Login(*models.Lecturer) (string, error_utils.ErrorMessage)
	UpdateLecturer(*models.LecturerUpdate, uint) (*models.LecturerResponse, error_utils.ErrorMessage)
	DeleteLecturer(uint) (string, error_utils.ErrorMessage)
}

type lecturerService struct{}

func (ls *lecturerService) Register(lecturerRequest *models.Lecturer) (*models.LecturerResponse, error_utils.ErrorMessage) {
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

func (ls *lecturerService) Login(lecturerRequest *models.Lecturer) (string, error_utils.ErrorMessage) {
	var password string = ""
	password = lecturerRequest.Password

	lecturerResponse, err := repository.LecturerRepository.Login(lecturerRequest)

	if err != nil {
		return "", err
	}

	comparedPassword := bcrypt_utils.ComparePassword([]byte(lecturerResponse.Password), []byte(password))

	if !comparedPassword {
		return "", error_utils.Unauthorized("Email/password salah")
	}

	token := token_utils.GenerateToken(lecturerResponse.ID, lecturerResponse.Email, lecturerResponse.Role)

	return token, nil
}

func (ls *lecturerService) UpdateLecturer(updatedLecturer *models.LecturerUpdate, lecturerId uint) (*models.LecturerResponse, error_utils.ErrorMessage) {
	err := updatedLecturer.Validate()

	if err != nil {
		return nil, err
	}


	lecturerResponse, err := repository.LecturerRepository.UpdateLecturer(updatedLecturer, lecturerId)

	if err != nil {
		return nil, err
	}

	return lecturerResponse, nil
}

func (ls *lecturerService) DeleteLecturer(lecturerId uint) (string, error_utils.ErrorMessage) {
	message, err := repository.LecturerRepository.DeleteLecturer(lecturerId)

	if err != nil {
		return "", err
	}

	return message, nil
}

var LecturerService lecturerServiceRepo = &lecturerService{}
