DROP TABLE IF EXISTS `groups`;

CREATE TABLE `groups` (
    group_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    topic_id INT, -- which topic the group belongs too
    admin_id INT, -- group admin
    created_at DATETIME,
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id),
    FOREIGN KEY (admin_id) REFERENCES users(user_id)
)

SELECT * FROM `groups`;
DELETE FROM `groups`
WHERE group_id = 2;