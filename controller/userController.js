const User = require('../model/userModel');

const getUsers = async (req, res) => {
    try {
        const users = await User.find({_id: { $ne: req.body.id }});
        return res.status(200).json(users);
    } catch (e) {
        return res.status(418);
    }
};

module.exports = {getUsers};

