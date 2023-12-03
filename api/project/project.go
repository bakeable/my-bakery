package project

type Project struct {
	ID               int    `json:"id"`
	CreatedTimestamp string `json:"created_timestamp"`
	CustomerId       int    `json:"customer_id"`
	CustomerName     string `json:"customer_name"`
	Description      string `json:"description"`
	Name             string `json:"name"`
	Wage             int    `json:"wage"`
}
