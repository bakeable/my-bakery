package project

type Project struct {
	ID               int     `json:"id" insert:"false" retrieve:"true"`
	CreatedTimestamp string  `json:"created_timestamp" insert:"false" retrieve:"true"`
	CustomerId       int     `json:"customer_id" insert:"true" retrieve:"true"`
	CustomerName     string  `json:"customer_name" insert:"false" retrieve:"true"`
	Description      string  `json:"description" insert:"true" retrieve:"true"`
	Name             string  `json:"name" insert:"true" retrieve:"true"`
	Progress         int     `json:"progress" insert:"true" retrieve:"true"`
	Status           string  `json:"status" insert:"true" retrieve:"true"`
	Wage             float64 `json:"wage" insert:"true" retrieve:"true"`
}
