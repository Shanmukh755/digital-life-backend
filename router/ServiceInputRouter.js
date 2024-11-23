const express = require('express');
const router = express.Router();
const { postServiceRequest, getAllRequests, deleteRequestById } = require('../controller/ServiceInputController');
const {authorize} = require('../middleware/ServiceMiddleware');

// Public Route
router.post('/', postServiceRequest); // No authorization needed for submitting a request

// Protected Routes
router.get('/', authorize(['admin']), getAllRequests); // Only accessible by admin users
router.delete('/:id', authorize(['admin']), deleteRequestById); // Only accessible by admin users

module.exports = router;
