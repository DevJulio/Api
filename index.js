'usea strict';
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const picturesRoutes = require('./routes/pictures-routes');

const app = express()
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', picturesRoutes.routes)

app.listen(config.port, () => console.log('App funcionando na porta ' + config.port));