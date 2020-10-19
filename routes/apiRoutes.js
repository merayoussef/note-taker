const router = require('express').Router();
const { fstat } = require('fs');
const path = require('path');

router.get("/api/notes", (req, res) => {
    // read db.json and return all saved notes as JSON
    req.readFileSync('../db/db.json');
    res.json.parse();
});

router.post("/api/notes" , (req, res) => {
   // receive a new note to save on the request body and add to db.json and return new note to client
})

module.exports = router;