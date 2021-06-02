import React, {useState, useEffect} from 'react';
import Axios from "axios";

function CommentView(props) {

    const [Review, setReview] = useState({});

    useEffect(() => {
        if (props.movieId) {
            const res = Axios.get('http://3.36.163.193:5000/api/projects/reviewlist/' + props.movieId)
                .then(response => {
                    if (response.data) {
                        const data = Object.assign(response.data);
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