const router = require('express').Router();
const controller = require('./api.controller');

router.get('/responses',controller.domainResponses);
router.post('/responses/save',controller.domainResponsesSave);
router.get('/model/train',controller.trainModel);
router.post('/model',controller.useTrainedModel);
router.get('/model/list',controller.modelList);
router.post('/faqData',controller.faqIntent);
router.post('/faqData/save',controller.faqSave);
// router.post('/model',controller.useTrainedModel);
module.exports = router;
