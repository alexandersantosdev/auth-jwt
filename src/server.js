require('dotenv').config();
require('./database/config');

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(require('./routes'));

app.listen(PORT, () => { console.log(`Running at http://localhost:${PORT}`)})