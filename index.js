const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = 3000;

app.use(bodyParser.json());

//Sequelize
const sequelize = new Sequelize({
  dialect: 'mysql',
  username: 'root',
  password: 'password',
  database: 'your_database_name',
});

//Models
const db = {};
db.Company = require('./models/company')(sequelize);
db.Country = require('./models/country')(sequelize);
db.Contact = require('./models/contact')(sequelize);

//Define associations
db.Company.hasMany(db.Contact);
db.Country.hasMany(db.Contact);
db.Contact.belongsTo(db.Company);
db.Contact.belongsTo(db.Country);

//Routes
const companyRoutes = require('./routes/companyRoutes');
const countryRoutes = require('./routes/countryRoutes');
const contactRoutes = require('./routes/contactRoutes');

//Use routes
app.use(companyRoutes);
app.use(countryRoutes);
app.use(contactRoutes);

//Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//URL
app.get('/', (req, res) => {
  res.send('Welcome to my Basic Web API!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
