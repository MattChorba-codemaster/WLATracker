const express = require('express');
const router = express.Router();
// const { requiresAuth } = require('express-openid-connect');

// const authCheck = (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
//   };
  
//   const profileCheck = (req, res) => {
//     res.send(JSON.stringify(req.oidc.user))
//   };

router.use('/', require('./swagger'));
router.use('/students', require('./students'));
// router.get('/', authCheck);
// router.get('/profile', requiresAuth(), profileCheck);

module.exports = router;
