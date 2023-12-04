package customer

import (
	"context"
	"fmt"
	"my-bakery/database"
	"my-bakery/utils"
	"net/http"

	"github.com/georgysavva/scany/v2/sqlscan"
	"github.com/gin-gonic/gin"
)

// Variable declaration
const tableName = "customers"

// Add handles POST requests to add a new entity
func Add(c *gin.Context, db *database.DB) {
	var entity Customer
	if err := c.ShouldBindJSON(&entity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	query, values := utils.SQL_INSERT(entity, tableName)

	_, err := db.Exec(query, values...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusCreated)
}

// GetAll handles GET requests to retrieve entities
func GetAll(c *gin.Context, db *database.DB) {
	query := utils.SQL_SELECT(Customer{}, "customers")
	fmt.Println(query)

	ctx := context.Background()
	var entities []*Customer
	sqlscan.Select(ctx, db, &entities, query)

	c.JSON(http.StatusOK, entities)
}

// Get handles GET requests to retrieve a specific entity by ID
func Get(c *gin.Context, db *database.DB) {
	entityId := c.Param("id")

	query := utils.SQL_SELECT_BY_ID(Customer{}, "customers", entityId)

	ctx := context.Background()
	var entities []*Customer
	sqlscan.Select(ctx, db, &entities, query)

	if len(entities) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Customer not found"})
		return
	}

	c.JSON(http.StatusOK, entities[0])
}

// deleteCustomer handles DELETE requests to delete a specific entity by ID
func Delete(c *gin.Context, db *database.DB) {
	entityId := c.Param("id")

	query := utils.SQL_DELETE_BY_ID(tableName, entityId)

	_, err := db.Exec(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusNoContent)
}

// Update handles PUT or PATCH requests to update a specific entity by ID
func Update(c *gin.Context, db *database.DB) {
	entityId := c.Param("id")

	// Check if the entity with the given ID exists
	var existingEntity Customer
	err := db.QueryRow("SELECT id FROM "+tableName+" WHERE id = ?", entityId).
		Scan(&existingEntity.ID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Customer not found"})
		return
	}

	// Bind the request body to a Customer struct to get updated data
	var updatedEntity Customer
	if err := c.ShouldBindJSON(&updatedEntity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get query and values
	query, values := utils.SQL_UPDATE_BY_ID(updatedEntity, tableName, entityId)

	// Update the entity in the database
	_, err = db.Exec(query, values...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusNoContent)
}
