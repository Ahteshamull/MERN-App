const mauth = require("../middlewares/mauth");

const router = require("express").Router();

router.get("/", mauth, (req, res) => {
  console.log("Logged in user details", req.user);
  res.status(200).send(
    {
      name: "Mobile",
      price: "$1999",
    },
    {
      name: "Tv",
      price: "$599",
    }
  );
});
module.exports = router;
