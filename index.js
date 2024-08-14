
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./helpers/errorHelper');
const Mongoose = require('./models/index');
const app = express();
app.use(cors());
app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));


const getApp = async () => {
    await Mongoose.connect();

    app.get('/' , (req, res) =>{
        res.send()
    })


    app.use(function (req, res, next) {
        next(createError(404));
    });

    // error handler
    // eslint-disable-next-line no-unused-vars
    app.use(errorHandler);

    return app;
};
module.exports = getApp;
