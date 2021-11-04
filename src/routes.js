const Router = require('express').Router;

const router = Router();

const registerController = require('./controllers/registerController');

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Teste'
  });
});

router.post('/auth/register', registerController.register);
router.post('/auth/login', registerController.login);

module.exports = router;