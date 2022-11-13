const { axios } = require('axios');

export class Auth {
    constructor() {
        this.request = axios.create({
            baseURL: 'http://localhost:3000',
            timeout: 1000,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    async getToken() {
        const { data } = await this.request.get('/login');
        return data.accessToken;
    }
}