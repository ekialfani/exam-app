package models

import (
	"backend/internal/utils/error_utils"
	"time"

	"github.com/asaskevich/govalidator"
)

type Lecturer struct {
	GormModel
	FullName     string `gorm:"type:varchar(200);not null" json:"full_name" form:"full_name" valid:"required~Nama panjang tidak boleh kosong"`
	Nip          string `gorm:"type:varchar(200);not null;unique;" json:"nip" form:"nip" valid:"required~NIP wajib untuk disi"`
	DateOfBirth string `gorm:"type:date;not null" json:"date_of_birth" form:"date_of_birth" valid:"required~Tanggal lahir tidak boleh kosong"`
	Gender string `gorm:"type:ENUM('Laki-Laki', 'Perempuan');not null" json:"gender" form:"gender" valid:"required~Jenis kelamin tidak boleh kosong"`
	Email string `gorm:"type:varchar(200);not null;uniqueIndex" json:"email" form:"email" valid:"required~Email tidak boleh kosong, email~Format email salah"`
	Password string `gorm:"type:varchar(200);not null" json:"password" form:"password" valid:"required~Password wajib tidak boleh kosong, minstringlength(6)~Password harus lebih dari 6 karakter"`
	Role string `gorm:"type:ENUM('Dosen', 'Mahasiswa');not null" json:"role" form:"role" valid:"required~Status tidak boleh kosong"`
	Exams []Exam
}

func (l *Lecturer) Validate() error_utils.ErrorMessage {
	_, err := govalidator.ValidateStruct(l)

	if err != nil {
		return error_utils.BadRequest(err.Error())
	}

	return nil
}

type LecturerResponse struct {
	ID uint `json:"id"`
	FullName     string `json:"full_name"`
	Nip          string `json:"nip"`
	DateOfBirth string `json:"date_of_birth"`
	Gender string `json:"gender"`
	Email string `json:"email"`
	Role string `json:"role"`
	CreatedAt *time.Time `json:"created_at"`
	UpdatedAt *time.Time `json:"updated_at"`
}

type LecturerUpdate struct {
	FullName     string `gorm:"type:varchar(200);not null" json:"full_name" form:"full_name" valid:"required~Nama panjang tidak boleh kosong"`
	Nip          string `gorm:"type:varchar(200);not null;unique;" json:"nip" form:"nip" valid:"required~NIP wajib untuk disi"`
	DateOfBirth string `gorm:"type:date;not null" json:"date_of_birth" form:"date_of_birth" valid:"required~Tanggal lahir tidak boleh kosong"`
	Gender string `gorm:"type:ENUM('Laki-Laki', 'Perempuan');not null" json:"gender" form:"gender" valid:"required~Jenis kelamin tidak boleh kosong"`
	Email string `gorm:"type:varchar(200);not null;uniqueIndex" json:"email" form:"email" valid:"required~Email tidak boleh kosong, email~Format email salah"`
	UpdatedAt *time.Time `json:"updated_at,omitempty"`
}

func (lu *LecturerUpdate) Validate() error_utils.ErrorMessage {
	_, err := govalidator.ValidateStruct(lu)

	if err != nil {
		return error_utils.BadRequest(err.Error())
	}

	return nil
}
