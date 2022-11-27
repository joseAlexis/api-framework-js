const { Request } = require('./apiInit');
const _ = require('lodash');

class BoardsApi {
    constructor(instance) {
        this.instance = instance;
    }

    async getBoards() {
        return await this.instance.get('/boards');
    }

    async createBoard() {
        const data = {
            name: `Board ${_.random(1000, 9999)}`
        }

        return await this.instance.post('/boards', data);
    }

    async updateBoard(data) {
        return await this.instance.put(`/boards/${data.id}`, data);
    }

    async removeBoard(id) {
        return await this.instance.delete(`/boards/${id}`);
    }
}

module.exports = BoardsApi;