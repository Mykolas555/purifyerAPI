const requestCounts = {};

const requestRestriction = (req, res, next) => {
    // Get the original client IP (first IP in X-Forwarded-For chain)
    const forwardedIps = req.headers['x-forwarded-for'] ? 
        req.headers['x-forwarded-for'].split(',')[0].trim() : 
        req.ip;
        
    const ip = forwardedIps;
    const restriction = parseInt(process.env.MAX_REQUESTS_PER_DAY) || 100;
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

    if (requestCounts[ip].count >= restriction) {
        return res.status(429).json({
            message: 'Request limit exceeded. Please try again tomorrow.'
        });
    }

    requestCounts[ip].count += 1;
    next();
};

module.exports = requestRestriction;
