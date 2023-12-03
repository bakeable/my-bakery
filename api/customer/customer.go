package customer

type Customer struct {
	ID               int    `json:"id"`
	CreatedTimestamp string `json:"created_timestamp"`
	Name             string `json:"name"`
	RelationNumber   int    `json:"relation_number"`
}
