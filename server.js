const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('./helpers/uuid.js');
const app = express();
const PORT = process.env.PORT || 3001;

let noteData = path.join(__dirname, './db/db.json');
let notes = JSON.parse(fs.readFileSync(noteData)) || [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



// Route for index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
})
//ROute for notes.html
app.get('/notes', (req, res)  => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
})
// Route for the db.json file
app.get('/api/notes', (req, res) => {
  return res.json(notes)
  
})

app.post('/api/notes', (req, res) => {
  const {title, text} = req.body;

    const newNote = {
      title,
      text,
      id: uuid(),
    }    
    
    notes.push(newNote);
    
    fs.writeFileSync(noteData, JSON.stringify(notes));
    res.end();
})



app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id
  const index = notes.findIndex((note) => note.id === id)

  notes.splice(index, 1)
  fs.writeFileSync(noteData, JSON.stringify(notes)) 

  res.end()
  }
)



app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);