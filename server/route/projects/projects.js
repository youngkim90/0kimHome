const express = require('express');
const db =  require('../../db/db');
const app = express();
const router = express.Router();
const cors = require('cors');
app.use(router);
app.use(cors());

//title과 일치하는 Data 요청
router.get('/api/projects/movielist/:title', (req, res)=>{
    //모든 영화 Data 반환
    if(req.params.title === '*') {
        const query = db.query('select * from movie', function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    //특정 영화 Data 반환
    } else {
        const query = db.query('select * from movie where title like ?', ["%"+req.params.title+"%"], (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    }
})

//id와 일치하는 review data 요청
router.get('/api/projects/reviewlist/:id', (req, res)=>{
    //모든 영화의 review 반환
    if(req.params.id === '*') {
        const query = db.query('select * from movieComment', function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    //특정 영화의 review 반환
    } else {
        const query = db.query('select * from movieComment where movieId=?', [req.params.id], (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    }
})

//Review Data 생성 요청
router.post('/api/projects/moviereview', (req,res)=>{
    if(req.body){
        //요청 Parameters
        const movieid = req.body.id;
        const reviewContent = req.body.content;
        const score = req.body.score;

        //해당 영화 정보
        const query = db.query('select * from movie where id=?',[movieid], (err, result) => {
            if(err) throw err;
            //영화 평점 변경
            const totalScore = result[0].totalScore + Number(score);
            const reviewer = result[0].reviewer+1;
            const title = result[0].title;

            //Review Data Insert
            const query = db.query('insert into movieComment (movieId, score, reviewContent, create_date) values (?,?,?,NOW())',[movieid, score, reviewContent],(err,result) => {
                if(err) throw err;

                //변경된 평점 반영
                const query = db.query('update movie set totalScore=?, reviewer=?, update_date=NOW() where id=?',[totalScore, reviewer, movieid], (err, result) => {
                    if (err) throw err;
                    res.json({title:title});
                });

            });

        });

    }
})

module.exports = router;