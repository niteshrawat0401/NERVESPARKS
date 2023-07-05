const express = require('express')
require("dotenv").config()
const connection = require("./db/db")

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.get('/', (req,res) => res.send('hello'))

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  await connection;
  console.log(`Server started on http://localhost:${PORT}`);
});
// nerves123