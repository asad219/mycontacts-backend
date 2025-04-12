const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
//**** GET ALL CONTACTS AND CREATE CONTACT BECAUSE ROUTE IS SAME SINGLE SLASH "/" */
router.route("/").get(getContacts).post(createContact);

//**** GET, UPDATE, DELETE SINGLE CONTACT BECAUSE ROUTE IS SAME SINGLE SLASH WITH ID PARAM "/:id" */
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);


module.exports = router;
