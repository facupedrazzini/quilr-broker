const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// Routes
require('./routes')(app);

app.listen(8080, () => console.log('Listening on port 8080!'));
