const requestCounts = {};

const requestRestriction = (req, res, next) => {
    const restriction = parseInt(process.env.MAX_REQUESTS_PER_DAY) 
    const ip = req.ip;
    const currentTime = new Date();

    // If this is the first request from this IP, initialize the record
    if (!requestCounts[ip]) {
        requestCounts[ip] = {
            count: 1, // Start at 1 for the first request
            resetTime: new Date(currentTime).setHours(23, 59, 59, 999)
        };
        return next();
    }

    const { count, resetTime } = requestCounts[ip];

    // Check if the day has changed
    if (currentTime > resetTime) {
        requestCounts[ip] = {
            count: 1, // Start at 1 for this new request
            resetTime: new Date(currentTime).setHours(23, 59, 59, 999)
        };
        return next();
    }

    // Check if the IP has exceeded the max requests
    if (count >= restriction) {
        return res.status(429).json({
            message: 'Request limit exceeded. Please try again tomorrow.'
        });
    }

    // Increment the count and allow the request
    requestCounts[ip].count += 1;
    next();
};

module.exports = requestRestriction;
