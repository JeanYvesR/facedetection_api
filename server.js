const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'roulet70T',
    database : 'finalproject'
  }
});

const app = express();

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
	db.select('*').from('users')
	.then(users => {
		res.json(users);
	})
});

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt) });

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) } );

app.put('/image', (req, res) => { image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)});

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on http://localhost:${process.env.PORT}`);
});

/*
//API
/ --> res = this is working
/ --> signin --> POST success/fail (POST: securely sending passwords and critical data)
/ --> register --> POST = user
/ --> profile/:userId --> GET = user
/ --> image --> PUT --> user
*/
