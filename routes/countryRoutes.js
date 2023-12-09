const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');

router.post('/countries', countryController.createCountry);
router.get('/countries', countryController.getAllCountries);
router.put('/countries/:id', countryController.updateCountry);
router.delete('/countries/:id', countryController.deleteCountry);

module.exports = router;
