USE mydb;
CREATE TABLE IF NOT EXISTS sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    created_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    started_timestamp TIMESTAMP NULL,
    finished_timestamp TIMESTAMP NULL,
    hours DECIMAL(10, 2),
    earned_amount DECIMAL(10, 2),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);