const express = require("express");
const { registerUser, loginUser, currentUser, testroute } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

//**** GET ALL CONTACTS AND CREATE CONTACT BECAUSE ROUTE IS SAME SINGLE SLASH "/" */
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

 router.get("/testroute", testroute);

module.exports = router;
