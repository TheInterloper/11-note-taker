const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const fs = require('fs');

const app = express();

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));





app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.get('/notes', (req, res)  => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
})

app.get('/api/notes', (req, res) => {
  return res.json(notes)
  
})

app.post('/api/notes', (req, res) => {
  const newNote = req.body;

  notes.push(newNote);
  return res.json(notes)
})







app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);