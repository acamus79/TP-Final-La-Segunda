const jwt = require('jsonwebtoken');
const config = require('../../config/config');

//Generate a new token
const generate = async (user) => {
    return jwt.sign({
        'id': user.id,
        'role': user.role
    }, config.secret, {
        expiresIn: config.expires
    });

}

//Verify the token
const verify = async (token) => {
    try {
        return jwt.verify(token, config.secret)
    } catch (e) {
        return null
    }
}

//Decoding the token
const decode = (token) => {
    return jwt.decode(token, null)
}


module.exports = {
    generate,
    decode,
    verify
}
