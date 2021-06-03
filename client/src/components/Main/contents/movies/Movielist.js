import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import MovieInfo from './MovieInfo';
import MovieSearch from "./MovieSearch";
import {USER_SERVER} from "../../../../config"

//영화 전체 리스트 호출
function Movielist(props) {
    const [movie, setMovie] = useState([]);
    useEffect(() =>{

        const res = Axios.get(USER_SERVER+'api/projects/movielist/*')
            .then(response => {

                if(response.data){
                    const data = Object.assign(response.data);
                    let movieArr = [];
                    //필요한 영화정보 필터링
                    for(const movieInfo of data){
                        const movieData = {};
                        movieData.id = movieInfo.id;
                        movieData.title = movieInfo.title;
                        if(movieInfo.thumbnail){
                            movieData.thumbnail = movieInfo.thumbnail;
                        }
                        //영화 평점 계산
                        if(movieInfo.totalScore && movieInfo.reviewer){
                            const aver = (Number(movieInfo.totalScore)/Number(movieInfo.reviewer)).toFixed(1);
                            movieData.average = aver;
                        }
                        movieArr.push(movieData);
                    }
                    //필터링 된 영화정보를 State에 저장하고 Rendering
                    setMovie(movieArr);
                }
            }). catch(err => {
                throw err;
            })
    },[]);

    //검색한 영화 리스트 호출
    const searchMovie = (value) =>{
        //검색한 단어(value)를 parameter로 요청
        const res = Axios.get(USER_SERVER+'api/projects/movielist/'+value)
            .then(response => {
                //서버로 부터 응답
                if(response.data) {
                    const data = Object.assign(response.data);
                    const movieArr = [];
                    //영화 리스트의 평점 계산
                    for(const movieInfo of data) {
                        if (movieInfo.totalScore && movieInfo.reviewer) {
                            const aver = (Number(movieInfo.totalScore) / Number(movieInfo.reviewer)).toFixed(1);
                            movieInfo.average = aver;
                        }
                        movieArr.push(movieInfo);
                    }
                    //State에 저장하여 Rendering
                    setMovie(movieArr);
                }
            }).catch(err => {
                throw err;
            })
    }

    return (
        <div className="Movielist">
            <MovieSearch search={searchMovie}/>
            {movie.map((movieInfo) => (
                <MovieInfo id={movieInfo.id} thumb={movieInfo.thumbnail} title={movieInfo.title} average={movieInfo.average}/>
            ))}
        </div>
    );
}

export default Movielist;