const express = require("express");
const router = new express.Router();

const { signup, signin, signout, requireSignin } = require("../controllers/auth");
const { userSignupValidator } = require("../validators/index");

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);
// router.get("/hello", requireSignin, (req, res) => {
//     res.send("hello ji");
// })

module.exports = router;