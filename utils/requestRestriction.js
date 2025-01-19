const requestCounts = {};

const requestRestriction = (req, res, next) => {
  const restriction = process.env.MAX_REQUESTS_PER_DAY;
  const ip = req.ip; // Get the IP address of the user
  const currentTime = new Date();

  // If this is the first request from this IP, initialize the record
  if (!requestCounts[ip]) {
    requestCounts[ip] = {
      count: 0,
      resetTime: currentTime.setHours(23, 59, 59, 999) // Set reset time to end of the day
    };
  }

  const { count, resetTime } = requestCounts[ip];

  // Check if the day has changed (current time is after resetTime)
  if (currentTime > resetTime) {
    // If it's a new day, reset the request count
    requestCounts[ip] = {
      count: 0,
      resetTime: currentTime.setHours(23, 59, 59, 999) // Reset to the end of today
    };
  }

  // Check if the IP has exceeded the max requests
  if (count >= restriction) {
    return res.status(429).json({ message: 'Request limit exceeded. Please try again tomorrow.' });
  }

  // Allow the request and increment the count
  requestCounts[ip].count += 1;

  next(); // Proceed with the request
};

module.exports = requestRestriction;
