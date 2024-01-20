const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.send('User Home Page');
});

router.get('/details', function (req, res) {
    res.send('User Details Page');
});

module.exports = router;