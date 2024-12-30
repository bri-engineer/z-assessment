const express = require('express');
const adminController = require('../controllers/adminController');

const adminRouter = express.Router();

adminRouter.get('/', adminController.getConfig, (req, res) => {
  return res.status(200).json(res.locals.config);
});

adminRouter.put('/', adminController.putConfig, (req, res) => {
  return res.status(200).json(res.locals.config);
});

module.exports = adminRouter;
