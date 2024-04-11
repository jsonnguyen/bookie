const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book',
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    userName: String,
    userAvatar: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('List', listSchema);