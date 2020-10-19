const fs = require('fs');
const path = require('path');

module.exports = app => {
    fs.readFile("db/db.json","utf8", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);

        // API Routes
        app.get("/api/notes", function(req, res) {
            // Read the db.json file 
            res.json(notes);
        });

        app.post("/api/notes", function(req, res) {
            // Receive a new note and add it to db.json
            let newNote = req.body;
            notes.push(newNote);
            updateNotesFile();
            return console.log("Added new note: "+newNote.title);
        });

        app.get("/api/notes/:id", function(req,res) {
            // display json for the notes array indices of the provided id
            res.json(notes[req.params.id]);
        });

        app.delete("/api/notes/:id", function(req, res) {
            notes.splice(req.params.id, 1);
            updateNotesFile();
            console.log("Removed note with id "+ req.params.id);
        });

        // HTML Routes
        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        function updateNotesFile() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }

    });

}