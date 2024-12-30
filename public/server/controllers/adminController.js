const db = require('../models/model');

const adminController = {};

adminController.getConfig = async (req, res, next) => {
  try {
    const query = `SELECT biography, address, birthdate FROM admin`;
    const results = await db.query(query);
    if (!results.rows) {
      return next({
        log: 'Error occurred in adminController.getConfig No messages existed in table',
        status: 400,
        message: {
          err: 'No configs to be loaded.',
        },
      });
    }
    res.locals.config = results.rows[0];
    res.locals.biographyConfig = results.rows[0].biography;
    res.locals.addressConfig = results.rows[0].address;
    res.locals.birthdateConfig = results.rows[0].birthdate;
    return next();
  } catch (err) {
    return next({
      log: `adminController.getConfig: ERROR: ${err}`,
      status: 500,
      message: {
        err: 'Unable to load configs.',
      },
    });
  }
};

adminController.putConfig = async (req, res, next) => {
  const { biography, address, birthdate } = req.body;
  try {
    const query = `UPDATE admin SET biography = $1, address = $2, birthdate = $3 WHERE id = $4 RETURNING biography, address, birthdate`;
    const values = [biography, address, birthdate, 1];
    const results = await db.query(query, values);
    res.locals.config = results.rows[0];
    console.log(res.locals.config);
    res.locals.biographyConfig = results.rows[0].biography;
    res.locals.addressConfig = results.rows[0].address;
    res.locals.birthdateConfig = results.rows[0].birthdate;
    return next();
  } catch (err) {
    return next({
      log: `adminController.putConfig: ERROR: ${err}`,
      status: 500,
      message: {
        err: 'Unable to put configs',
      },
    });
  }
};

module.exports = adminController;
