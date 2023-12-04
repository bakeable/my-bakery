package metrics

type DashboardMetrics struct {
	TasksFinishedCurrentMonth int     `json:"tasks_finished_current_month" insert:"false" retrieve:"true"`
	TasksFinishedToday        int     `json:"tasks_finished_today" insert:"false" retrieve:"true"`
	TotalHoursCurrentMonth    float64 `json:"total_hours_current_month" insert:"false" retrieve:"true"`
	TotalHoursToday           float64 `json:"total_hours_today" insert:"false" retrieve:"true"`
	TotalEarnedCurrentMonth   float64 `json:"total_earned_amount_current_month" insert:"false" retrieve:"true"`
	TotalEarnedToday          float64 `json:"total_earned_amount_today" insert:"false" retrieve:"true"`
}
