const express = require('express');
const bodyParser = require('body-parser');
const db =  require('../../db/db');
const app = express();
const router = express.Router();
const cors = require('cors');
app.use(router);
app.use(cors());

router.get('/api/projects/movielist/:title', (req, res)=>{
    if(req.params.title === '*') {
        const query = db.query('select * from movie', function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    } else {
        const query = db.query('select * from movie where title=?', [req.params.title], (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    }
})

router.get('/api/projects/reviewlist/:id', (req, res)=>{
    if(req.params.id === '*') {
        const query = db.query('select * from movieComment', function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    } else {
        const query = db.query('select * from movieComment where movieId=?', [req.params.id], (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    }
})

router.post('/api/projects/moviereview', (req,res)=>{
    if(req.body){
        console.log(req.body);
        const movieid = req.body.id;
        const reviewContent = req.body.content;
        const score = req.body.score;

        const query = db.query('select * from movie where id=?',[movieid], (err, result) => {
            if(err) throw err;
            const totalScore = result[0].totalScore + Number(score);
            const reviewer = result[0].reviewer+1;
            const title = result[0].title;

            const query = db.query('insert into movieComment (movieId, score, reviewContent, create_date) values (?,?,?,NOW())',[movieid, score, reviewContent],(err,result) => {
                if(err) throw err;
                console.log('test');

                const query = db.query('update movie set totalScore=?, reviewer=?, update_date=NOW() where id=?',[totalScore, reviewer, movieid], (err, result) => {
                    if (err) throw err;
                    console.log('test2');
                    res.json({title:title});
                });

            });

        });

    }
})

module.exports = router;