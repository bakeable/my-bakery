USE mydb;

CREATE VIEW work_session_summary_view AS
SELECT
    'Current Month' AS time_period,
    SUM(CASE WHEN MONTH(ws.started_timestamp) = MONTH(CURDATE()) THEN ws.hours ELSE 0 END) AS total_hours_current_month,
    SUM(CASE WHEN DATE(ws.started_timestamp) = CURDATE() THEN ws.hours ELSE 0 END) AS total_hours_today,
    SUM(CASE WHEN MONTH(ws.started_timestamp) = MONTH(CURDATE()) THEN ws.earned_amount ELSE 0 END) AS total_earned_amount_current_month,
    SUM(CASE WHEN DATE(ws.started_timestamp) = CURDATE() THEN ws.earned_amount ELSE 0 END) AS total_earned_amount_today
FROM work_session_project_view AS ws;


CREATE VIEW task_summary_view AS
SELECT
    'Current Month' AS time_period,
    COUNT(CASE WHEN MONTH(t.finished_timestamp) = MONTH(CURDATE()) THEN 1 END) AS tasks_finished_current_month,
    COUNT(CASE WHEN DATE(t.finished_timestamp) = CURDATE() THEN 1 END) AS tasks_finished_today
FROM tasks AS t
WHERE MONTH(t.finished_timestamp) = MONTH(CURDATE()) OR DATE(t.finished_timestamp) = CURDATE();


CREATE VIEW dashboard_view AS
SELECT * FROM task_summary_view
UNION
SELECT * FROM work_session_summary_view;