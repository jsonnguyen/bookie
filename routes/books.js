const express = require('express');
const router = express.Router();
const booksCtrl = require('../controllers/books');
const ensuredLoggedIn = require('../config/ensureLoggedIn');

router.get('/', booksCtrl.index);
router.get('/:id', booksCtrl.show);
router.get('/new', ensuredLoggedIn, booksCtrl.new);
router.post('/', ensuredLoggedIn, booksCtrl.create);

module.exports = router;
