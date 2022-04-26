const express = require('express');
const path = require('path');
var Promise = require('bluebird')
const app = express();
const fs = Promise.promisifyAll(require('fs'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('./public'));



app.get('/api/notes', function(req, res) {

    fs.readFileAsync("./db/db.json", "utf8").then(function(data) {
      notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
})

app.post('/api/notes', function(req, res) {
  const note = req.body;
  fs.readFileAsync("./db/db.json").then(function(data) {
    const notes = [].concat(JSON.parse(data));
    note.id = notes.length + 1
    notes.push(note);
    return notes;
  }).then(function(notes) {
    fs.writeFileAsync("./db/db.json", JSON.stringify(notes))
    res.json(note);
  })
});

app.delete('/api/notes/:id', function(req, res) {
  const noteDelete = parseInt(req.params.id);
  fs.readFileAsync('/db/db.json').then(function(data) {
    const notes = [].concat(JSON.parse(data));
  })
})

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });