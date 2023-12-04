package metrics

import (
	"fmt"
	"my-bakery/database"
	"my-bakery/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetDashboardMetrics handles GET requests to retrieve dashboard metrics
func GetDashboardMetrics(c *gin.Context, db *database.DB) {
	query := utils.SQL_SELECT(DashboardMetrics{}, "dashboard_metrics_view")
	fmt.Println(query)

	// Execute the query on the database
	var metrics DashboardMetrics
	if err := db.DB.QueryRow(query).Scan(
		&metrics.TasksFinishedCurrentMonth,
		&metrics.TasksFinishedToday,
		&metrics.TotalHoursCurrentMonth,
		&metrics.TotalHoursToday,
		&metrics.TotalEarnedCurrentMonth,
		&metrics.TotalEarnedToday,
	); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve metrics"})
		return
	}

	c.JSON(http.StatusOK, metrics)
}
