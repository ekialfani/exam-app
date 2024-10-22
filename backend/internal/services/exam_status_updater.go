package services

import (
	"backend/internal/models"
	"context"
	"log"
	"time"
)

func ScheduleExamStatusUpdater(ctx context.Context) {
	ticker := time.NewTicker(5 * time.Second)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			examsResponse, err := ExamService.GetAllExams()
			if err != nil {
				log.Printf("Gagal mengambil data ujian: %v", err)
				continue
			}

			currentTime := time.Now()

			for _, exam := range examsResponse {
				if currentTime.After(*exam.EndTime) && !exam.Status {
					updatedExam := &models.ExamUpdate{
						Title:       exam.Title,
						Description: exam.Description,
						Status:      true,
						StartTime:   exam.StartTime,
						EndTime:     exam.EndTime,
					}

					_, err := ExamService.UpdateExam(updatedExam, exam.ID)
					if err != nil {
						log.Printf("Gagal memperbarui status ujian %d: %v", exam.ID, err)
					}
				} else {
					updatedExam := &models.ExamUpdate{
						Title:       exam.Title,
						Description: exam.Description,
						Status:      false,
						StartTime:   exam.StartTime,
						EndTime:     exam.EndTime,
					}

					_, err := ExamService.UpdateExam(updatedExam, exam.ID)
					if err != nil {
						log.Printf("Gagal memperbarui status ujian %d: %v", exam.ID, err)
					}
				}
			}
		}
	}
}
