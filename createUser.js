const fs = require('fs');
const path = require('path');

const main = async () => {
    try {
        const userFilePath = path.join(__dirname, 'user.json');
        if (!fs.existsSync(userFilePath)) {
            throw new Error('user.json not found!');
        }

        const userData = fs.readFileSync(userFilePath, 'utf-8');

        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: userData,
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}: ${responseData.message}`);
        }

        console.log('Server response:', responseData);

    } catch (error) {
        console.error('Failed to create user:', error.message);
    }
};

main();
