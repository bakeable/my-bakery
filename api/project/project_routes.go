package project

import (
	"my-bakery/database"

	"my-bakery/api/project/task"

	"github.com/gin-gonic/gin"
)

func InitRoutes(r *gin.RouterGroup, db *database.DB) {

	group := r.Group("/project")
	{
		group.POST("", func(c *gin.Context) {
			Add(c, db)
		})
		group.GET("", func(c *gin.Context) {
			GetAll(c, db)
		})
		group.GET("/:projectId", func(c *gin.Context) {
			Get(c, db)
		})
		group.PUT("/:projectId", func(c *gin.Context) {
			Update(c, db)
		})
		group.DELETE("/:projectId", func(c *gin.Context) {
			Delete(c, db)
		})
	}

	// Nested routes
	task.InitRoutes(group, db)
}
