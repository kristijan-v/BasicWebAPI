const db = require('../models/contact');

const createContact = async (req, res) => {
  try {
    const contact = await db.Contact.create(req.body);
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await db.Contact.findAll({
      include: [db.Company, db.Country],
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await db.Contact.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedContact = await db.Contact.findOne({
        where: { id: id },
        include: [db.Company, db.Country],
      });
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    await db.Contact.destroy({
      where: { id: id },
    });
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  updateContact,
  deleteContact,
};
