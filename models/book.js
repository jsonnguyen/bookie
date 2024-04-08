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
    genre: {
        type: String,
        enum: [
            'Fiction',
            'Non-fiction',
            'Fantasy',
            'Science Fiction',
            'Mystery',
            'Thriller',
            'Horror',
            'Romance',
            'Historical Fiction',
            'Biography',
            'Autobiography',
            'Memoir',
            'Self-help',
            'Poetry',
            'Drama',
            'Comedy',
            'Adventure',
            'Young Adult',
            'Children',
            'Graphic Novel',
            'Crime',
            'Suspense',
            'Western',
            'Satire',
            'Fairy Tale',
            'Fable',
            'Anthology',
            'Cookbook',
            'Travel',
            'Science',
            'History',
            'Philosophy',
            'Religion',
            'Psychology',
            'Art',
            'Music',
            'Sports',
            'Parenting',
            'Crafts & Hobbies',
        ]
    },
    publisher: {
        type: Schema.Types.ObjectId,
        ref: 'Publisher'
    },
    reviews: [reviewSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);