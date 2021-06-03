import React, {useEffect, useState} from 'react';
import Axios from "axios";
import { withRouter } from 'react-router-dom';
import CommentView from './CommentView'
import { USER_SERVER } from '../../../../config';

//영화 상세화면의 댓글 생성 기능 호출
function MovieComment(props) {
    const [score, setScore] = useState(0);

    //평점 입력 시 화면에 노란 별로 표현
    useEffect(() => {
        if(props.movieId) {
            const review = document.querySelectorAll("input[name='review_check']");

            for (const value of review) {
                //별모양 체크박스에 모두 change 이벤트 부여
                value.addEventListener("change", (event) => {
                    const target = event.target;
                    let next = target.nextSibling;
                    let prev = target.previousSibling;
                    let i = 1;

                    //체크된 위치를 기준으로 앞의 별들 모두 체크
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
                    //체크 해제된 위치를 기준으로 뒤의 별들 모두 체크 해제
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
                    //평점 체크시 Rendering
                    setScore((i/2).toFixed(1));
                })
            }
        }
    }, []);

    //리뷰 제출 시 서버로 create 요청
    const updateReview = (event) => {
        event.preventDefault();
        const content = document.querySelector(".text_comment");

        // 리뷰 내용이 없을 때
        if(!content.value){
            alert('리뷰 내용을 남겨주세요.');
            return;
        }

        if (confirm("감사합니다. 리뷰 점수 잊지 않으셨죠? 소중한 리뷰가 전달됩니다.")) {
            //해당 영화 id, 평점, 리뷰내용을 data로 서버에 전송
            const res = Axios({
                    url:USER_SERVER+'api/projects/moviereview',
                    method: 'post',
                    data: {
                        id: props.movieId,
                        score: score,
                        content: content.value
                    }
                }).then(response => {
                    //db에 insert 후 페이지 새로고침
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
                        <button onClick={updateReview}>제출</button>
                    </div>
                </div>
            </div>
        </div>
            <CommentView movieId={props.movieId}/>
        </div>
    );
}

export default withRouter(MovieComment);