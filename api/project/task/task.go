package task

type Task struct {
	ID                int     `json:"id" insert:"false" retrieve:"true"`
	CreatedTimestamp  string  `json:"created_timestamp" insert:"false" retrieve:"true"`
	CommitId          string  `json:"commit_id" insert:"true" retrieve:"true"`
	Description       string  `json:"description" insert:"true" retrieve:"true"`
	DueDate           string  `json:"due_date" insert:"true" retrieve:"true"`
	EarnedAmount      float64 `json:"earned_amount" insert:"true" retrieve:"true"`
	FinishedTimestamp string  `json:"finished_timestamp" insert:"true" retrieve:"true"`
	Hours             float64 `json:"hours" insert:"true" retrieve:"true"`
	Priority          int     `json:"priority" insert:"true" retrieve:"true"`
	ProjectID         int     `json:"project_id" insert:"true" retrieve:"true"`
	StartedTimestamp  string  `json:"started_timestamp" insert:"true" retrieve:"true"`
	Status            string  `json:"status" insert:"true" retrieve:"true"`
	Title             string  `json:"title" insert:"true" retrieve:"true"`
}
