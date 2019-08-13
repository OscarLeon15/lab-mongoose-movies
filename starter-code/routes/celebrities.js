const express = require("express");
const router = express.Router();
// require Author model in orderr to use it for CRUD
const Celebrity = require("../models/Celebrity");

router.get("/celebrities", (req, res, next) => {
  Celebrity
  .find()
  .then(celebritiesFromDB => res.render("celebrities", {celebrities: celebritiesFromDB} ))
  .catch(err => console.log("error while getting the celebrities from the DB: ", err))
})




module.exports = router;

