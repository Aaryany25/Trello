const express = require('express');
const router = express.Router();
const {
    createBoard,
    getBoards,
    getBoardById
} = require('../controllers/boardController');
const { validate } = require('../middleware/validate');
const {
    createBoardSchema,
    getBoardsQuerySchema,
    boardIdParamSchema
} = require('../schemas/boardSchemas');

router.post('/boards', validate({ body: createBoardSchema }), createBoard);
router.get('/boards', validate({ query: getBoardsQuerySchema }), getBoards);
router.get('/boards/:id', validate({ params: boardIdParamSchema }), getBoardById);

module.exports = router;
