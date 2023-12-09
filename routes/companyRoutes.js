const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

router.post('/companies', companyController.createCompany);
router.get('/companies', companyController.getAllCompanies);
router.put('/companies/:id', companyController.updateCompany);
router.delete('/companies/:id', companyController.deleteCompany);

module.exports = router;
