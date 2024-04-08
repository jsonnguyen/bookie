const Book = require('../models/book');

module.exports = {
    index,
    new: newBook
};

function newBook(req, res) {
    res.render('books/new', { title: 'Add Book' })
}

async function index(req, res) {
    const books = await Book.find({});
    res.render('books/index', { title: 'All Books', books });
}