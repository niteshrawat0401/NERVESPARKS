const express = require('express')
require("dotenv").config()
const connection = require("./db/db")
const userRouter = require('./routes/userRouter')
const dealerRouter = require('./routes/dealershipRouter')
const adminRouter = require('./routes/adminRouter')
const carsRouter = require('./routes/carsRouter')
const soldVehicleRouter = require('./routes/soldVehiclesRouter')
const dealRouter = require('./routes/dealRouter')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/user', userRouter)
app.use('/dealer', dealerRouter)
app.use('/admin', adminRouter)
app.use('/car', carsRouter)
app.use('/sold', soldVehicleRouter)
app.use('/deal', dealRouter)
app.get('/', (req,res) => res.send('hello'))

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  await connection;
  console.log(`Server started on http://localhost:${PORT}`);
});
// nerves123