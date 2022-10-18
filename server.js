const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('./helpers/uuid.js');
const noteData = require('./db/db.json');


const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));





app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.get('/notes', (req, res)  => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
})

app.get('/api/notes', (req, res) => {
  return res.json(noteData)
  
})

app.post('/api/notes', (req, res) => {
  const {title, text} = req.body;

    const newNote = {
      title,
      text,
      id: uuid(),
    }
  
    // const noteString = JSON.stringify(newNote)
    
  //   fs.writeFile(`./db/db.json`, noteString, (err) =>
  //     err
  //       ? console.error(err)
  //       :console.log('error')
  //       )

  
  
  noteData.push(newNote);

  res.json(noteData)
})



app.delete('./api/notes/:id', (req, res) => {
  const remove = req.params.id
  res.json(notes)
  }
)



app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);