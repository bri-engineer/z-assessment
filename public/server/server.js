const express = require('express');
const app = express();
const path = require('path');
const PORT = 3333;
const router = require('./routes/router');
const adminRouter = require('./routes/adminRouter');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route handler
app.use('/users', router);
app.use('/admin', adminRouter);

// Catch-all route
app.get('*', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../src/index.html'));
});

// Error handler
app.use('*', (req, res) => {
  return res.status(404).send('Not found.');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error.',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
