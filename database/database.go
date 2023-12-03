package database

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/georgysavva/scany/v2/sqlscan"
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

func GetOne(db *DB, query string, output *any) *any {
	ctx := context.Background()

	sqlscan.Select(ctx, db, &output, query)

	return output
}

func (db *DB) GetMultiple(query string, output []*any) []*any {
	ctx := context.Background()

	sqlscan.Select(ctx, db, &output, query)

	return output
}
