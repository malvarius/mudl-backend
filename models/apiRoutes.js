require('dotenv').config()
var express = require('express')
var router = express.Router();
const connection = require('./connection.js')
const orm = require('./orm.js')

let PORT = 3000 || process.env.PORT;
// connection to db


// pass in primary and secondary emotions to get tertiary emotions and definitions
router.get('/mood/:primary?/:secondary?', function (req, res) {
  if (req.params.primary && req.params.secondary) {
    let primaryEmotion = req.params.primary;
    let secondaryEmotion = req.params.secondary;
    orm.getTertiaryEmotions(primaryEmotion, secondaryEmotion, (data) => {
      // console.log(data.rows)
      res.json(data.rows)
    })
  } else if (req.params.primary) {
    let primaryEmotion = req.params.primary;
    orm.getSecondaryEmotions(primaryEmotion, (data) => {
      // console.log(data.rows)
      res.json(data.rows)
    });
  } else {
    orm.getAllPrimaryEmotions((data) => {
      // console.log(data.rows)
      res.json(data.rows)
    });
  }
});

// pass in emotions_id to get mantras associated
router.get('/mantras/:mantra_id?', function (req, res) {
  let mantra_id = req.params.mantra_id||null;
  if(mantra_id){
    orm.getMantraFromID(mantra_id, (data) => {
      res.json(data.rows)
    });
  }else{
    orm.getMantraNoID((data)=>{
      res.json(data.rows)
    })
  }
  
})





module.exports = router;