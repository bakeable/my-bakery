package main

import (
	"my-bakery/api"
	"my-bakery/database"

	"github.com/gin-gonic/gin"
)

func main() {
	db := database.InitDB()
	defer db.Close()

	r := gin.Default()
	api.InitRoutes(r, db)

	r.Run(":4040")
}
