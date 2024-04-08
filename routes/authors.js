const express = require('express');
const router = express.Router();
const authorsCtrl = require('../controllers/authors');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/authors/new', ensureLoggedIn, authorsCtrl.new);
router.post('/authors', ensureLoggedIn, authorsCtrl.create);

module.exports = router;