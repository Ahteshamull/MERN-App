
var jwt = require("jsonwebtoken");
const mauth = (req, res, next) => {
    const auth = req.headers["authorization"]
    if (!auth) {
        return res.status(403).send({message:"Unauthorized,JWT token is required"})
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_TOKEN)
        req.user = decoded
        next()
    } catch (error) {
         return res
           .status(403)
           .send({ message: "Unauthorized,JWT token is Wrong or expired" });
    }
}
module.exports = mauth