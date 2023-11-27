package client

import (
	"my-bakery/database"

	"github.com/gin-gonic/gin"
)

func InitRoutes(r *gin.Engine, db *database.DB) {
	r.POST("/client", func(c *gin.Context) {
		AddClient(c, db)
	})

	r.GET("/client", func(c *gin.Context) {
		GetClients(c, db)
	})
}
