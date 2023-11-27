package database

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

type DB struct {
	*sql.DB
}

func InitDB() *DB {
	var db *sql.DB
	var err error

	for i := 0; i < 5; i++ {
		db, err = sql.Open("mysql", "root:my-secret-pw@tcp(my-bakery-db:3306)/mydb")
		if err == nil {
			err = db.Ping()
			if err == nil {
				fmt.Println("Successfully connected to MySQL database")
				return &DB{db}
			}
		}
		fmt.Println("Retrying database connection...")
		time.Sleep(10 * time.Second) // Wait for 5 seconds before retrying
	}
	panic("Failed to connect to database: " + err.Error())
}
