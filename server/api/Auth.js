const {
  models: { User },
} = require('../db/index');
const router = require('express').Router();
const { requireUserToken } = require('./Utils');

// POST /api/auth
// client sends credentials as a payload to this route
// server returns a token, a string that can't be manipulated & will identify user
router.post('/', async (req, res, next) => {
  try {
    console.log('-----> POST ROUTE, req.body', req.body);
    const { email, password } = req.body;
    const token = await User.authentication({ email, password });
    console.log('-----> POST ROUTE, token', token);
    res.send({ token });
  } catch (err) {
    next(err);
  }
});

// GET /api/auth
// assumes that the authorization header has been set on the request and it uses that to verify the user by its token. For convenience, we'll send this token back with a header, which verifies payload and header have not been altered
router.get('/', requireUserToken, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
