const express = require('express');
const app = express();
const PORT = 3001;

// Phonebook sample data
let phonebook = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

// Routing
// Root
app.get('/', (req, res) => {
  res.send(`
    <h1>Phonebook API</h1>
    <p>Thanks for visiting this API page. In order to interact with the API please see the endpoints below:</p>
    <ul>
        <li>
            <h2>Entire phonebook</h2>
            <span>http://localhost:3001/api/persons</span>
        </li>
    </ul>`);
});

// Get info about the phonebook
app.get('/info', (req, res) => {
  const numOfEntries = phonebook.length;
  const now = new Date();
  res.send(`
  <p>Phonebook has info for ${numOfEntries} people</p>
  <p>${now}</p>
  `);
});

// Get entire phonebook
app.get('/api/persons', (req, res) => {
  res.json(phonebook);
});

// Get info for a single person
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const entry = phonebook.find((item) => item.id === +id);
  if (entry) {
    res.json(entry);
  } else {
    res.status(404).end();
  }
});

// Delete info for a single person
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  phonebook = phonebook.filter((item) => item.id !== +id);
  console.log(phonebook);
  res.status(204).end();
});

// Listen with server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
