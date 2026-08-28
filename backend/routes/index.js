const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const orgRoutes = require('./orgRoutes');
const boardRoutes = require('./boardRoutes');
const issueRoutes = require('./issueRoutes');

router.use('/', authRoutes);
router.use('/', orgRoutes);
router.use('/', boardRoutes);
router.use('/', issueRoutes);

module.exports = router;
