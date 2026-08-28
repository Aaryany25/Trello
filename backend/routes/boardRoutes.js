const express = require('express');
const router = express.Router();
const {
    createBoard,
    getBoards,
    getBoardById
} = require('../controllers/boardController');

router.post('/boards', createBoard);
router.get('/boards', getBoards);
router.get('/boards/:id', getBoardById);

module.exports = router;
