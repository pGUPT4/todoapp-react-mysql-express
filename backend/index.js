const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const routes = require('./src/routes/routes');


const port = process.env.PORT;
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({
    limit: '5mb',
    extended: true,
}));
app.use(cors());

app.use('/api', routes);



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
