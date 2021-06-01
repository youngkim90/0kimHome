import React, {useEffect, useState} from 'react';
import Axios from "axios";
import { withRouter } from 'react-router-dom';
import CommentView from './CommentView'

function MovieComment(props) {
    const [score, setScore] = useState(0);

    useEffect(() => {
        if(props.movieId) {
            const review = document.querySelectorAll("input[name='review_check']");
            for (const value of review) {
                value.addEventListener("change", (event) => {
                    const target = event.target;
                    let next = target.nextSibling;
                    let prev = target.previousSibling;
                    let i = 1;
                    if (target.checked && next) {
                        while (next) {
                            next.checked = true;
                            i++;
                            if (next.nextSibling) {
                                next = next.nextSibling;
                            } else {
                                break;
                            }
                        }
                    } else if (!target.checked && prev) {
                        i = 9;
                        while (prev) {
                            prev.checked = false;
                            i--;
                            if (prev.previousSibling) {
                                prev = prev.previousSibling;
                            } else {
                                break;
                            }
                        }
                    }
                    setScore((i/2).toFixed(1));
                })
            }
        }
    }, []);

    const updateReview = (event) => {
        event.preventDefault();
        const content = document.querySelector(".text_comment");
        if(!content.value){
            alert('리뷰 내용을 남겨주세요.');
            return;
        }
        if (confirm("감사합니다. 리뷰 점수 잊지 않으셨죠? 소중한 리뷰가 전달됩니다.")) {
            const res = Axios({
                    url:'http://localhost:5000/api/projects/moviereview',
                    method: 'post',
                    data: {
                        id: props.movieId,
                        score: score,
                        content: content.value
                    }
                }).then(response => {
                    if(response.data) {
                        window.location.reload();
                    }
                })
        } else {
            return;
        }
    }

    return (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <div className="movie_Comment">
            <div className="profile_Comment">
                <p>😄 guest</p>
            </div>
            <div className="review_container">
                <div style={{display:'flex', alignItems:'center'}}>
                    <div className="detail_Review">
                        <input type="checkbox" name="review_check" className="fas fa-star"></input>
                        <input type="checkbox" name="review_check" className="fas fa-star"></input>
                        <input type="checkbox" name="review_check" className="fas fa-star"></input>
                        <input type="checkbox" name="review_check" className="fas fa-star"></input>
                        <input type="checkbox" name="review_check" className="fas fa-star"></input>
                        <input type="checkbox" name="review_check" className="fas fa-star"></input>
                        <input type="checkbox" name="review_check" className="fas fa-star"></input>
                        <input type="checkbox" name="review_check" className="fas fa-star"></input>
                        <input type="checkbox" name="review_check" className="fas fa-star"></input>
                        <input type="checkbox" name="review_check" className="fas fa-star"></input>
                    </div>
                    <p className="review_score"> {score} 점</p>
                </div>
                <div className="comment_Container">
                    <div className="comment_Area">
                        <textarea className="text_comment" placeholder="별점과 댓글을 입력해주세요"/>
                    </div>
                    <div className="comment_Submit">
                        <button onClick={updateReview}> 제 출 </button>
                    </div>
                </div>
            </div>
        </div>
            <CommentView movieId={props.movieId}/>
        </div>
    );
}

export default withRouter(MovieComment);