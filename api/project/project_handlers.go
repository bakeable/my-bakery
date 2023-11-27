package project

import (
	"my-bakery/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

// addProject handles POST requests to add a new project
func AddProject(c *gin.Context, db *database.DB) {
	var p Project
	if err := c.ShouldBindJSON(&p); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err := db.Exec("INSERT INTO projects (name, description) VALUES (?, ?)", p.Name, p.Description)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusCreated)
}

// getProjects handles GET requests to retrieve projects
func GetProjects(c *gin.Context, db *database.DB) {
	rows, err := db.Query("SELECT id, name, description FROM projects")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var projects []Project
	for rows.Next() {
		var p Project
		err := rows.Scan(&p.ID, &p.Name, &p.Description)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		projects = append(projects, p)
	}

	if err := rows.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, projects)
}
