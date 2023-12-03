USE mydb
CREATE VIEW project_customer_view AS
SELECT 
    p.*,
    c.name AS customer_name
FROM 
    projects AS p
JOIN 
    customers AS c ON p.customer_id = c.id;