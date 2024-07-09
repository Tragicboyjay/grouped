const crypto = require('crypto');

function generateRandomString(length) {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
}

const randomString = generateRandomString(52); 
console.log(`Random String: ${randomString}`);
