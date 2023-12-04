USE mydb
CREATE VIEW task_view AS
SELECT 
    p.name AS project_name,
    CAST(p.wage * t.hours AS DECIMAL(10, 2)) AS earned_amount,
    t.*
FROM 
    tasks AS t
JOIN 
    projects AS p ON t.project_id = p.id;