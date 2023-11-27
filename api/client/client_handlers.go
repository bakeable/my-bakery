package client

import (
	"my-bakery/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

// addClient handles POST requests to add a new client
func AddClient(c *gin.Context, db *database.DB) {
	var p Client
	if err := c.ShouldBindJSON(&p); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err := db.Exec("INSERT INTO clients (name, relation_number) VALUES (?, ?)", p.Name, p.RelationNumber)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusCreated)
}

// getClients handles GET requests to retrieve clients
func GetClients(c *gin.Context, db *database.DB) {
	rows, err := db.Query("SELECT id, name, relation_number FROM clients")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var clients []Client
	for rows.Next() {
		var p Client
		err := rows.Scan(&p.ID, &p.Name, &p.RelationNumber)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		clients = append(clients, p)
	}

	if err := rows.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, clients)
}
