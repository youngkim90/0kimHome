import React from 'react';

function MovieSearch(props) {

    const iconClick = ()=> {
        const search = document.querySelector('.movie_Search');
        search.classList.toggle('active');
    }

    const searchEnter = (event) => {
        if(event.which === 13){
            props.search(event.target.value);
        }
    }

    return (
            <div className="search_Container">
                <div className="movie_Search">
                    <div className="search_Icon" onClick={iconClick}></div>
                    <div className="search_Input">
                        <input type="text" id="enterText" placeholder="search" onKeyPress={searchEnter}/>
                    </div>
                    <span className="clear" onClick={() => {document.getElementById('enterText').value = ''}}></span>
                </div>
            </div>
        );
    }

export default MovieSearch;