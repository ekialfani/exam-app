package services

import (
	"backend/internal/models"
	"backend/internal/repository"
	"backend/internal/utils/bcrypt_utils"
	"backend/internal/utils/error_utils"
)

type lecturerServiceRepo interface {
	Register(*models.Lecturer) (*models.LecturerResponse, error_utils.ErrorMessage)
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

var LecturerService lecturerServiceRepo = &lecturerService{}
