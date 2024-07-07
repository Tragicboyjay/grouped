CREATE TABLE groups (
    group_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    topic_id INT, -- which topic the group belongs too
    user_id INT, -- group admin
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
)