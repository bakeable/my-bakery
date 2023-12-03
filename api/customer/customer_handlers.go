package customer

import (
	"my-bakery/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

// addCustomer handles POST requests to add a new customer
func AddCustomer(c *gin.Context, db *database.DB) {
	var p Customer
	if err := c.ShouldBindJSON(&p); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err := db.Exec("INSERT INTO customers (name, relation_number) VALUES (?, ?)", p.Name, p.RelationNumber)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusCreated)
}

// getCustomers handles GET requests to retrieve customers
func GetCustomers(c *gin.Context, db *database.DB) {
	rows, err := db.Query("SELECT id, name, relation_number FROM customers")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var customers []Customer
	for rows.Next() {
		var p Customer
		err := rows.Scan(&p.ID, &p.Name, &p.RelationNumber)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		customers = append(customers, p)
	}

	if err := rows.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, customers)
}
