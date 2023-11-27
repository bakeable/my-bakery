package project

import (
	"my-bakery/database"

	"github.com/gin-gonic/gin"
)

func InitRoutes(r *gin.Engine, db *database.DB) {
	r.POST("/project", func(c *gin.Context) {
		AddProject(c, db)
	})

	r.GET("/project", func(c *gin.Context) {
		GetProjects(c, db)
	})
}
