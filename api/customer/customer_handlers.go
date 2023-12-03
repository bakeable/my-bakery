package customer

import (
	"context"
	"my-bakery/database"
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

	_, err := db.Exec("INSERT INTO "+tableName+" (name, relation_number) VALUES (?, ?)", entity.Name, entity.RelationNumber)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusCreated)
}

// GetAll handles GET requests to retrieve entities
func GetAll(c *gin.Context, db *database.DB) {
	rows, err := db.Query("SELECT id, name, relation_number FROM " + tableName)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var entities []Customer
	for rows.Next() {
		var entity Customer
		err := rows.Scan(&entity.ID, &entity.Name, &entity.RelationNumber)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		entities = append(entities, entity)
	}

	if err := rows.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, entities)
}

// Get handles GET requests to retrieve a specific entity by ID
func Get(c *gin.Context, db *database.DB) {
	entityId := c.Param("id")

	query := "SELECT id, name, relation_number FROM " + tableName + " WHERE id = " + entityId

	ctx := context.Background()
	var entities []*Customer
	sqlscan.Select(ctx, db, &entities, query)

	c.JSON(http.StatusOK, entities[0])
}

// deleteCustomer handles DELETE requests to delete a specific entity by ID
func Delete(c *gin.Context, db *database.DB) {
	entityId := c.Param("id")

	_, err := db.Exec("DELETE FROM "+tableName+" WHERE id = ?", entityId)
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

	// Update the entity in the database
	_, err = db.Exec("UPDATE "+tableName+" SET name = ?, relation_number = ? WHERE id = ?",
		updatedEntity.Name, updatedEntity.RelationNumber, entityId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusNoContent)
}
