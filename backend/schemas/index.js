const authSchemas = require('./authSchemas');
const orgSchemas = require('./orgSchemas');
const boardSchemas = require('./boardSchemas');
const issueSchemas = require('./issueSchemas');

module.exports = {
    ...authSchemas,
    ...orgSchemas,
    ...boardSchemas,
    ...issueSchemas
};
