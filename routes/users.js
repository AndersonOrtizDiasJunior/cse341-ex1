const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

router.post('/', usersController.addUser);

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);

router.put('/:id', usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;