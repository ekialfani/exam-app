package repository

import (
	"backend/internal/database"
	"backend/internal/models"
	"backend/internal/utils/error_formats"
	"backend/internal/utils/error_utils"
)

type studentDomainRepo interface {
	Register(*models.Student) (*models.StudentResponse, error_utils.ErrorMessage)
	UpdateStudent(*models.UpdateStudent, uint) (*models.StudentResponse, error_utils.ErrorMessage)
	DeleteStudent(uint) (string, error_utils.ErrorMessage)
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

func (sd *studenDomain) UpdateStudent(updatedStudent *models.UpdateStudent, studentId uint) (*models.StudentResponse, error_utils.ErrorMessage) {
	db := database.GetDB()
	var student *models.Student

	err := db.Model(&student).Where("id = ?", studentId).Updates(updatedStudent).Error

	if err != nil {
		return nil, error_formats.ParseError(err)
	}

	db.First(&student, studentId)

	var studentResponse = &models.StudentResponse{
		ID: student.ID,
		FullName: student.FullName,
		Nim: student.Nim,
		DateOfBirth: student.DateOfBirth,
		Gender: student.Gender,
		Major: student.Major,
		Semester: student.Semester,
		Class: student.Class,
		Email: student.Email,
		Role: student.Role,
		CreatedAt: student.CreatedAt,
		UpdatedAt: student.UpdatedAt,
	}

	return studentResponse, nil
}

func (sd *studenDomain) DeleteStudent(studentId uint) (string, error_utils.ErrorMessage) {
	db := database.GetDB()
	var student *models.Student
	var message string

	err := db.Where("id = ?", studentId).Delete(&student).Error

	if err != nil {
		message = ""
		return "", nil
	}

	message = "Akun berhasil dihapus"
	return message, nil
}

var StudentRepository studentDomainRepo = &studenDomain{}
