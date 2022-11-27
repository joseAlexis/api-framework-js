const axios = require('axios');

async function getToken() {
    const data = {
        "email": "test@mail.com",
        "password": "bestPassw0rd"
    }

    let response = await axios.post(
        `http://localhost:3000/login`,
        data,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )

    const token = await response.data.accessToken;
    return token;
}

module.exports = { getToken }