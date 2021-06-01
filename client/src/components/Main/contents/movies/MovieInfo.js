import React ,{useState, useEffect}from 'react';
import { withRouter } from 'react-router-dom';

function MovieInfo(props) {
    const [reviewScore, setReviewSocre] = useState(0);
    const movie = 'movie_'+props.id

    useEffect(()=>{
        if(props.average){
            const score = (props.average*2).toFixed(0);
            const chkReview = document.querySelectorAll("i[name=review_" + props.title + "]");
            for (let i = chkReview.length - 1; i >= (chkReview.length - score); i--) {
                chkReview[i].classList.add('review_active');
            }
            setReviewSocre(props.average);
        }
    },[])


    return (
        <div className={"MovieInfo"} id={movie}>
            <div className={"movie_Thumb"}>
                {props.thumb && <img className={"movie_img"} src={"../src/components/images/movies/thumbnail/"+props.thumb} onClick={()=>{props.history.push('/projects/movieDetail/'+props.title)}} />}
            </div>
            <div className="movie_Content">
                <div className={"movie_Title"}>
                    <h1 onClick={()=>{props.history.push('/projects/movieDetail/'+props.title)}}>{props.title}</h1>
                </div>
                <div className="movie_Aver">
                    <div className="movie_Review">
                        <i className="fas fa-star" name={"review_"+props.title}></i>
                        <i className="fas fa-star" name={"review_"+props.title}></i>
                        <i className="fas fa-star" name={"review_"+props.title}></i>
                        <i className="fas fa-star" name={"review_"+props.title}></i>
                        <i className="fas fa-star" name={"review_"+props.title}></i>
                        <i className="fas fa-star" name={"review_"+props.title}></i>
                        <i className="fas fa-star" name={"review_"+props.title}></i>
                        <i className="fas fa-star" name={"review_"+props.title}></i>
                        <i className="fas fa-star" name={"review_"+props.title}></i>
                        <i className="fas fa-star" name={"review_"+props.title}></i>
                    </div>
                    <p className="review_score"> {reviewScore} 점</p>
                </div>
            </div>
        </div>
    );
}

export default withRouter(MovieInfo);