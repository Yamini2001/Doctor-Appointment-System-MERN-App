const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    // Ensure the Authorization header is present
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ message: 'No token provided', success: false });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: 'No token provided', success: false });
    }

    // Verify the token
    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Auth Failed', success: false });
      }

      // Attach the decoded userId to the request
      req.body.userId = decoded.id; 
      next(); // Pass control to the next middleware/controller
    });
  } catch (error) {
    console.error('Auth Middleware Error:', error); // Log the error for debugging
    res.status(401).send({
      message: 'Auth Failed',
      success: false
    });
  }
};
