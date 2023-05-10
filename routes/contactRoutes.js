const express = require("express");
const router = express.Router();
const {getAllContacts, getContact, addContact, updateContact, deleteContact} = require("../controller/contactController");
const validateToken = require("../middleware/validateTokenHandler");


router.use(validateToken)
router.get("/", getAllContacts).post("/", addContact);
router.get("/:id",getContact).put("/:id", updateContact).delete("/:id", deleteContact);


module.exports = router;