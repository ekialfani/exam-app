package repository

import (
	"backend/internal/database"
	"backend/internal/models"
	"backend/internal/utils/error_formats"
	"backend/internal/utils/error_utils"
)

type studentDomainRepo interface {
	Register(*models.Student) (*models.StudentResponse, error_utils.ErrorMessage)
	Login(*models.Student) (*models.Student, error_utils.ErrorMessage)
}

type studenDomain struct {}

func (sd *studenDomain) Register(studentRequest *models.Student) (*models.StudentResponse, error_utils.ErrorMessage) {
	db := database.GetDB()

	err := db.Debug().Create(&studentRequest).Error

	if err != nil {
		return nil, error_formats.ParseError(err)
	}

	var studentResponse = &models.StudentResponse{
		ID: studentRequest.ID,
		FullName: studentRequest.FullName,
		Nim: studentRequest.Nim,
		DateOfBirth: studentRequest.DateOfBirth,
		Gender: studentRequest.Gender,
		Major: studentRequest.Major,
		Semester: studentRequest.Semester,
		Class: studentRequest.Class,
		Email: studentRequest.Email,
		Role: studentRequest.Role,
		CreatedAt: studentRequest.CreatedAt,
		UpdatedAt: studentRequest.UpdatedAt,
	}

	return studentResponse, nil
}

func (sd *studenDomain) Login(studentRequest *models.Student) (*models.Student, error_utils.ErrorMessage) {
	db := database.GetDB()

	err := db.Where("email = ?", studentRequest.Email).Take(&studentRequest).Error

	if err != nil {
		return nil, error_utils.Unauthorized("Email/password salah")
	}

	return studentRequest, nil
}

var StudentRepository studentDomainRepo = &studenDomain{}
