package client

type Client struct {
	ID             int    `json:"id"`
	Name           string `json:"name"`
	RelationNumber int    `json:"relation_number"`
}
