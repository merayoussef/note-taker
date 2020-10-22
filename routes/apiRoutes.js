const fs = require('fs');
const path = require('path');

module.exports = function(app) {
        // API Routes
        app.get("/api/notes", function(req, res) {
            // Read the db.json file 
            fs.readFile("db/db.json","utf8", (err, data) => {

                if (err) throw err;
        
                var notes = JSON.parse(data);
                res.json(notes);
            });
        });

        app.post("/api/notes", function(req, res) {
            fs.readFile("db/db.json","utf8", (err, data) => {

                if (err) throw err;
        
            var notes = JSON.parse(data);
            let newNote = req.body;
            notes.push;
            updateNotesFile(newNote);
            return console.log("Added new note: "+newNote.title);
        });
    });

        app.get("/api/notes/:id", function(req,res) {
        // Read the db.json file 
        fs.readFile("db/db.json","utf8", (err, data) => {

            if (err) throw err;
    
            var notes = JSON.parse(data);
            res.json(notes[req.params.id]);
        }); 
    });

        app.delete("/api/notes/:id", function(req, res) {
            fs.readFile("db/db.json","utf8", (err, data) => {

                if (err) throw err;
        
            var notes = JSON.parse(data);
            notes.splice(req.params.id, 1);
            updateNotesFile();
            console.log("Removed note with id "+ req.params.id);
        });
    });
        function updateNotesFile(notes) {
            console.log("notes", notes)
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }
}