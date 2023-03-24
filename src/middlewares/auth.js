const jwt = require('jwt-then');

async function verifyToken(req, res, next) {
    try {
        if (!req.headers.authorization) {
            throw "Forbidden"
        }
        const token = req.headers.authorization.split(" ")[1];

        const payload = await jwt.verify(token, process.env.SECRET)
        req.payload = payload;
        next();
    } catch (err) {
        console.error(err)
        res.clearCookie('token'); // clear cookie ( so user will logout)
        res.redirect('/login')
        res.status(401).json({
            message: "Frbidden"
        })

    }
};


function loginRequired(req, res, next) {


    if (!req.cookies.token) {

        console.error("Unauthorized user! Please login to continue")

        return res.redirect('/login');
    }

    req.headers.authorization = `Bearer ${req.cookies.token}`;

    next();
}

function logoutRequired(req, res, next) {
    if (req.cookies.token) {
        return res.redirect('/');
    }
    next();
}

function profile(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ message: 'Invalid token' });

    }
    res.send(req.user);
    next();
};


module.exports = {
    loginRequired,
    logoutRequired,
    verifyToken,
    profile
};
