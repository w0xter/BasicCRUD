const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');
const cors = require('cors');

//Activando las CORS, o eso creo.
router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
//Check Route:
router.get('/check', user_controller.check);

/*BASIC CRUD*/
router.post('/create', user_controller.user_create);
router.get('/user/:id', user_controller.user_details);
router.put('/:id/update', user_controller.user_update);
router.delete('/:id/delete', user_controller.user_delete);
/*User List*/
router.get('/list', user_controller.user_list);

/*Log in*/
router.post('/login', user_controller.user_login);
/*SignUp*/
router.post('/checkUser', user_controller.user_check);

module.exports = router;

