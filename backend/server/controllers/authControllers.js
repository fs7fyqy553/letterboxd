require('dotenv').config({ path: `${__dirname}/../.env` });

function rejectAPICall(res) {
  res.status(401).json({ error: 'unauthorised' });
}

function checkAPIKey(key, res, next) {
  if (!key || key !== process.env.API_KEY) {
    rejectAPICall(res);
  } else {
    next();
  }
}

exports.authenticateAPICall = (req, res, next) => {
  const submittedAPIKey = req.get('API-Key');
  checkAPIKey(submittedAPIKey, res, next);
};
