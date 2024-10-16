package repository

import (
	"backend/internal/database"
	"backend/internal/models"
	"backend/internal/utils/error_formats"
	"backend/internal/utils/error_utils"
)

type lecturerDomainRepo interface {
	Register(*models.Lecturer) (*models.LecturerResponse, error_utils.ErrorMessage)
	GetLecturerById(uint) (*models.LecturerResponse, error_utils.ErrorMessage)
	UpdateLecturer(*models.LecturerUpdate, uint) (*models.LecturerResponse, error_utils.ErrorMessage)
	UpdatePassword(*models.UpdateLecturerPassword, uint) (string, error_utils.ErrorMessage)
	DeleteLecturer(uint) (string, error_utils.ErrorMessage)
}

type lecturerDomain struct {}

func (ld *lecturerDomain) Register(lecturerRequest *models.Lecturer) (*models.LecturerResponse, error_utils.ErrorMessage) {
	db := database.GetDB()

	err := db.Debug().Create(&lecturerRequest).Error

	if err != nil {
		return nil, error_formats.ParseError(err)
	}

	var lecturerResponse = &models.LecturerResponse{
		ID: lecturerRequest.ID,
		FullName: lecturerRequest.FullName,
		Nip: lecturerRequest.Nip,
		DateOfBirth: lecturerRequest.DateOfBirth,
		Gender: lecturerRequest.Gender,
		Email: lecturerRequest.Email,
		Role: lecturerRequest.Role,
		CreatedAt: lecturerRequest.CreatedAt,
		UpdatedAt: lecturerRequest.UpdatedAt,
	}

	return lecturerResponse, nil
}

func (ld *lecturerDomain) GetLecturerById(lecturerId uint) (*models.LecturerResponse, error_utils.ErrorMessage) {
	db := database.GetDB()
	var lecturer *models.Lecturer

	err := db.First(&lecturer, lecturerId).Error

	if err != nil {
		return nil, error_formats.ParseError(err)
	}

	var lecturerResponse = &models.LecturerResponse{
		ID: lecturer.ID,
		FullName: lecturer.FullName,
		Nip: lecturer.Nip,
		DateOfBirth: lecturer.DateOfBirth,
		Gender: lecturer.Gender,
		Email: lecturer.Email,
		Role: lecturer.Role,
		CreatedAt: lecturer.CreatedAt,
		UpdatedAt: lecturer.UpdatedAt,
	}

	return lecturerResponse, nil
}

func (ld *lecturerDomain) UpdateLecturer(updatedLecturer *models.LecturerUpdate, lecturerId uint) (*models.LecturerResponse, error_utils.ErrorMessage) {
	db := database.GetDB()
	var lecturer = models.Lecturer{}

	err := db.First(&lecturer, lecturerId).Error

	if err != nil {
		return nil, error_formats.ParseError(err)
	}

	err = db.Model(&lecturer).Updates(updatedLecturer).Error

	if err != nil {
		return nil, error_formats.ParseError(err)
	}

	var lecturerResponse = &models.LecturerResponse{
		ID: lecturer.ID,
		FullName: lecturer.FullName,
		Nip: lecturer.Nip,
		DateOfBirth: lecturer.DateOfBirth,
		Gender: lecturer.Gender,
		Email: lecturer.Email,
		Role: lecturer.Role,
		CreatedAt: lecturer.CreatedAt,
		UpdatedAt: lecturer.UpdatedAt,
	}

	return lecturerResponse, nil
}

func (ld *lecturerDomain) UpdatePassword(newPassword *models.UpdateLecturerPassword, lecturerId uint) (string, error_utils.ErrorMessage) {
	db := database.GetDB()
	var lecturer *models.Lecturer

	err := db.Model(&lecturer).Where("id = ?", lecturerId).Update("password", newPassword.Password).Error

	if err != nil {
		return "", error_formats.ParseError(err)
	}

	return "Password berhasil diperbarui", nil
}

func (ld *lecturerDomain) DeleteLecturer(lecturerId uint) (string, error_utils.ErrorMessage) {
	db := database.GetDB()
	var message string
	var lecturer = models.Lecturer{}

	err := db.Where("id = ?", lecturerId).Delete(&lecturer).Error

	if err != nil {
		message = ""
		return message, error_formats.ParseError(err)
	}

	message = "Akun berhasil dihapus"
	return message, nil
}

var LecturerRepository lecturerDomainRepo = &lecturerDomain{}
