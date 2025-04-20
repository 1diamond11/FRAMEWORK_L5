const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const patternsRoutes = require('./src/routes/v1/patternsRoutes');
const authorsRoutes = require('./src/routes/v1/authorsRoutes');
const errorHandler = require('./src/middlewares/errorMiddleware');

app.use(bodyParser.json());

app.use('/api/v1/patterns', patternsRoutes);
app.use('/api/v1/authors', authorsRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
