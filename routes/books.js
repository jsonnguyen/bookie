const express = require('express');
const router = express.Router();
const booksCtrl = require('../controllers/books');
const ensuredLoggedIn = require('../config/ensureLoggedIn');

router.get('/', booksCtrl.index);

module.exports = router;
