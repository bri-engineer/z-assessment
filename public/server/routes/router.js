const express = require('express');
const controller = require('../controllers/controller');

const router = express.Router();

router.post('/', controller.postUser, (req, res) => {
  return res.status(200).json(res.locals.users);
});

router.get('/', controller.getUsers, (req, res) => {
  return res.status(200).json(res.locals.users);
});

router.put('/updateBiography', controller.putBiography, (req, res) => {
  return res.status(200).json(res.locals.users);
});

router.put('/updateAddress', controller.putAddress, (req, res) => {
  return res.status(200).json(res.locals.users);
});

router.put('/updateBirthdate', controller.putBirthdate, (req, res) => {
  return res.status(200).json(res.locals.users);
});

module.exports = router;
