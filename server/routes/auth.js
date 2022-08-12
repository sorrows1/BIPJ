const express = require('express')
const router = express.Router()
const passport = require('passport')

const CLIENT_URL = 'http://localhost:3000/shop'

router.get('/google', passport.authenticate('google', {scope: ['profile']}));

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed'
}))

router.get('/login/success', (req, res) => {
  if (!req.user) return res.status(401).json({});
  res.status(200).json({ 
    message: 'success',
    user: req.user,
  });
});

router.get('/login/failed', (req, res) => {
    res.status(401).json({message: 'failure'})
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect(CLIENT_URL)
})

module.exports = router