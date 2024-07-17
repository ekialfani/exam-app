package models

import (
	"time"

	"github.com/asaskevich/govalidator"
)

type Lecture struct {
	GormModel
	FullName     string `gorm:"type:varchar(200);not null" json:"full_name" form:"full_name" valid:"required~Nama panjang tidak boleh kosong"`
	Nip          string `gorm:"type:varchar(200);not null;unique;" json:"nip" form:"nip" valid:"required~NIP wajib untuk disi"`
	DateOfBirth *time.Time `gorm:"type:date;not null" json:"date_of_birth" form:"date_of_birth" valid:"required~Tanggal lahir tidak boleh kosong"`
	Gender string `gorm:"type:ENUM('Laki-Laki', 'Perempuan');not null" json:"gender" form:"gender" valid:"required~Jenis kelamin tidak boleh kosong"`
	Email string `gorm:"type:varchar(200);not null;uniqueIndex" json:"email" form:"email" valid:"required~Email tidak boleh kosong, email~Format email salah"`
	Password string `gorm:"type:varchar(200);not null" json:"password" form:"password" valid:"required~Password wajib tidak boleh kosong, minstringlength(6)~Password harus lebih dari 6 karakter"`
	Role string `gorm:"type:ENUM('Dosen', 'Mahasiswa');not null" json:"role" form:"role" valid:"required~Status tidak boleh kosong"`
}

func (lecture *Lecture) Validate() error {
	_, err := govalidator.ValidateStruct(lecture)

	if err != nil {
		return err
	}

	return nil
}
