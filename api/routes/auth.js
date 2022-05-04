const router = require('express').Router();

router.get('/a' , (req,res)=>{
    res.send('hello world')
})

module.exports = router;