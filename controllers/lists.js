const Book = require('../models/book');
const Author = require('../models/author');
const List = require('../models/list');
const User = require('../models/user')

module.exports = {
    index,
    new: newList,
    create,
    show,
    addToList,
    changeList,
    deleteFromList
};

async function deleteFromList(req, res) {
    try {
        const list = await List.findById(req.params.id);
        list.books.pull(req.body.bookId);
        await list.save();
        res.redirect(`/${req.user._id}/lists/${list._id}`)
    } catch (error) {
        console.error('Error deleting from list:' , error);
    }
}

async function changeList(req, res) {
    try {
        const currentList = await List.findById(req.params.listId);
        const newList = await List.findById(req.body.newListId);
        currentList.books.pull(req.body.bookId);
        newList.books.push(req.body.bookId);
        console.log(req.body)
        console.log(req.params)


        await currentList.save();
        await newList.save();
        res.redirect(`/${req.user._id}/lists/${req.params.listId}`)
    } catch (error) {
        console.error('Error changing list:' , error);
    }
}

async function addToList(req, res) {
    const list = await List.findById(req.params.listId);
    list.books.push(req.body.bookId);
    try {
        await list.save();
        res.redirect(`/${req.user._id}/lists/${list._id}`)
    } catch (error) {
        console.error('Error adding to list:' , error);
    }
}

async function show(req, res) {
    try {
        const user = await User.findById(req.user._id).populate('lists');
        const list = await List.findById(req.params.listId).populate('books');
        const books = await Book.find({ _id: { $nin: list.books } }).populate('author');
        res.render('lists/show', { title:list.title, list, books, user})
    } catch (error) {
        console.error('Error fetching list:' , error);
    }
}

async function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    try {
        const list = await List.create(req.body);
        const user = await User.findById(req.user.id);
        if(user.lists) {
            user.lists.push(list._id);
        } else {
            user.lists = [list._id]
        }
        await user.save();
        res.redirect(`/${user._id}/lists`)
    } catch (error) {
        console.error('Error creating lists:' , error);
    }
}

function newList(req,res) {
    const user = req.user
    res.render('lists/new', { title: 'New List', user })
}

async function index(req, res) {
    const user = req.user
    try {
        const lists = await List.find({});
        res.render('lists/index', { title: 'My Lists', lists, user});
    } catch (error) {
        console.error('Error fetching lists:' , error);
    }
}