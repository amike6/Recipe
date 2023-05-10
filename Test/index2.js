const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Use bodyParser to parse form data in request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Mock data to store in API
let books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    tags: ['classic', 'fiction']
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    tags: ['classic', 'fiction']
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    tags: ['dystopian', 'fiction']
  }
];
// Route for creating a new book entry from a form submission
app.post('/books', (req, res) => {
  // Generate a new ID for the book
  const newId = books.length + 1;

  // Create a new book object with the ID and data from the request body
  const newBook = {
    id: newId,
    title: req.body.title,
    author: req.body.author
  };

  // Add the new book to the array of books
  books.push(newBook);

  // Redirect to the home page after adding the new book
  res.redirect('/display');
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
// Route for rendering the home page with the list of books
app.get('/display', (req, res) => {
  // Render the list of books as HTML
  let bookList = '';
  books.forEach(book => {
    bookList += `<li>${book.title} by ${book.author}</li>`;
  });

  const html = `
    
        <ul>
          ${bookList}
        </ul>
        
  `;

  res.send(html);

});

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});