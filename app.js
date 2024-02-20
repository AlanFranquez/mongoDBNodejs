if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();

const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = 'mongodb+srv://' + process.env.DATABASE_URL; // Usar la variable de entorno

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect(); // Conectar el cliente
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);

    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

const expressLayout = require('express-ejs-layouts');

app.set("view engine", "ejs");
app.set("views", __dirname + '/views')
app.set('layout', 'layouts/layout');
app.use(expressLayout)
app.use(express.static('public'));

const indexRouter = require('./routes/index');
const { error } = require('console');
app.use('/', indexRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log('Subido en el puerto ' + 3000);
})
