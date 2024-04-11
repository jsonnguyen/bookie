const Book = require('../models/book');
const Author = require('../models/author');
const List = require('../models/list');
const User = require('../models/user')

module.exports = {
    index,
    new: newList,
    create
};

async function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    try {
        const list = await List.create(req.body);
        const user = await User.findById(req.user.id);
        console.log(user);
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