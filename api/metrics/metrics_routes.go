package metrics

import (
	"my-bakery/database"

	"github.com/gin-gonic/gin"
)

func InitRoutes(r *gin.RouterGroup, db *database.DB) {

	group := r.Group("/metrics")
	{
		group.GET("/dashboard", func(c *gin.Context) {
			GetDashboardMetrics(c, db)
		})
	}
}
