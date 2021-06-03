import React, {useState, useEffect} from 'react';
import Axios from "axios";
import {USER_SERVER} from '../../../../config'

//해당 영화에 달린 댓글 호출
function CommentView(props) {

    const [Review, setReview] = useState({});

    //영화의 댓글 정보 요청
    useEffect(() => {
        if (props.movieId) {
            //props로 전달된 영화id를 url 파라미터로 전송
            const res = Axios.get(USER_SERVER+'api/projects/reviewlist/' + props.movieId)
                .then(response => {
                    //리뷰 정보 응답
                    if (response.data) {
                        const data = Object.assign(response.data);
                        //리뷰 정보를 State에 저장하여 Rendring
                        setReview(data);
                    }
                }).catch(err => {
                    throw err;
                })
        }
    }, [])


    return (
        <div className="comment_View">
            <div style={{alignSelf: 'flex-start'}}>
                <h3>댓글</h3>
            </div>
            {Object.keys(Review).length>0 && Review.map(((reviewInfo) => (
                <div className="commentContainer">
                    <div className="userInfo">
                        <p>guest{reviewInfo.id}</p>
                        <p>({reviewInfo.score}점)</p>
                    </div>
                    <div className="userComment">
                        <p>{reviewInfo.reviewContent}</p>
                    </div>
                    <div className="createDate">
                        <p>{reviewInfo.create_date.substring(0,reviewInfo.create_date.indexOf("T"))}</p>
                    </div>
                </div>
                )))}
        </div>
    );
}

export default CommentView;