require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('./src/config/database');
const { errorHandler } = require('./src/middleware/errorHandler');


const authRoutes = require('./src/routes/authRoutes');


const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/auth', authRoutes);
app.use(errorHandler);

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});