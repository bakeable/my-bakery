USE mydb
CREATE VIEW project_customer_view AS
SELECT 
    p.id AS id,
    p.name AS name,
    p.description AS description,
    p.wage AS wage,
    p.created_timestamp AS created_timestamp,
    p.customer_id AS customer_id,
    c.name AS customer_name
FROM 
    projects AS p
JOIN 
    customers AS c ON p.customer_id = c.id;