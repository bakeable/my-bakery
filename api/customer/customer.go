package customer

type Customer struct {
	ID               int    `json:"id" insert:"false" retrieve:"true"`
	CreatedTimestamp string `json:"created_timestamp" insert:"false" retrieve:"true"`
	Name             string `json:"name" insert:"true" retrieve:"true"`
	RelationNumber   int    `json:"relation_number" insert:"true" retrieve:"true"`
}
