USE mydb;
CREATE TABLE IF NOT EXISTS work_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    earned_amount DECIMAL(10, 2),
    finished_timestamp TIMESTAMP NULL,
    hours DECIMAL(10, 2),
    project_id INT NOT NULL,
    started_timestamp TIMESTAMP NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id)
);