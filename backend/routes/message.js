const express = require('express');
const router = express.Router();

const messagesCtrl = require('../controllers/message');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, messagesCtrl.createMessages);
//router.put('/:id', auth, multer, messagesCtrl.modifyMessages);
//router.post('/:id/like', auth, messagesCtrl.like);
//router.delete('/:id', auth, messagesCtrl.deleteMessages);
router.get('/', auth, messagesCtrl.getAllMessages);
//router.get('/:id', auth, messagesCtrl.getOneMessages);

module.exports = router;
