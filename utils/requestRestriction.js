const requestCounts = {};

const requestRestriction = (req, res, next) => {
    console.log('Current requestCounts:', requestCounts);
    console.log('Incoming IP:', req.ip);
    
    const restriction = parseInt(process.env.MAX_REQUESTS_PER_DAY) || 100;
    console.log('Restriction value:', restriction); // Add this to debug
    
    const ip = req.headers['x-forwarded-for'] || 
               req.connection.remoteAddress || 
               req.socket.remoteAddress || 
               req.ip;
    const currentTime = new Date();

    if (!requestCounts[ip]) {
        requestCounts[ip] = {
            count: 0,
            resetTime: new Date(currentTime).setHours(23, 59, 59, 999)
        };
    }

    if (currentTime > requestCounts[ip].resetTime) {
        requestCounts[ip] = {
            count: 0,
            resetTime: new Date(currentTime).setHours(23, 59, 59, 999)
        };
    }

    // Check if would exceed limit
    if (requestCounts[ip].count >= restriction) {
        return res.status(429).json({
            message: 'Request limit exceeded. Please try again tomorrow.'
        });
    }

    // If not exceeded, increment and proceed
    requestCounts[ip].count += 1;
    console.log('Updated count for IP:', ip, 'is:', requestCounts[ip].count);
    next();
};

module.exports = requestRestriction;
