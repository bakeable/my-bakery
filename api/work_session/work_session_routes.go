package work_session

import (
	"my-bakery/database"

	"github.com/gin-gonic/gin"
)

func InitRoutes(r *gin.RouterGroup, db *database.DB) {

	group := r.Group("/work_session")
	{
		group.POST("", func(c *gin.Context) {
			Add(c, db)
		})
		group.GET("", func(c *gin.Context) {
			GetAll(c, db)
		})
		group.GET("/:id", func(c *gin.Context) {
			Get(c, db)
		})
		group.PUT("/:id", func(c *gin.Context) {
			Update(c, db)
		})
		group.DELETE("/:id", func(c *gin.Context) {
			Delete(c, db)
		})
	}
}
