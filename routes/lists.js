const express = require('express');
const router = express.Router();
const listsCtrl = require('../controllers/lists');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/:id/lists', ensureLoggedIn, listsCtrl.index);
router.get('/:id/lists/new', ensureLoggedIn, listsCtrl.new);
router.get('/:userId/lists/:listId', ensureLoggedIn, listsCtrl.show);
router.post('/lists', ensureLoggedIn, listsCtrl.create);
router.post('/:userId/lists/:listId', ensureLoggedIn, listsCtrl.addToList);


module.exports = router;