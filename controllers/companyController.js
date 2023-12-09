const db = require('../models/company');

const createCompany = async (req, res) => {
  try {
    const company = await db.Company.create(req.body);
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await db.Company.findAll();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await db.Company.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedCompany = await db.Company.findOne({ where: { id: id } });
      res.json(updatedCompany);
    } else {
      res.status(404).json({ message: 'Company not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCompany = async (req, res) => {
  const { id } = req.params;
  try {
    await db.Company.destroy({
      where: { id: id },
    });
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCompany,
  getAllCompanies,
  updateCompany,
  deleteCompany,
};
