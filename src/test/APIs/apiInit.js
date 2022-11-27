const axios = require('axios');

class Request {
    constructor(token) {
        this.instance = axios.create({
            baseURL: 'http://localhost:3000',
            timeout: 1000,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
    }

    getInstance() { return this.instance; }
}

module.exports = Request;