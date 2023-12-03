package project

import (
	"context"
	"my-bakery/database"
	"my-bakery/utils"
	"net/http"

	"github.com/georgysavva/scany/v2/sqlscan"
	"github.com/gin-gonic/gin"
)

// Variable declaration
const tableName = "projects"

// Add handles POST requests to add a new entity
func Add(c *gin.Context, db *database.DB) {
	var entity Project
	if err := c.ShouldBindJSON(&entity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	query := "INSERT INTO projects (customer_id, description, name, progress, status, wage) VALUES (?, ?, ?, ?, ?, ?)"

	_, err := db.Exec(query, entity.CustomerId, entity.Description, entity.Name, entity.Progress, entity.Status, utils.ConvertToFloat64(entity.Wage))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusCreated)
}

// GetAll handles GET requests to retrieve entities
func GetAll(c *gin.Context, db *database.DB) {
	query := "SELECT * FROM project_customer_view"

	ctx := context.Background()
	var entities []*Project
	sqlscan.Select(ctx, db, &entities, query)

	c.JSON(http.StatusOK, entities)
}

// Get handles GET requests to retrieve a specific entity by ID
func Get(c *gin.Context, db *database.DB) {
	entityId := c.Param("id")

	query := "SELECT * FROM project_customer_view WHERE id = " + entityId

	ctx := context.Background()
	var entities []*Project
	sqlscan.Select(ctx, db, &entities, query)

	if len(entities) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	c.JSON(http.StatusOK, entities[0])
}

// deleteProject handles DELETE requests to delete a specific entity by ID
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
	var existingEntity Project
	err := db.QueryRow("SELECT id FROM "+tableName+" WHERE id = ?", entityId).
		Scan(&existingEntity.ID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	// Bind the request body to a Project struct to get updated data
	var updatedEntity Project
	if err := c.ShouldBindJSON(&updatedEntity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update the entity in the database
	_, err = db.Exec("UPDATE "+tableName+" SET customer_id = ?, description = ?, name = ?, wage = ? WHERE id = ?",
		updatedEntity.CustomerId, updatedEntity.Description, updatedEntity.Name, updatedEntity.Wage, entityId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusNoContent)
}
