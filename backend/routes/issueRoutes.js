const express = require('express');
const router = express.Router();
const {
    createIssue,
    getIssues,
    getIssueById,
    updateIssue,
    deleteIssue
} = require('../controllers/issueController');
const { validate } = require('../middleware/validate');
const {
    createIssueSchema,
    getIssuesQuerySchema,
    updateIssueSchema,
    issueIdParamSchema
} = require('../schemas/issueSchemas');

router.post('/issue', validate({ body: createIssueSchema }), createIssue);
router.get('/issue', validate({ query: getIssuesQuerySchema }), getIssues);
router.get('/issue/:id', validate({ params: issueIdParamSchema }), getIssueById);
router.put('/issues', validate({ body: updateIssueSchema }), updateIssue);
router.put('/issues/:id', validate({ params: issueIdParamSchema, body: updateIssueSchema }), updateIssue);
router.delete('/issues/:id', validate({ params: issueIdParamSchema }), deleteIssue);

module.exports = router;
