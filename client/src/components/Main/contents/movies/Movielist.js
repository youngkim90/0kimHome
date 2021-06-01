import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import MovieInfo from './MovieInfo';
import MovieSearch from "./MovieSearch";

function Movielist(props) {

    let list = "";
    let movieData;
    const [movie, setMovie] = useState([]);
    useEffect(() =>{

        const res = Axios.get('http://localhost:5000/api/projects/movielist/*')
            .then(response => {

                if(response.data){
                    const data = Object.assign(response.data);
                    let movieArr = [];
                    for(const movieInfo of data){
                        const movieData = {};
                        movieData.id = movieInfo.id;
                        movieData.title = movieInfo.title;
                        if(movieInfo.thumbnail){
                            movieData.thumbnail = movieInfo.thumbnail;
                        }
                        if(movieInfo.totalScore && movieInfo.reviewer){
                            const aver = (Number(movieInfo.totalScore)/Number(movieInfo.reviewer)).toFixed(1);
                            movieData.average = aver;
                        }
                        movieArr.push(movieData);
                    }
                    setMovie(movieArr);
                }
            }). catch(err => {
                throw err;
            })
    },[]);

    const searchMovie = (value) =>{
        const res = Axios.get('http://localhost:5000/api/projects/movielist/'+value)
            .then(response => {
                if(response.data) {
                    const data = Object.assign(response.data);
                    const movieArr = [];
                    for(const movieInfo of data) {
                        if (movieInfo.totalScore && movieInfo.reviewer) {
                            const aver = (Number(movieInfo.totalScore) / Number(movieInfo.reviewer)).toFixed(1);
                            movieInfo.average = aver;
                        }
                        movieArr.push(movieInfo);
                    }
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