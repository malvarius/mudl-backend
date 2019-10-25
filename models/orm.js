const connection = require('./connection.js')

const orm = {
    // findAllMantras only takes in one input, a callback that allows you to do whatever you want with the data
    // it selects the entire mantra table
    findAllMantras: (cb) => {
        connection.query('select * from mantras', function (err, response) {
            if (err) throw err;
            cb(response);
        })
    },
    // this function allows you to find mantra by primary OR secondary emotion, it takes in an emotion as a string as the 1st argument 
    // and a call back with an argument so that you can do whatever you want with the returned data
    findMantraByEmotion: (emotion, cb) => {
        connection.query('select * from mantras where primary_emotion = $1 or secondary_emotion = $2', [emotion, emotion], function (err, response) {
            if (err) throw err;
            cb(response)
        });
    },
    getAllPrimaryEmotions: (cb) => {
        connection.query('select distinct primary_emotion from emotions', function (err, response) {
            if (err) throw err;
            cb(response);
        })
    },
    getSecondaryEmotions: (primary, cb) => {
        connection.query('select distinct secondary_emotion, secondary_emotion_def from emotions where primary_emotion = $1', [primary], function (err, response) {
            if (err) throw err;
            cb(response);
        })
    },
    getTertiaryEmotions: (primary, secondary, cb) => {
        connection.query('select distinct * from emotions where primary_emotion = $1 and secondary_emotion=$2', [primary, secondary], function (err, response) {
            if (err) throw err;
            cb(response);
        })
    },
    getAdviceByID: (emotions_id, cb) => {
        connection.query('select * from advice a left join emotions e on a.emotions_id = e.id where e.id=$1;', [emotions_id], function (err, response) {
            if (err) throw err;
            cb(response);
        })
    },
    getMantraByID: (emotions_id, cb) => {
        let upper;
        let lower;
        if (emotions_id < 25 && emotions_id >= 1) {
            upper = 25
            lower = 1
        } else if (emotions_id < 37 && emotions_id >= 25) {
            upper = 37
            lower = 25
        } else if (emotions_id < 55 && emotions_id >= 37) {
            upper = 55
            lower = 37
        } else if (emotions_id < 79 && emotions_id >= 55) {
            upper = 55
            lower = 37
        } else if (emotions_id < 91 && emotions_id >= 79) {
            upper = 91
            lower = 79
        } else if (emotions_id < 109 && emotions_id >= 91) {
            upper = 109
            lower = 91
        }
        connection.query('select mantra from mantras where emotions_id >=$1 and emotions_id <$2 order by random() LIMIT 1;', [lower, upper], function (err, response) {
            if (err) throw err;
            cb(response);
        })
    },
    logEmotion: (user, emotions_id, cb) => {
        connection.query('insert into user_emotions (users_id, emotions_id) values($1,$2)', [user, emotions_id], function (err, response) {
            if (err) throw err;
            cb(response);
        })
    },
    getUserEmotion: (user, cb) => {
        connection.query("select * from user_emotions where (log_date > current_date - interval '30' day) and users_id = $1", [user], function (err, response) {
            if (err) throw err;
            cb(response);
        })
    }

}

module.exports = orm;