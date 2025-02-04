const requestCounts = {};

const requestRestriction = (req, res, next) => {
  const restriction = process.env.MAX_REQUESTS_PER_DAY || 100; // Default limit if env is missing
  const ip = req.ip;
  const currentTime = new Date();

  if (!requestCounts[ip] || currentTime > requestCounts[ip].resetTime) {
    requestCounts[ip] = {
      count: 0,
      resetTime: new Date().setHours(23, 59, 59, 999) // Reset to midnight correctly
    };
  }

  if (requestCounts[ip].count >= restriction) {
    return res.status(429).json({ message: 'Request limit exceeded. Please try again tomorrow.' });
  }

  requestCounts[ip].count += 1;

  next();
};

module.exports = requestRestriction;
