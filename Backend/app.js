const express = require('express')
const cors = require('cors')
// const express = require('express')
// const express = require('express')
const {db} = require('./db/db')
const {readdirSync} = require('fs') 
const mongoose = require("mongoose");

const app = express()
require('dotenv').config()

const PORT = process.env.PORT
const { MONGODBURI } = require("./keys");


//middleware
app.use(express.json())
app.use(cors())

require("./models/user");


//register routes
app.use(require("./routes/auth"));

app.use(require("./routes/user"));

//establishing Database connection
mongoose.connect(MONGODBURI, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
});

//routes
//reads the things in the route
//for GET method we use localhost/api/v1
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

// app.get('/', (req, res)=> {
//     res.send('Hello')
// })

mongoose.connection.on("connected", () => {
    console.log("connection successful");
  });
  mongoose.connection.on("error", (err) => {
    console.log("connection failed", err);
  });

  
const server = () => {
    db()
    app.listen(PORT, () => {
        console.log("listening to PORT : ", PORT)
    })
}

server()