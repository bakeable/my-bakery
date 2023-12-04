USE mydb
CREATE VIEW work_session_project_view AS
SELECT 
    p.name AS project_name,
    CAST(p.wage * ws.hours AS DECIMAL(10, 2)) AS earned_amount,
    ws.*
FROM 
    work_sessions AS ws
JOIN 
    projects AS p ON ws.project_id = p.id;