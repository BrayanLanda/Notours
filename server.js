const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD ); 

mongoose.connect(DB)
    .then(() => console.log('DATABASE connection successfully..'));

const port = process.env.PORT || 3000;

//START SERVER
app.listen(port, () => {
    console.log(`App running on port ${port}`);
})