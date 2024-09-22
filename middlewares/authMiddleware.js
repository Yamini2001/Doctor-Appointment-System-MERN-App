const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Make sure the Authorization header is present
    if (!token) {
      return res.status(401).send({ message: 'No token provided', success: false });
    }

    // Verify the token
    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Auth Failed', success: false });
      } else {
        req.body.userId = decoded.id; // Attach the decoded userId to the request
        next(); // Pass control to the next middleware
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: 'Auth Failed',
      success: false
    });
  }
};
