const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('errorhandler');
const passport = require('passport');
const socket = require('socket.io');
const IOService = require('./services/IOService').IOService;
const config = require('./config/app');

const port = config.port || 8000;
const host = config.host || 'localhost';
const isProd = process.env.NODE_ENV === 'production';

const ROUTES = require('./routes');
const app = express();
const server = http.createServer(app);

const io = new IOService(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use(passport.initialize());

require('./config/passport');

mongoose.connect(config.database, {
    useNewUrlParser: true
});
mongoose.set('debug', true);

app.use(ROUTES);

// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// // development error handler
// // will print stacktrace
// if (!isProduction) {
//     app.use(function (err, req, res, next) {
//         console.log(err.stack);

//         res.status(err.status || 500);

//         res.json({
//             'errors': {
//                 message: err.message,
//                 error: err
//             }
//         });
//     });
// }

server.listen(port, host, async err => {
    if (err) {
        return console.error(err.message);
    }

    console.log('appStarted', port, host);
});