const express = require('express');
const router = express.Router();
const {
    createIssue,
    getIssues,
    getIssueById,
    updateIssue,
    deleteIssue
} = require('../controllers/issueController');

router.post('/issue', createIssue);
router.get('/issue', getIssues);
router.get('/issue/:id', getIssueById);
router.put('/issues', updateIssue);
router.put('/issues/:id', updateIssue);
router.delete('/issues/:id', deleteIssue);

module.exports = router;
