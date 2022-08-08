// Running this program will populate your database with 7 users
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./../models/user');
const connectDB = require('./../db/connect');

//-------------------
const userList = [
    {
        name: "Rohan",
        email: "rohan@gmail.com",
        password: "secret"
    },
    {
        name: "Mohan",
        email: "mohan@gmail.com",
        password: "secret"
    },
    {
        name: "Sherya",
        email: "shreya@gmail.com",
        password: "secret"
    },
    {
        name: "Alia",
        email: "alia@gmail.com",
        password: "secret"
    },
    {
        name: "Deepak",
        email: "deepak@gmail.com",
        password: "secret"
    },
    {
        name: "Gopal",
        email: "gopal@gmail.com",
        password: "secret"
    },
    {
        name: "Conor Mcgregor",
        email: "conor@gmail.com",
        password: "proper12"
    },
]

//Lets start

const populate = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        await User.deleteMany();
        await User.create(userList);
        console.log('SUCCESS, Created 7 users');
        process.exit(0);

    }catch(error){
        console.log('Sorry some problem occured: ', error.message);
        process.exit(1)
    }
}

populate();
