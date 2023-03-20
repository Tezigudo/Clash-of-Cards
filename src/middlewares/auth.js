// const jwt = require('jwt-then');

// modules.exports = async (req, res, next) => {

//     try {

//         if (!req.headers.authorization) {
//             throw "Forbidden"
//         }
//         const token = req.headers.authorization.split(" ")[1];

//         const payload = await jwt.verify(token, process.env.SECRET)
//         req.payload = payload;
//         next();
//     } catch (err) {
//         res.status(401).json({
//             message: "Forbidden" 
//         })
//     }
// };


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

module.exports = {
    loginRequired,
    logoutRequired
};
