const router = require('express').Router();
const controller = require('./api.controller');

router.get('/responses',controller.domainResponses);
router.post('/responses/save',controller.domainResponsesSave);
module.exports = router;
