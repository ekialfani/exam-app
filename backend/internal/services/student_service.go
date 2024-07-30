package services

import (
	"backend/internal/models"
	"backend/internal/repository"
	"backend/internal/utils/bcrypt_utils"
	"backend/internal/utils/error_utils"
	"backend/internal/utils/token_utils"
)

type studentServiceRepo interface {
	Register(*models.Student) (*models.StudentResponse, error_utils.ErrorMessage)
	Login(*models.Student) (string, error_utils.ErrorMessage)
	UpdateStudent(*models.UpdateStudent, uint) (*models.StudentResponse, error_utils.ErrorMessage)
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

func (ss *studentService) Login(studentRequest *models.Student) (string, error_utils.ErrorMessage) {
	var password string = ""

	password = studentRequest.Password

	studentResponse, err := repository.StudentRepository.Login(studentRequest)

	if err != nil {
		return "", err
	}

	var comparedPassword bool = bcrypt_utils.ComparePassword([]byte(studentResponse.Password), []byte(password))

	if !comparedPassword {
		return "", error_utils.Unauthorized("Email/password salah")
	}

	var token string = token_utils.GenerateToken(studentResponse.ID, studentResponse.Email, studentResponse.Role)

	return token, nil
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

var StudentService studentServiceRepo = &studentService{}
