const {
  models: { User },
} = require('../db/index');
const router = require('express').Router();

// POST /api/auth
// client sends credentials as a payload to this route
// server returns a token, a string that can't be manipulated & will identify user
router.post('/', async (req, res, next) => {
  try {
    //console.log('-----> POST ROUTE');
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

// GET /api/auth
// assumes that the authorization header has been set on the request and it uses that to verify the user by its token. For convenience, we'll send this token back with a header, which verifies payload and header have not been altered
router.get('/', async (req, res, next) => {
  try {
    // class method handles logic for the token
    res.send(await User.byToken(req.headers.authorization));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
