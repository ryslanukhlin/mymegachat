const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {username, email, password} = req.body;
        const user = new User({
            username,
            email,
            password: bcrypt.hashSync(password, 7)
        });
        await user.save();

        return res.status(200).json({
            status: 'success'
        });
    } catch (e) {
        return res.status(418).json({
           status: 'error'
        });
    }
}