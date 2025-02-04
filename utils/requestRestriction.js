const requestCounts = {};

const requestRestriction = (req, res, next) => {
    // Let's add some debug logging
    console.log('Current requestCounts:', requestCounts);
    console.log('Incoming IP:', req.ip);
    
    const restriction = parseInt(process.env.MAX_REQUESTS_PER_DAY) || 100;
    const ip = req.ip;
    const currentTime = new Date();

    // Initialize for new IP
    if (!requestCounts[ip]) {
        requestCounts[ip] = {
            count: 0,  // Start at 0 before incrementing
            resetTime: new Date(currentTime).setHours(23, 59, 59, 999)
        };
    }

    // Check reset time
    if (currentTime > requestCounts[ip].resetTime) {
        requestCounts[ip] = {
            count: 0,  // Start at 0 before incrementing
            resetTime: new Date(currentTime).setHours(23, 59, 59, 999)
        };
    }

    // First increment the count
    requestCounts[ip].count += 1;

    // Then check if exceeded
    if (requestCounts[ip].count > restriction) {
        return res.status(429).json({
            message: 'Request limit exceeded. Please try again tomorrow.'
        });
    }

    console.log('Updated count for IP:', ip, 'is:', requestCounts[ip].count);
    next();
};

module.exports = requestRestriction;
