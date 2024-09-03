DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    created_at DATETIME
)

SELECT * FROM users;
DELETE FROM users
WHERE user_id = 10;