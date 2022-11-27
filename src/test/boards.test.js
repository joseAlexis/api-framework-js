const { describe, it, before } = require('mocha');
const expect = require('chai').expect;
const _ = require('lodash');

const { getToken } = require('./APIs/auth');
const Request = require('./APIs/apiInit');
const BoardsApi = require('./APIs/boards');

let request = undefined;
let boardsApi = undefined;

describe('boards API', () => {
    before('Should login', async () => {
        const token = await getToken()
        request = new Request(token);
        boardsApi = new BoardsApi(request.getInstance());
    });

    it('Should get the boards', async () => {
        const response = await boardsApi.getBoards();
        expect(response.data[0]).to.have.property('name');
        expect(response.data[0]).to.have.property('userId');
        expect(response.data[0]).to.have.property('createdDate');
        expect(response.data[0]).to.have.property('id');
    });

    it('Should create a new board', async () => {
        const response = await boardsApi.createBoard();
        expect(response.data).to.have.property('name');
        expect(response.data).to.have.property('userId');
        expect(response.data).to.have.property('createdDate');
        expect(response.data).to.have.property('id');
    });

    /**
     * TODO: Check as it is failing
     */
    it('Should update an existing board', async () => {
        const boards = await boardsApi.getBoards();
        const board = boards.data[0];

        const data = {
            ...board,
            name: `Updated Board ${_.random(1000, 9999)}`
        }

        const response = await boardsApi.updateBoard(data);
        expect(response.status).to.eq(200);
        expect(response.data.name).to.contain('Updated Board');
    })

    /**
     * TODO: Check as it is failing
     */
    it('Should remove an existing board', async () => {
        const boards = await boardsApi.getBoards();
        const id = boards.data[0].id;
        await boardsApi.removeBoard(id);
        const newBoards = await boardsApi.getBoards();
        expect(boards.data.length - 1).to.eq(newBoards.data.length)
    })
});