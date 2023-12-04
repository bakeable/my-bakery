package metrics

import (
	"context"
	"fmt"
	"my-bakery/database"
	"my-bakery/utils"
	"net/http"

	"github.com/georgysavva/scany/v2/sqlscan"
	"github.com/gin-gonic/gin"
)

// GetDashboardMetrics handles GET requests to retrieve dashboard metrics
func GetDashboardMetrics(c *gin.Context, db *database.DB) {
	query := utils.SQL_SELECT(DashboardMetrics{}, "customers")
	fmt.Println(query)

	ctx := context.Background()
	var entities []*DashboardMetrics
	sqlscan.Select(ctx, db, &entities, query)

	c.JSON(http.StatusOK, entities[0])
}
