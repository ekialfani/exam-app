package services

import (
	"backend/internal/models"
	"backend/internal/repository"
	"backend/internal/utils/bcrypt_utils"
	"backend/internal/utils/error_utils"
)

type studentServiceRepo interface {
	Register(*models.Student) (*models.StudentResponse, error_utils.ErrorMessage)
	UpdateStudent(*models.UpdateStudent, uint) (*models.StudentResponse, error_utils.ErrorMessage)
	DeleteStudent(uint) (string, error_utils.ErrorMessage)
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

func (ss *studentService) UpdateStudent(updatedStudent *models.UpdateStudent, studentId uint) (*models.StudentResponse, error_utils.ErrorMessage) {
	if err := updatedStudent.Validate(); err != nil {
		return nil, err
	}

	studentResponse, err := repository.StudentRepository.UpdateStudent(updatedStudent, studentId)

	if err != nil {
		return nil, err
	}

	return studentResponse, nil
}

func (ss *studentService) DeleteStudent(studentId uint) (string, error_utils.ErrorMessage) {
	message, err := repository.StudentRepository.DeleteStudent(studentId)

	if err != nil {
		return "", nil
	}

	return message, nil
}

var StudentService studentServiceRepo = &studentService{}
