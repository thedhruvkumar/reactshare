const router = require('express').Router();

router.get('/c' , (req,res)=>{
    res.send('hello world')
})

module.exports = router;