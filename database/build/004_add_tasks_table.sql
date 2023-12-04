USE mydb;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    project_id INT NOT NULL,
    status VARCHAR(50),
    commit_id VARCHAR(50) NULL,
    created_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    finished_timestamp DATETIME DEFAULT NULL,
    priority INT,
    due_date DATE NULL,
    started_timestamp DATETIME DEFAULT NULL,
    hours DECIMAL(10,2) NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id)
);
