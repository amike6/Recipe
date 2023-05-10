const mysql=require('mysql');
const express= require('express');
const app= express();
const bodyParser=require('body-parser');
const cors = require('cors'); // import the cors package

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

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

app.get('/recipes',(req,res)=>{  
    connection.query('SELECT * FROM recipe', (error, results, fields) => {
        if(error) throw error;
        res.json(results);
    });
});
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});