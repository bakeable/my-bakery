USE mydb;
CREATE TABLE IF NOT EXISTS session_tasks (
    session_id INT,
    task_id INT,
    FOREIGN KEY (session_id) REFERENCES sessions(id),
    FOREIGN KEY (task_id) REFERENCES tasks(id)
);