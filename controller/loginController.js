const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createJWT = (payload) => {
    return jwt.sign(payload, 'secretKey');
}

module.exports = async (req, res) => {
    try {
        if (req.body.token) {
            const { token } = req.body
            const decode = jwt.verify(JSON.parse(token), 'secretKey');
            const user = await User.findById(decode.id);
            return res.status(200).json({
                status: 'success',
                user,
                token: createJWT({id: user.id}),
            });
        }

        const { email, password } = req.body
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({
            status: 'error'
        });
        if (!bcrypt.compareSync(password, user.password)) return res.status(400).json({
            status: 'error'
        });
        return res.status(200).json({
           status: 'success',
           user,
           token: createJWT({id: user.id}),
        });
    } catch (e) {
        console.log(e)
        return res.status(418).json({
            status: 'error'
        });
    }
}