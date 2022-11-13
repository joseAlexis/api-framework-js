const { Request } = require('./apiInit');

class BoardsApi {
    constructor(instance) {
        this.instance = instance;
    }

    async getBoards() {
        return await this.instance.get('/boards');
    }
}