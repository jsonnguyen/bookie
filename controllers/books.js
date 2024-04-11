const Book = require('../models/book');
const Author = require('../models/author');

const genre = [
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


module.exports = {
    index,
    new: newBook,
    create,
    show
};

async function show( req, res) {
    try {
        const book = await Book.findById(req.params.id);
        const author = await Author.findById(book.author);
        res.render('books/show', { title: book.title, book, author })
    } catch (error) {
        console.error('Error fetching book:', error);
    }
}

async function newBook(req, res) {
    const authors = await Author.find({});
    res.render('books/new', { title: 'Add Book', authors, genre })
}

async function index(req, res) {
    try {
        const books = await Book.find({});
        const booksWithAuthors = await Promise.all(books.map(async function(book) {
            const author = await Author.findById(book.author);
            book.authorName = author.firstName + " " + author.lastName;
            return book;
        }));
        res.render('books/index', { title: 'All Books', books: booksWithAuthors });
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

async function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    try {
        const book = await Book.create(req.body);
        res.redirect(`/books/${book._id}`);
    } catch (error) {
        console.log(error);
        res.render('books/new', { errorMsg: error.message });
    }
}