
const CatchError = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => {
            // validtion error
            if (typeof (err) == "string") {
                res.status(400).json({ message: err });
            } else {
                next(err);
            }
        })
    }
}

module.exports =  CatchError;
