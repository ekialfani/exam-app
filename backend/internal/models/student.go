package models

import (
	"backend/internal/utils/error_utils"
	"time"

	"github.com/asaskevich/govalidator"
)

type Student struct {
	GormModel
	FullName    string `gorm:"type:varchar(200);not null" json:"full_name" form:"full_name" valid:"required~Nama panjang tidak boleh kosong"`
	Nim         string `gorm:"type:varchar(10);not null;unique" json:"nim" form:"nim" valid:"required~NIM tidak boleh kosong"`
	DateOfBirth string `gorm:"type:date;not null" json:"date_of_birth" form:"date_of_birth" valid:"required~Tanggal lahir tidak boleh kosong"`
	Gender      string `gorm:"type:ENUM('Laki-Laki', 'Perempuan');not null" json:"gender" form:"gender" valid:"required~Jenis kelamin tidak boleh kosong"`
	Major       string `gorm:"type:varchar(200);not null" json:"major" form:"major" valid:"required~Jurusan tidak boleh kosong"`
	Semester    string `gorm:"type:varchar(200);not null" json:"semester" form:"semester" valid:"required~Semester tidak boleh kosong"`
	Class       string `gorm:"type:varchar(200);not null" json:"class" form:"class" valid:"required~Kelas tidak boleh kosong"`
	Email       string `gorm:"type:varchar(200);not null;uniqueIndex" json:"email" form:"email" valid:"required~Email tidak boleh kosong, email~Format email salah"`
	Password    string `gorm:"type:varchar(200);not null" json:"password" form:"password" valid:"required~Password tidak boleh kosong,minstringlength(6)~Password tidak boleh kurang dari 6 karakter"`
	Role        string `gorm:"type:ENUM('Dosen', 'Mahasiswa'); not null" json:"role" form:"role" valid:"required~Role tidak boleh kosong"`
	ExamAssignments []ExamAssignment `gorm:"many2many:exam_assignments;"`
}

func (s *Student) Validate() error_utils.ErrorMessage {
	_, err := govalidator.ValidateStruct(s)

	if err != nil {
		return error_utils.BadRequest(err.Error())
	}

	return nil
}

type StudentResponse struct {
	ID uint `json:"id"`
	FullName    string `json:"full_name"`
	Nim         string `json:"nim"`
	DateOfBirth string `json:"date_of_birth"`
	Gender      string `json:"gender"`
	Major       string `json:"major"`
	Semester    string `json:"semester"`
	Class       string `json:"class"`
	Email       string `json:"email"`
	Role        string `json:"role"`
	CreatedAt *time.Time `json:"created_at"`
	UpdatedAt *time.Time `json:"updated_at"`
}

type UpdateStudent struct {
	FullName    string `gorm:"type:varchar(200);not null" json:"full_name" form:"full_name" valid:"required~Nama panjang tidak boleh kosong"`
	Nim         string `gorm:"type:varchar(10);not null;unique" json:"nim" form:"nim" valid:"required~NIM tidak boleh kosong"`
	DateOfBirth string `gorm:"type:date;not null" json:"date_of_birth" form:"date_of_birth" valid:"required~Tanggal lahir tidak boleh kosong"`
	Gender      string `gorm:"type:ENUM('Laki-Laki', 'Perempuan');not null" json:"gender" form:"gender" valid:"required~Jenis kelamin tidak boleh kosong"`
	Major       string `gorm:"type:varchar(200);not null" json:"major" form:"major" valid:"required~Jurusan tidak boleh kosong"`
	Semester    string `gorm:"type:varchar(200);not null" json:"semester" form:"semester" valid:"required~Semester tidak boleh kosong"`
	Class       string `gorm:"type:varchar(200);not null" json:"class" form:"class" valid:"required~Kelas tidak boleh kosong"`
	Email       string `gorm:"type:varchar(200);not null;uniqueIndex" json:"email" form:"email" valid:"required~Email tidak boleh kosong, email~Format email salah"`
	UpdatedAt *time.Time `json:"updated_at,omitempty"`
}

func (us *UpdateStudent) Validate() error_utils.ErrorMessage {
	_, err := govalidator.ValidateStruct(us)

	if err != nil {
		return error_utils.BadRequest(err.Error())
	}

	return nil
}
