USE mydb;
CREATE TABLE IF NOT EXISTS work_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    finished_timestamp DATETIME DEFAULT NULL,
    finish_time VARCHAR(5) NULL,
    hours DECIMAL(10, 2) NULL,
    project_id INT NOT NULL,
    started_timestamp DATETIME DEFAULT NULL,
    start_time VARCHAR(5) NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id)
);
