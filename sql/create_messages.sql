CREATE TABLE messages(
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    body VARCHAR(255),
    user_id INT, -- who sent the message
    group_id INT, -- which group the message was sent to
    sent DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (group_id) REFERENCES groups(group_id),

)