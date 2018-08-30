const express = require('express');
const router = new express.Router();

router.use(() => {
    console.log('produto route');
});

router.get('', (req,res) => {
    res.send('produtos home page');
});

router.get('/a', (req,res) => {
    res.send('produtos a');
});

module.exports = router;