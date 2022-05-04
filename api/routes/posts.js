const router = require('express').Router();

router.get('/b' , (req,res)=>{
    res.send('hello world')
})

module.exports = router;