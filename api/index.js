const router = require('express').Router();
const controller = require('./api.controller');
const eduController = require('./educApi.controller')

router.get('/responses',controller.domainResponses);
router.post('/responses/save',controller.domainResponsesSave);
router.get('/model/train',controller.trainModel);
router.post('/model',controller.useTrainedModel);
router.get('/model/list',controller.modelList);
router.post('/faqData',controller.faqIntent);
router.post('/faqData/save',controller.faqSave);
router.post('/faqData/delete',controller.faqDelete);
// router.post('/model',controller.useTrainedModel);

router.post('/abroadData',eduController.abroadData);

module.exports = router;
