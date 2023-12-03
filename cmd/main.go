package main

import (
	"my-bakery/api"
	"my-bakery/database"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	db := database.InitDB()
	defer db.Close()

	r := gin.Default()

	// Allow cross origin requests for development purposes
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000", "http://localhost:4040"}
	r.Use(cors.New(config))

	// Serve frontend static files
	r.Use(static.Serve("/", static.LocalFile("./client/out", true)))

	// Setup route group for the API
	apiGroup := r.Group("/api")
	{
		api.InitRoutes(apiGroup, db)
	}

	r.Run(":4040")
}
