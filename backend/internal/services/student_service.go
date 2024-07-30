package services

import (
	"backend/internal/models"
	"backend/internal/repository"
	"backend/internal/utils/bcrypt_utils"
	"backend/internal/utils/error_utils"
)

type studentServiceRepo interface {
	Register(*models.Student) (*models.StudentResponse, error_utils.ErrorMessage)
}

type studentService struct {}

func (ss *studentService) Register(studentRequest *models.Student) (*models.StudentResponse, error_utils.ErrorMessage) {
	err := studentRequest.Validate()

	if err != nil {
		return nil, err
	}

	studentRequest.Password = bcrypt_utils.HashPassword([]byte(studentRequest.Password))

	studentResponse, err := repository.StudentRepository.Register(studentRequest)

	if err != nil {
		return nil, err
	}

	return studentResponse, nil
}

var StudentService studentServiceRepo = &studentService{}
