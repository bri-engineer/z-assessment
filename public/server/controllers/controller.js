const db = require('../models/model');

const controller = {};

controller.postUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const query = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING email`;
    const values = [email, password];
    const results = await db.query(query, values);
    res.locals.users = results.rows[0];
    res.locals.email = results.rows[0].email;
    res.locals.password = results.rows[0].password;
    return next();
  } catch (err) {
    return next({
      log: `controller.postUser: ERROR: ${err}`,
      status: 500,
      message: {
        err: 'Unable to post users',
      },
    });
  }
};

controller.getUsers = async (req, res, next) => {
  try {
    const query = `SELECT * FROM users`;
    const results = await db.query(query);
    if (!results.rows) {
      return next({
        log: 'Error occurred in controller.getUsers. No messages existed in table',
        status: 400,
        message: {
          err: 'No usersto be loaded.',
        },
      });
    }
    res.locals.users = results.rows;
    return next();
  } catch (err) {
    return next({
      log: `controller.getUsers: ERROR: ${err}`,
      status: 500,
      message: {
        err: 'Unable to load users.',
      },
    });
  }
};

controller.putBiography = async (req, res, next) => {
  const { biography, email } = req.body;
  try {
    const query = `UPDATE users SET biography = $1 WHERE email = $2 RETURNING biography, email`;
    const values = [biography, email];
    const results = await db.query(query, values);
    res.locals.users = results.rows[0];
    res.locals.email = results.rows[0].email;
    res.locals.biography = results.rows[0].biography;
    return next();
  } catch (err) {
    return next({
      log: `controller.putBiography: ERROR: ${err}`,
      status: 500,
      message: {
        err: 'Unable to put biography',
      },
    });
  }
};

controller.putAddress = async (req, res, next) => {
  const { street, city, state, zip_code, email } = req.body;
  try {
    const query = `UPDATE users SET street = $1, city = $2, state = $3, zip_code = $4 WHERE email = $5 RETURNING street, city, state, zip_code, email`;
    const values = [street, city, state, zip_code, email];
    const results = await db.query(query, values);
    res.locals.users = results.rows[0];
    res.locals.email = results.rows[0].email;
    res.locals.street = results.rows[0].street;
    res.locals.city = results.rows[0].city;
    res.locals.state = results.rows[0].state;
    res.locals.zipCode = results.rows[0].zip_code;
    return next();
  } catch (err) {
    return next({
      log: `controller.putAddress: ERROR: ${err}`,
      status: 500,
      message: {
        err: 'Unable to put address',
      },
    });
  }
};

controller.putBirthdate = async (req, res, next) => {
  const { day, month, year, email } = req.body;
  try {
    const query = `UPDATE users SET birth_date = TO_DATE($1 || ' ' || $2 || ' ' || $3, 'DD Month YYYY') WHERE email = $4 RETURNING birth_date, email`;
    const values = [day, month, year, email];
    const results = await db.query(query, values);
    res.locals.users = results.rows[0];
    res.locals.email = results.rows[0].email;
    res.locals.birthdate = results.rows[0].birth_date;
    return next();
  } catch (err) {
    return next({
      log: `controller.putBirthdate: ERROR: ${err}`,
      status: 500,
      message: {
        err: 'Unable to put birthdate',
      },
    });
  }
};

module.exports = controller;
