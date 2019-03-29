// Routes 
const express = require('express');
const cors = require('cors');
const router = express.Router();
const TestController = require('../controllers/api/TestController');
require('express-group-routes');

//options for cors midddleware
const options = {
    origin: '*',
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    preflightContinue: false
};

//use cors middleware
router.use(cors(options));

router.group("/api/v1", function(router) {
    router.get('/welcome', TestController.welcome);
});

module.exports = router;