package customer

import (
	"my-bakery/database"

	"github.com/gin-gonic/gin"
)

func InitRoutes(r *gin.Engine, db *database.DB) {
	r.POST("/customer", func(c *gin.Context) {
		AddCustomer(c, db)
	})

	r.GET("/customer", func(c *gin.Context) {
		GetCustomers(c, db)
	})
}
