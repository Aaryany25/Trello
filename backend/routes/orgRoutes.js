const express = require('express');
const router = express.Router();
const {
    getOrganizations,
    createOrganization,
    addMember,
    getMembers
} = require('../controllers/orgController');
const { validate } = require('../middleware/validate');
const {
    createOrgSchema,
    addMemberSchema,
    getMembersQuerySchema
} = require('../schemas/orgSchemas');

router.get('/organizations', getOrganizations);
router.post('/organization', validate({ body: createOrgSchema }), createOrganization);
router.post('/member', validate({ body: addMemberSchema }), addMember);
router.get('/members', validate({ query: getMembersQuerySchema }), getMembers);

module.exports = router;
