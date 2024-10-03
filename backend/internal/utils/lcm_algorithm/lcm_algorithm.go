package lcm_algorithm_utils

import (
	"backend/internal/models"
	"math/rand"
	"time"
)

// Shuffle exam questions using the Linear Congruential Method (LCM)
func randomNumber(maxValue int) int {
	return rand.New(rand.NewSource(time.Now().UTC().UnixNano())).Intn(maxValue)
}

func calculateNextLCM(a, c, m, prevXn int) int {
	return (a*prevXn + c) % m
}

func ShuffleQuestionsLCM(a int, c int, m int, questions []models.Question) ([]models.Question) {
	var shuffledQuestions []models.Question
	prevXn := randomNumber(m)

	for i := 0; i < m; i++ {
		if m <= 3 {
			a = 1
			c = 1
		}

		xn := calculateNextLCM(a, c, m, prevXn)
		shuffledQuestions = append(shuffledQuestions, questions[xn])
		prevXn = xn
	}

	return shuffledQuestions
}
