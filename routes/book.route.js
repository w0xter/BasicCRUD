const express = require('express');
const router = express.Router();
const book_controller = require('../controllers/book.controller');
//Basic CRUD
router.post('/create', book_controller.book_create);
router.get('/:id', book_controller.book_details);
router.put('/:id/update', book_controller.book_update);
router.delete('/:id/delete', book_controller.book_delete);
//Find and Filter
router.get('/search/:book_field&:field_info', book_controller.book_search);
module.exports = router;
