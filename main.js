require('dotenv').config();
const express = require('express');
const app = express();

//Connection to the database
const connectDB = require('./db/connect');

//Error handler middleware
const notFound = require('./error/not-found');
const errorHandler = require('./error/errorHandler');

//Middleware to handle POST data
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Server static files
app.use(express.static("public"));

//Routes
app.use('/', require('./routes/viewRoute'));
app.use('/api/v1/users', require('./routes/userRoute'));

//Using some error handlers
app.use(notFound);
app.use(errorHandler);

//set up the connection to database and the server
const port = process.env.PORT || 3000;
const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`The server is up and running on PORT: ${port}`));
    }catch(error){
        console.log(error);
    }
}
start();