exports.IsAuth = async (req, res, next) => {
    console.log(req.se)
    if (await req.session.email) {
        next()
    } else {
        res.status(401).json({"isSuccess": false, "comment": "Not authenticated"})
    }
}
