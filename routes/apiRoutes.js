const fs = require('fs');
const path = require('path');

module.exports = function (app) {
    // API Routes
    app.get("/api/notes", function (req, res) {
        // Read the db.json file 
        fs.readFile("db/db.json", "utf8", (err, data) => {

            if (err) throw err;

            var notes = JSON.parse(data);
            res.json(notes);
        });
    });

function createDbJson() {
    fs.writeFileSync('db/db.json', JSON.stringify([]))
}
 
    app.post("/api/notes", function (req, res) {
        fs.readFile("db/db.json", "utf8", (err, data) => {

            // If an error is thrown, it means the file doesn't exist, so we will create it
            if (err) {
                createDbJson();
            }

            try {

                var notes = err ? [] : JSON.parse(data) || [];
            } catch(err) {
                res.status(500).json({
                    error: "Internal Server Error",
                    ok: false
                })
            }

            if (!req.body.text || !req.body.title) {
                res.status(400).json({
                    error: "The request was invalid. Must include a text and title.",
                    ok: false
                })
            }

            let newNote = req.body;
            notes.push(newNote);
            console.log("Added new note: " + newNote.title);
            updateNotesFile(notes, res);
        });
    });

    app.get("/api/notes/:id", function (req, res) {
        // Read the db.json file 
        fs.readFile("db/db.json", "utf8", (err, data) => {

            if (err) throw err;

            var notes = JSON.parse(data);
            res.json(notes[req.params.id]);
        });
    });

    app.delete("/api/notes/:id", function (req, res) {
        fs.readFile("db/db.json", "utf8", (err, data) => {

            if (err) throw err;

            var notes = JSON.parse(data);
            notes.splice(req.params.id, 1);
            updateNotesFile();
            console.log("Removed note with id " + req.params.id);
        });
    });

    function updateNotesFile(notes, res) {
        console.log("notes", notes)
        fs.writeFile("db/db.json", JSON.stringify(notes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({
                    error: "Error saving the note",
                    ok: false
                })
            }

            return res.json({
                message: "Note saved successfully",
                ok: true
            })
        });
    }
}