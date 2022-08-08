const asyncWrapper = require('./../error/wrapper');
const User = require('./../models/user');
const CustomAPIError = require('./../error/CustomAPIError');

const getAllUsers = asyncWrapper(async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json(users);
});

const getAUser = asyncWrapper(async(req, res, next)=> {
    const userID = req.params.id;
    const user = await User.findOne({_id: userID});
    if(!user){
        throw new CustomAPIError('Sorry, the user cannot be found', 404);
    }
    res.status(200).json(user);
});

const createUser = asyncWrapper(async (req, res, next) => {
    const {name, email, password} = req.body;

    if(!(name && email && password)){
        throw CustomAPIError('Please provide name, email and password (This is compulsory)', 400);
    }
    const user = await User.create({name, email, password});

    res.send(201).json({user, count: user.length});
});

const updateUser = asyncWrapper(async(req, res, next) => {
    const {
        params: {id: userID},
        body: {name, email, password}
    } = req;

    if(name === '' || email === '' || password === ''){
        throw new CustomAPIError('Please provide valid name, email and password', 400);
    }

    const user = await User.findOneAndUpdate(
        { _id: userID },
        {...req.body},
        {new: true, runValidators: true});

    if(!user){
        throw new CustomAPIError('Sorry, No user found.', 404);
    }

    res.status(200).json(user);

});

const deleteUser = asyncWrapper(async(req, res, next) => {
    const userID = req.params.id;
    const user = await User.findOneAndRemove({_id: userID});
    res.status(200).json({success: true, msg: 'User deleted'});
});


module.exports = {
    getAllUsers, getAUser, createUser, updateUser, deleteUser
}