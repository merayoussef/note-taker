const path = require("path");
const router = require("express").Router();

router.get("/notes", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/notes.html"));
});

router.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

module.exports = router;