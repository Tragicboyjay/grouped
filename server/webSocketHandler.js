const util = require("util");
const db = require("./db");

function handleWebSocketEvents(io) {
    io.on('connection', (socket) => {
        console.log('A user connected');
        socket.emit('message', { message: 'Connected successfully' });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

        socket.on("join-group", (data) => {
            const { selectedGroup } = data;
            if (!selectedGroup) {
                socket.emit('message', { message: 'Error: no group selected' });
                return;
            }

            socket.join(selectedGroup);
            console.log(`User joined group ${selectedGroup}`);
            socket.emit('message', { message: `Joined group ${selectedGroup}` });
        });

        socket.on('message', async (msg) => {
            const { messageBody, userId, groupId, currentDate } = msg;
        
            if (!messageBody || !userId || !groupId || !currentDate) {
                socket.emit('message', { message: 'Error: invalid message data' });
                return;
            }
        
            const formattedDate = new Date(currentDate).toISOString().slice(0, 19).replace('T', ' ');
        
            const query = util.promisify(db.query).bind(db);
        
            try {
                const result = await query("INSERT INTO messages (body, authour_id, group_id, sent_at) VALUES (?,?,?,?)", [messageBody, userId, groupId, formattedDate]);
        
                const newMessage = await query(
                    `SELECT 
                      m.body, 
                      m.authour_id, 
                      m.group_id, 
                      m.sent_at, 
                      m.message_id,
                      u.username 
                     FROM messages m
                     JOIN users u ON m.authour_id = u.user_id
                     WHERE m.message_id = ?`, 
                    [result.insertId]
                  );
               
                // Broadcast the new message to all users in the group
                io.to(groupId).emit('message', { newMessage: newMessage[0] });
                
            } catch (error) {
                console.error(error);
                socket.emit('message', { message: 'Error sending message' });
            }
        });
        
    });
}

module.exports = {
    handleWebSocketEvents
};
