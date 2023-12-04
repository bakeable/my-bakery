package utils

import (
	"fmt"
	"reflect"
	"strings"
)

func SQL_INSERT(entity interface{}, tableName string) (string, []interface{}) {
	fields := []string{}
	values := []interface{}{}

	v := reflect.ValueOf(entity)
	t := reflect.TypeOf(entity)

	for i := 0; i < v.NumField(); i++ {
		field := v.Field(i)
		tag := t.Field(i).Tag.Get("json")
		insert := t.Field(i).Tag.Get("insert") == "true"
		if tag != "" && insert {
			fields = append(fields, tag)
			values = append(values, field.Interface())
		}
	}

	query := fmt.Sprintf("INSERT INTO "+tableName+" (%s) VALUES (%s)",
		strings.Join(fields, ", "),
		strings.Repeat("?, ", len(fields)-1)+"?")

	return query, values
}

func SQL_SELECT(entity interface{}, tableName string) string {
	fields := []string{}
	values := []interface{}{}

	v := reflect.ValueOf(entity)
	t := reflect.TypeOf(entity)

	for i := 0; i < v.NumField(); i++ {
		field := v.Field(i)
		tag := t.Field(i).Tag.Get("json")
		retrieve := t.Field(i).Tag.Get("retrieve") == "true"
		if tag != "" && retrieve {
			fields = append(fields, tag)
			values = append(values, field.Interface())
		}
	}

	query := fmt.Sprintf("SELECT %s FROM "+tableName, strings.Join(fields, ", "))

	return query
}

func SQL_SELECT_BY_ID(entity interface{}, tableName string, id string) string {
	fields := []string{}
	values := []interface{}{}

	v := reflect.ValueOf(entity)
	t := reflect.TypeOf(entity)

	for i := 0; i < v.NumField(); i++ {
		field := v.Field(i)
		tag := t.Field(i).Tag.Get("json")
		retrieve := t.Field(i).Tag.Get("retrieve") == "true"
		if tag != "" && retrieve {
			fields = append(fields, tag)
			values = append(values, field.Interface())
		}
	}

	query := fmt.Sprintf("SELECT %s FROM "+tableName+" WHERE id = %s", strings.Join(fields, ", "), id)

	return query
}

func SQL_DELETE_BY_ID(tableName string, id string) string {

	query := fmt.Sprintf("DELETE FROM "+tableName+" WHERE id = %s", id)

	return query
}

func SQL_UPDATE_BY_ID(entity interface{}, tableName string, id string) (string, []interface{}) {
	fields := []string{}
	values := []interface{}{}

	v := reflect.ValueOf(entity)
	t := reflect.TypeOf(entity)

	for i := 0; i < v.NumField(); i++ {
		field := v.Field(i)
		tag := t.Field(i).Tag.Get("json")
		insert := t.Field(i).Tag.Get("insert") == "true"
		if tag != "" && insert {
			fields = append(fields, tag)
			values = append(values, field.Interface())
		}
	}

	query := fmt.Sprintf("UPDATE "+tableName+" SET %s WHERE id = %s", strings.Join(fields, " = ?,")+" = ?", id)

	return query, values
}
