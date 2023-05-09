const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'DB'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/books', (req, res) => {
    connection.query('SELECT * FROM books', (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    });
  });
  
  app.post('/books', (req, res) => {
    const { title, author, tags } = req.body;
    connection.query(`INSERT INTO books (title, author,tags) VALUES ("${title}", "${author}", "${tags}")`, (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    });
  });
  
  app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;
    connection.query(`UPDATE books SET title="${title}", author="${author}" WHERE id=${id}`, (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    });
  });
  
  app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    connection.query(`DELETE FROM books WHERE id=${id}`, (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    });
  });

  // Start the server and listen on port 3000
app.listen(3003, () => {
  console.log('Server listening on port 3002');
});
  