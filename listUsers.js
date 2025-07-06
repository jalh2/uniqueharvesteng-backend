const main = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/users');
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}: ${responseData.message || 'No error message'}`);
        }

        console.log('--- User List ---');
        console.log(JSON.stringify(responseData, null, 2));

    } catch (error) {
        console.error('Failed to list users:', error.message);
        if (error.cause) {
            console.error('Cause:', error.cause);
        }
    }
};

main();
