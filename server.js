const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
const morgan = require('morgan')
const session = require('express-session')
const authController = require('./controllers/auth.js')
const paintingController = require('./controllers/paintings.js')
const usersController = require('./controllers/users.js')
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)
mongoose.connection.on("connected", () =>{
    
})
mongoose.connection.on('error', () => {
    console.error()
})

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'))
app.use(express.static('public'));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
})
);
app.use('/auth', authController);
app.use(passUserToView)
app.use(isSignedIn);
app.use('/users/:userId/paintings',paintingController);
app.use('/users', usersController);

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.listen(3000, () =>{
    
})