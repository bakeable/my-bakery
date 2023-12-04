package work_session

type WorkSession struct {
	ID                int     `json:"id" insert:"false" retrieve:"true"`
	CreatedTimestamp  string  `json:"created_timestamp" insert:"false" retrieve:"true"`
	EarnedAmount      float64 `json:"earned_amount" insert:"false" retrieve:"true"`
	FinishedTimestamp string  `json:"finished_timestamp" insert:"true" retrieve:"true"`
	Hours             float64 `json:"hours" insert:"true" retrieve:"true"`
	ProjectId         int     `json:"project_id" insert:"true" retrieve:"true"`
	ProjectName       string  `json:"project_name" insert:"true" retrieve:"true"`
	StartedTimestamp  string  `json:"started_timestamp" insert:"true" retrieve:"true"`
}
