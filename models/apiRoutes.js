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
  let mantra_id = req.params.mantra_id
  let object = {};
  orm.getAdviceByID(mantra_id, (data) => {
    let item = data.rows[0]||"no data"
    object = item
  });
  orm.getMantraByID(mantra_id, (data) => {
    const item = data.rows && data.rows[0] && data.rows[0].mantra ? data.rows[0].mantra : "no data"
    object.mantra = item
    res.json(object)
  })
})

// route to add selected emotion to db

router.get('/add/:user/:emotion_id', (req, res) => {
  const emotion_id = req.params.emotion_id;
  const user = req.params.user;
  orm.logEmotion(user, emotion_id, (data) => {
    res.json("successful Add")
  })
})
// route to grab user emotions logged over last 30 days
//sums all of the general emotions chosen and hands it back as an object ot front end
router.get('/info/:user', (req, res) => {
  const user = req.params.user
  orm.getUserEmotion(user, (data) => {
    let angry = data.rows.filter((item) => {
      return item.emotions_id < 25
    })
    let disgusted = data.rows.filter((item) => {
      return (item.emotions_id > 24 && item.emotions_id < 37)
    })
    let sad = data.rows.filter((item) => {
      return (item.emotions_id > 36 && item.emotions_id < 55)
    })
    let happy = data.rows.filter((item) => {
      return (item.emotions_id > 54 && item.emotions_id < 79)
    })
    let surprised = data.rows.filter((item) => {
      return (item.emotions_id > 78 && item.emotions_id < 91)
    })
    let fearful = data.rows.filter((item) => {
      return (item.emotions_id > 90 && item.emotions_id < 109)

    })
    res.json({
      angry: angry.length,
      disgusted: disgusted.length,
      sad: sad.length,
      happy: happy.length,
      surprised: surprised.length,
      fearful: fearful.length
    })
  })
})





module.exports = router;