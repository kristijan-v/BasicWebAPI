const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Sequelize
const sequelize = new Sequelize({
  dialect: 'mysql',
  username: 'root',
  password: 'password',
  database: '',
});

//Models
const Company = sequelize.define('Company', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Country = sequelize.define('Country', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Contact = sequelize.define ('Contact', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Company.hasMany(Contact);
Country.hasMany(Contact);
Contact.belongsTo(Company);
Contact.belongsTo(Country);

//CRUD op.
//Create
app.post('/companies', async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/countries', async (req, res) => {
  try {
    const country = await Country.create(req.body);
    res.json(country);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/contacts', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Read
app.get('/companies' , async (req, res) => {
  const companies = await Company.findAll();
  res.json(companies);
});

app.get('/countries' , async (req, res) => {
  const countries = await Country.findAll();
  res.json(countries);
});

app.get('/contacts', async (req, res) => {
  const contacts = await Contact.findAll({
    include: [Company, Country],
  });
  res.json(contacts);
});

// Update
app.put('/companies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Company.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedCompany = await Company.findOne({ where: { id: id } });
      res.json(updatedCompany);
    } else {
      res.status(404).json({ message: 'Company not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/countries/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Country.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedCountry = await Country.findOne({ where: { id: id } });
      res.json(updatedCountry);
    } else {
      res.status(404).json({ message: 'Country not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Contact.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedContact = await Contact.findOne({
        where: { id: id },
        include: [Company, Country],
      });
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete
app.delete('/companies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCompany = await Company.destroy({
      where: { id: id },
    });
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/countries/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCountry = await Country.destroy({
      where: { id: id },
    });
    res.json({ message: 'Country deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedContact = await Contact.destroy({
      where: { id: id },
    });
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
