const express = require('express');
const router = express.Router();
const listsCtrl = require('../controllers/lists');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/:id/lists', ensureLoggedIn, listsCtrl.index);
router.get('/:id/lists/new', ensureLoggedIn, listsCtrl.new);
router.post('/lists', ensureLoggedIn, listsCtrl.create);


module.exports = router;