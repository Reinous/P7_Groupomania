const express = require('express');
const router = express.Router();

const messagesCtrl = require('../controllers/message');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, messagesCtrl.createMessage);
router.put('/:id', auth, multer, messagesCtrl.modifyMessage);
router.post('/:id/like', auth, messagesCtrl.like);
router.delete('/:id', auth, messagesCtrl.deleteMessage);
router.get('/', auth, messagesCtrl.getAllMessages);
router.get('/:id', auth, messagesCtrl.getOneMessage);

module.exports = router;
