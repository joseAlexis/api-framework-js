const { axios } = require('axios');

export class Request {
    constructor(token) {
        this.instance = axios.create({
            baseURL: 'http://localhost:3000',
            timeout: 1000,
            headers: {
                Authorization: `bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
    }

    get instance() { return this.instance; }
}