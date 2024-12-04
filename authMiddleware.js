const API_KEY = "password";

const authenticate = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey && apiKey === API_KEY) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
};

module.exports = authenticate;
