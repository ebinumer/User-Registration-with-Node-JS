const jwt = require('jsonwebtoken')

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
        req.token = token
        // req.user = user
        next()
    } catch (error) {
        res.status(401).json({ message: `Authentication required`,status_code:401,status:false});
    }

}

module.exports = auth