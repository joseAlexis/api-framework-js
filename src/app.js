const path = require('path');
const jsonServer = require('json-server');
const auth = require('json-server-auth');
const userManagement = require('./middleware/userManagement');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '..', 'data', 'db.json'));
const middlewares = jsonServer.defaults();

server.db = router.db;

/**
 * Resources
  http://localhost:3000/boards
  http://localhost:3000/todos
  http://localhost:3000/tasks
  http://localhost:3000/users
 */

// Routes
// /api/boards
// /api/boards/id

// /api/boards/todo
// /api/boards/todo/id

// /api/boards/todo/task
// /api/boards/todo/task/id
server.use(jsonServer.bodyParser)
server.use(userManagement)
server.use(middlewares)

server.use(
    jsonServer.rewriter({
        '/boards':'/600/boards/',
        '/boards/todos': '/600/todos/',
        '/boards/todos/tasks': '/600/tasks/'
    })
);
server.use(auth)
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running');
})