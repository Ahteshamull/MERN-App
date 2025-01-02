const { registration, login } = require("../controller/authController");
const { signUpValidation, loginValidation } = require("../middlewares/authMiddleware");

const router = require("express").Router()
router.post("/registration", signUpValidation,registration
);
router.post("/login", loginValidation,login
);
module.exports = router
