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

//home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//getting element in database 
app.get('/books', (req, res) => {
  connection.query('SELECT * FROM books', (error, results, fields) => {
    if (error) throw error;

    let bookList = '';

    for (let i = 0; i < results.length; i++) {
      bookList += `<div class="card" style="width: 18rem;">
      <img class="card-img-top" src="..." alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${results[i].title} </h5>
        <p class="card-text">${results[i].author}.</p>
        <a href="#" onclick="goToBooksPage(${results[i].id});" class="btn btn-primary">Go somewhere</a>
      </div>
      <br>
      <br>`;
    }

    const html = `
      <html>
        <head>
          <title>List of Books</title>
        </head>
        <body>
          <h1>List of Books</h1>
          <ul>
            ${bookList}
          </ul>
        </body>
      </html>
      <script>
      function goToBooksPage(id) {
        alert("in");
        window.location.href = "/book/"+id;
      }
      </script>

    `;
    res.send(html);
  });
});

//getting element in database 
app.get('/book/:id', (req, res) => {
  const { id } = req.params;
  connection.query(`SELECT * FROM books WHERE id=${id}`, (error, results, fields) => {
    
    if (error) throw error;

    let bookList = '';

    for (let i = 0; i < results.length; i++) {
      bookList += `<div class="card" style="width: 18rem;">
      <img class="card-img-top" src="..." alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${results[i].title} </h5>
        <p class="card-text">${results[i].author}.</p>
        <a href="#" onclick="goToBooksPage(${results[i].id});" class="btn btn-primary">Go somewhere</a>
      </div>
      <br>
      <br>`;
    }

    const html = `
      <html>
        <head>
          <title>List of Books</title>
        </head>
        <body>
          <h1>List of Books</h1>
          <ul>
            ${bookList}
          </ul>
        </body>
      </html>
      <script>
      function goToBooksPage(id) {
        alert("in2");
        window.location.href = "/"+id;
      }
      </script>

    `;
    res.send(html);
  });
});

//asserting element in database 
app.post('/books', (req, res) => {
  const { title, author, tags } = req.body;
  connection.query(`INSERT INTO books (title, author,tags) VALUES ("${title}", "${author}", "${tags}")`, (error, results, fields) => {
    if (error) throw error;
    res.redirect('/books');

  });
  res.redirect('/books');

});
  
//update element in database  
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
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
  