USE mydb;
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    customer_id INT,
    description TEXT,
    name VARCHAR(255) NOT NULL,
    progress INT DEFAULT 0,
    status ENUM('concept', 'active', 'inactive', 'done') DEFAULT 'concept',
    wage DECIMAL(10, 2),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);
