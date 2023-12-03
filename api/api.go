package api

import (
	"my-bakery/api/customer"
	"my-bakery/api/project"
	"my-bakery/database"

	"github.com/gin-gonic/gin"
)

// InitRoutes initializes all routes for different models
func InitRoutes(r *gin.RouterGroup, db *database.DB) {
	// Initialize routes for Project
	project.InitRoutes(r, db)

	// Initialize routes for Client
	customer.InitRoutes(r, db)
}
