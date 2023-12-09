const db = require('../models/country');

const createCountry = async (req, res) => {
  try {
    const country = await db.Country.create(req.body);
    res.json(country);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCountries = async (req, res) => {
  try {
    const countries = await db.Country.findAll();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCountry = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await db.Country.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedCountry = await db.Country.findOne({ where: { id: id } });
      res.json(updatedCountry);
    } else {
      res.status(404).json({ message: 'Country not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCountry = async (req, res) => {
  const { id } = req.params;
  try {
    await db.Country.destroy({
      where: { id: id },
    });
    res.json({ message: 'Country deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCountry,
  getAllCountries,
  updateCountry,
  deleteCountry,
};
