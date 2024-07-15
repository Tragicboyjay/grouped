DROP TABLE IF EXISTS messages;

CREATE TABLE messages(
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    body VARCHAR(255),
    authour_id INT, -- who sent the message
    group_id INT, -- which group the message was sent to
    sent_at DATETIME,
    FOREIGN KEY (authour_id) REFERENCES users(user_id),
    FOREIGN KEY (group_id) REFERENCES `groups`(group_id)

);

SELECT * FROM messages;