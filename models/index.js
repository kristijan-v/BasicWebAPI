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

app.get('countries' , async (req, res) => {
  const countries = await Country.findAll();
  res.json(countries);
});

app.gey('/contacts', async (req, res) => {
  const contacts = await Contact.findAll({
    include: [Company, Country],
  });
  res.json(contacts);
});

// Update
//Todo it later!

