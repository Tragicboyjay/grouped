DROP TABLE IF EXISTS topics;

CREATE TABLE topics (
    topic_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
)

-- Insert seed data
INSERT INTO topics (name) VALUES
('cars'),
('general'),
('cooking'),
('math'),
('fun');