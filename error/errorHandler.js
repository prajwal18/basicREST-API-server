
const errorHandler = (err, req, res, next) => {
    //Setting some default properties in errors
    const customError = {
        message: err.message || 'Internal Server Error. Try again later',
        statusCode: err.statusCode || 500
    }

    //Handeling Validation Error
    if(err.name === 'ValidationError'){
        const errMessage = Object.values(err.errors).map(item => item.message).join(', ');
        customError.statusCode = 400;
        customError.message = errMessage;
    }

    //Cast type error
    if(err.name === 'CastError'){
        customError.statusCode = 404;
        customError.message = `No users were found with id: ${err.value}`
    }

    //Duplication error
    if(err.code && err.code === 11000){
        customError.statusCode = 400;
        customError.message = `Duplicate value entered for ${Object.keys(err.keyValues)} field, please provide another value.`
    }

    res.status(customError.statusCode).json({msg: err.message});
}

module.exports = errorHandler;