


const express = require('express');

const app = express();

const cors = require("cors");

const bodyParser = require("body-parser");

const bcrypt = require("bcrypt-nodejs")


app.use(bodyParser.json());

const knex = require('knex');

//const { restart } = require('nodemon');



const register = require('./controllers/register');

const profile = require('./controllers/profile');

const signin = require('./controllers/signin');

const image = require('./controllers/image');

app.use(cors())

// Check for existing

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Sergmont',
        database: 'smart-brain'
    }

});


const port_num = 3001;


app.listen(port_num, () => {
    console.log(`App is running on port ${port_num} ... `)
});


app.get('/', (req, resp) => {
//    db.select("*").from("users")
//        .then(data => resp.json(data))
//        .catch(error => resp.status(400).json("Error while this request"));
});


app.get('/profile/:id', profile.handleProfile(db));

app.post('/signin', signin.handleSignIn(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt));

app.put('/image', image.handleImage(db));
