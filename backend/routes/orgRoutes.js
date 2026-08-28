const express = require('express');
const router = express.Router();
const {
    getOrganizations,
    createOrganization,
    addMember,
    getMembers
} = require('../controllers/orgController');

router.get('/organizations', getOrganizations);
router.post('/organization', createOrganization);
router.post('/member', addMember);
router.get('/members', getMembers);

module.exports = router;
