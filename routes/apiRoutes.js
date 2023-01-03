const fs = require('fs');

const { v4: uuidv4 } = require('uuid');

module.exports = function (app) {
    app.get('/api/notes', (req, res) => {
        let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
        res.json(data);
    });

    app.post("/api/notes", (req, res) => {
        const newNote = req.body;
        newNote.id = uuidv4();
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        data.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(data));
        res.json(data);
    });

    app.delete("/api/notes/:id", (req, res) => {
        let noteId = req.params.id.toString();
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        const newData = data.filter( note => note.id.toString() !== noteId );
        fs.writeFileSync('./db/db.json', JSON.stringify(newData));
        res.json(newData);
    });
}