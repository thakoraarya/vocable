var jwt = require('jsonwebtoken')
const JWT_SECRET = 'AaryaTheGR8';
const fatchuser = (req, res, next) => {
    // get the user from jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({ error: "please authenticate using valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;

    } catch (error) {
        res.status(401).json({ error: "please authenticate using valid token" })
    }
    next()
}
module.exports = fatchuser;