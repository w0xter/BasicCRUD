const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');
/*BASIC CRUD*/
router.post('/create', user_controller.user_create);
router.get('/user/:id', user_controller.user_details);
router.put('/:id/update', user_controller.user_update);
router.delete('/:id/delete', user_controller.user_delete);
/*User List*/
router.get('/list', user_controller.user_list);
module.exports = router;

