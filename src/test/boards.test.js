const { describe, it } = require('mocha');

const { Auth } = require('./APIs/auth');

describe('boards API', () => {
    it('Should login', async () => {
        const auth = new Auth();
        const token = await auth.getToken();
        console.log(token);
    })
});