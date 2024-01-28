const jwt = require('jsonwebtoken');
const SECRET = '3lz41fmg-bs1-1nf0'
const BlockTokenList = require('../models/BlockTokenList')

async function authenticateJWT (req, res, next) {

    const token = req.headers.authorization

    const validToken = await BlockTokenList.findOne({ where: {token}})
    
    if(!validToken){        
        const token1 = req.headers.authorization.split(' ')[1]
        jwt.verify(token1, SECRET, (err, decoded) =>{
            if(err) return res.status(401).end()
    
            req.userId = decoded.userId;
            req.role = decoded.role;
    
            const decoded1 = jwt.decode(token1);
            next()
        })
    }else{
        res.json({auth: false, message: "Token expirado"})
        res.status(401).end()
    }
}

module.exports = authenticateJWT