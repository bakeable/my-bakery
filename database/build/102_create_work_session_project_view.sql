USE mydb
CREATE VIEW work_session_project_view AS
SELECT 
    p.*,
    c.name AS customer_name
FROM 
    work_sessions AS p
JOIN 
    customers AS c ON p.customer_id = c.id;