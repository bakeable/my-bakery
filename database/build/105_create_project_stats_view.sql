CREATE VIEW project_metrics_view AS
SELECT
    p.id AS project_id,
    p.name AS project_name,
    DATE(t.finished_timestamp) AS date,
    SUM(CASE WHEN t.status = 'done' THEN 1 ELSE 0 END) AS tasks_finished,
    SUM(CAST(p.wage * ws.hours AS DECIMAL(10, 2))) AS earned_amount,
    SUM(ws.hours) AS hours
FROM
    projects AS p
JOIN
    work_sessions AS ws ON p.id = ws.project_id
JOIN
    tasks AS t ON t.project_id = p.id
GROUP BY
    project_id,
    date;