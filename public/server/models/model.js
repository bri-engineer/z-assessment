const { Pool } = require('pg');

// Normally, I would've taken advantage of an environment variable with an env file for secuirty. For the assessment purpose, i will just lay out the db uri below.
const URI =
  'postgres://hcgkodlh:2r73G2pfK8Revg-qClXw6OJRofDaO8N8@lallah.db.elephantsql.com/hcgkodlh';

const pool = new Pool({
  connectionString: URI,
});

const connectToDB = async () => {
  try {
    await pool.connect();
    console.log('Connected to the DB.');
  } catch (err) {
    console.error('Error connecting to the DB:', err.message);
  }
};

connectToDB();

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
