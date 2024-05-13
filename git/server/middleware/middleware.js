function setCookieMiddleware(req, res, next) {
    // Устанавливаем куки, если сессия существует
    if (req.session) {
        res.cookie('user_sid', req.sessionID, { maxAge: 900000, httpOnly: true });
    }
    next();
}

module.exports = setCookieMiddleware;
