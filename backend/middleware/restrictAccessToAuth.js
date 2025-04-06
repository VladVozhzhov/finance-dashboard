const restrictAccessToAuth = (req, res, next) => {
    const referer = req.headers.referer || '';
    if (referer.includes('/auth')) {
        next(); // Allow access if the referer is /auth
    } else {
        res.status(403).json({ message: 'Access denied. You must access this route from /auth.' });
    }
};

module.exports = restrictAccessToAuth;