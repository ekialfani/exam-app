package repository

import (
	"backend/internal/database"
	"backend/internal/models"
	"backend/internal/utils/error_formats"
	"backend/internal/utils/error_utils"
)

type lecturerDomainRepo interface {
	Register(*models.Lecturer) (*models.LecturerResponse, error_utils.ErrorMessage)
}

type lecturerDomain struct {}

func (lecturer *lecturerDomain) Register(lecturerRequest *models.Lecturer) (*models.LecturerResponse, error_utils.ErrorMessage) {
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
	}

	return lecturerResponse, nil
}

var LecturerRepository lecturerDomainRepo = &lecturerDomain{}
