const Author = require('../models/author');
const Book = require('../models/book');

module.exports = {
    new: newAuthor,
    create
};

async function newAuthor(req, res) {
    const authors = await Author.find({}).sort('lastName');
    res.render('authors/new', { title: 'Add Author', authors });
}

async function create(req, res) {
    try {
        await Author.create(req.body);
    } catch (error) {
        console.log(error);
    }
    res.redirect('/authors/new');
}