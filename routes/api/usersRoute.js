const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/usersController");
const jwt = require("jsonwebtoken");
const debug = require("debug")("mern:routes:usersRoute");

// POST /api/users
router.post("/", usersCtrl.create);

router.post("/login", usersCtrl.login);

const checkToken = (req, res, next) => {
  const header = req.get("Authorization");
  const token = header.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, process.env.SECRET);
    debug(payload.user);
    res.locals.user = payload.user;
    next();
  } catch (error) {
    res.status(401).json("Unauthorized");
  }
};

router.get("/check-token", [checkToken], (req, res) => {
  const user = res.locals.user;
  res.json(user);
});

module.exports = router;