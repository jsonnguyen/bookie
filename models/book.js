const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userName: String,
    userAvatar: String
  }, {
    timestamps: true
  });

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    },
    releaseYear: {
        type: Number,
        required: true
    },
    isbn: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    genre: [{
        type: Schema.Types.ObjectId,
        ref: 'Genre'
    }],
    publisher: {
        type: Schema.Types.ObjectId,
        ref: 'Publisher'
    }
}, {
    timestamps: true
});