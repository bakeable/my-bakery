# MySQL query
docker exec -it my-bakery-db mysql -u root -pmy-secret-pw mydb -e "SELECT * FROM project_metrics_view"