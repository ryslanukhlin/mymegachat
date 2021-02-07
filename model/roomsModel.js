const { model, Schema } = require('mongoose');

const Rooms = new Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    messages: [{
        text: String,
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }
    }]
});

module.exports = model('Rooms', Rooms);