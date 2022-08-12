const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const passportInit = require('./passport.js');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const rewardRoute = require('./routes/reward.route')
const authRoute = require('./routes/auth');
const codeRoute = require('./routes/code.route')

const app = express();

app.use(cookieParser());
app.use(
  session({
    key: 'pulse_session',
    secret: 'somethingsecretgoeshere',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());


app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/rewards', rewardRoute)
app.use('/api/v1/codes', codeRoute)
app.use('/auth', authRoute);

module.exports = app;
