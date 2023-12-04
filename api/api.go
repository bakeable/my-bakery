package api

import (
	"my-bakery/api/customer"
	"my-bakery/api/metrics"
	"my-bakery/api/project"
	"my-bakery/api/work_session"
	"my-bakery/database"

	"github.com/gin-gonic/gin"
)

// InitRoutes initializes all routes for different models
func InitRoutes(r *gin.RouterGroup, db *database.DB) {
	// Initialize routes for Project
	project.InitRoutes(r, db)

	// Initialize routes for Customer
	customer.InitRoutes(r, db)

	// Initialize routes for Client
	work_session.InitRoutes(r, db)

	// Initialize routes for Metrics
	metrics.InitRoutes(r, db)
}
