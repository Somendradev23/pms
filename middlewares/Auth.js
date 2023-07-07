// write an middleware function that will check request is ajax or not
// if request is ajax then authenticate the user by jwt token

exports.iSAuthenticated = (req, res, next) => {
    if (req.headers['x-requested-with'] === 'XMLHttpRequest' || req.xhr || req.headers.host != req.headers.referer ) {
        // validate header token
        if (!req.headers.authorization) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }else {
            const token = req.headers.authorization.split(' ')[1];
            // validate token
            try {
                const decoded = jwt.verify(token, process.env.TOKEN_KEY);
                req.user = decoded;
                next();
            } catch (err) {
                return res.status(400).json({ message: "Invalid token" });
            }
        }
    }else{
        // if request is not ajax then set req.user = session
        req.user = req.session.user;
    }
}
