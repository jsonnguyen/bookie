const Book = require('../models/book');

module.exports = {
    index
};

async function index(req, res) {
    const books = await Book.find({});
    res.render('books/index', { title: 'All Books', books });
}