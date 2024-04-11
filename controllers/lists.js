const Book = require('../models/book');
const Author = require('../models/author');
const List = require('../models/list');

module.exports = {
    index,
    new: newList,
    create
};

async function create(req, res) {

    try {
        const list = await List.create(req.body);
        res.redirect(`/lists`)
    } catch (error) {
        
    }
}

function newList(req,res) {
    res.render('lists/new', { title: 'New List' })
}

async function index(req, res) {
    try {
        const lists = await List.find({});
        res.render('lists/index', { title: 'My Lists', lists});
    } catch (error) {
        console.error('Error fetching lists:' , error);
    }
}