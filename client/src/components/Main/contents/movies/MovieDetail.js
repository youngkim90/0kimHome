import React, {useEffect, useState} from 'react';
import Axios from "axios";
import { IMAGE_BASE_URL } from '../../../../config'
import { USER_SERVER } from '../../../../config'
import MovieComment from "./MovieComment";
import { withRouter } from 'react-router-dom';

function MovieDetail(props) {
    //props.history
    const path = props.location.pathname;
    const title = path.substring(path.lastIndexOf("/")+1, path.length);

    //State 관리
    const [MovieDetail, setMovieDetail] = useState({});
    const [score, setScore] = useState(0);

    if(title){
        //영화 상세정보 State에 저장
        useEffect( ()=>{
            const res = Axios.get(USER_SERVER+'api/projects/movielist/'+title)
                .then(response => {
                    if (response) {
                        let data = Object.assign(response.data[0]);
                        setMovieDetail(data);
                    }
                }).catch(err => {
                    throw err;
                })
        },[])

        //영화 정보가 State에 저장된 후 평점 State 저장
        useEffect( ()=> {
            const score = ((MovieDetail.totalScore/MovieDetail.reviewer)*2).toFixed(0);
            const chkReview = document.querySelectorAll("i[name=review_" + MovieDetail.title + "]");
            //평점을 별 모양으로 표시
            for (let i = chkReview.length - 1; i >= (chkReview.length - score); i--) {
                chkReview[i].classList.add('review_active');
            }
            if(MovieDetail.totalScore > 0){
                //평점 상태 저장
                setScore((MovieDetail.totalScore/MovieDetail.reviewer).toFixed(1));
            }
        },[MovieDetail]);

    }
    return (
        <>
            <div className="MovieDetail">
                <div className="detail_Container">
                    <div className="detail_Poster">
                        { MovieDetail && <img className="movie_Poster" src={IMAGE_BASE_URL+"movies/thumbnail/"+MovieDetail.thumbnail} />}
                    </div>
                    <div className="movie_Detail">
                        <div className="detail_Title">
                            <h1>{MovieDetail.title}</h1>
                        </div>
                        <div className="movie_Aver">
                            <div className="movie_Review">
                                <i className="fas fa-star" name={"review_"+MovieDetail.title}></i>
                                <i className="fas fa-star" name={"review_"+MovieDetail.title}></i>
                                <i className="fas fa-star" name={"review_"+MovieDetail.title}></i>
                                <i className="fas fa-star" name={"review_"+MovieDetail.title}></i>
                                <i className="fas fa-star" name={"review_"+MovieDetail.title}></i>
                                <i className="fas fa-star" name={"review_"+MovieDetail.title}></i>
                                <i className="fas fa-star" name={"review_"+MovieDetail.title}></i>
                                <i className="fas fa-star" name={"review_"+MovieDetail.title}></i>
                                <i className="fas fa-star" name={"review_"+MovieDetail.title}></i>
                                <i className="fas fa-star" name={"review_"+MovieDetail.title}></i>
                            </div>
                            <p className="review_score"> {score} 점</p>
                        </div>
                        <div className="detail_Content">
                            <h1>줄거리</h1><hr/><br/>
                            <p>{MovieDetail.content}</p>
                        </div>
                    </div>
                </div>
                {MovieDetail.id && <MovieComment movieId={MovieDetail.id} ></MovieComment>}
            </div>
        </>
    );
}

export default withRouter(MovieDetail);