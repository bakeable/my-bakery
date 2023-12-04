USE mydb;
CREATE TABLE IF NOT EXISTS work_session_tasks (
    work_session_id INT,
    task_id INT,
    FOREIGN KEY (work_session_id) REFERENCES sessions(id),
    FOREIGN KEY (task_id) REFERENCES tasks(id)
);