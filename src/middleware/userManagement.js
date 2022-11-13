const jwtDecode = require('jwt-decode');
const db = require('../../data/db.json');
const dayJS = require('dayjs');

const getEmail = (token) => {
    const decoded = jwtDecode(token);
    return decoded.email;
}

const getUserId = (email) => {
    const user = db.users.filter(user => user.email === email);
    return user[0].id
}

module.exports = (req, res, next) => {
    // Resgiter or login grants
    const authApiRegex = new RegExp(/^\/register|login$/);
    if (authApiRegex.test(req.path)) {
        return next();
    }

    // Validate if the request has a authorization header
    if (!req.headers.hasOwnProperty('authorization')) {
        return res.sendStatus(401);
    }

    const authHeader = req.headers.authorization;
    const tokenDetails = authHeader.split(" ");
    const userEmail = getEmail(tokenDetails[1]);
    const userId = getUserId(userEmail);

    // Adding usedId and createdDate to resources when POST
    if (req.method === 'POST') {
        req.body.userId = userId;
        req.body.createdDate = dayJS().format('YYYY-MM-DD')
    }

    // Filter GET results by the userId
    if (req.method === 'GET') {
        const resourceDetails = req.path.split('/');
        const resouceRequested = resourceDetails[resourceDetails.length - 1]
        const result = db[resouceRequested].filter(element => element.userId === userId);
        return res.status(200).jsonp(result);
    }

    next();
}