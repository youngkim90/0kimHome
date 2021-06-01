import React from 'react';
import Dashboard from './contents/dashboard/dashboard'
import Movielist from './contents/movies/Movielist'
import MovieDetail from './contents/movies/MovieDetail'
import MainDetail from './MainDetail'
import Footer from '../Footer/Footer'
import { withRouter } from 'react-router-dom';

function Main(props) {
    const url = props.match.url;

    //Route에 대한 props 정보를 불러온다.
    if(url !== "/"){
        //Project 명이 포함되어 있으면 프로젝트 화면을 보여준다.
        switch(props.match.params.content){
            case "dashboard":
                return (
                    <>
                    <main>
                        <section className="mainSection">
                                <Dashboard />
                        </section>
                    </main>
                    <Footer />
                    </>
                );
                break;
            case "movies":
                return (
                    <>
                        <main>
                            <section className="mainSection">
                                <Movielist />
                            </section>
                        </main>
                        <Footer />
                    </>
                );
                break;
            case "movieDetail":
                return (
                    <>
                        <main>
                            <section className="mainSection">
                                <MovieDetail />
                            </section>
                        </main>
                        <Footer />
                    </>
                );
                break;
        }
    } else {
        //Project관련 Route 정보가 없으면 기본 메인화면을 보여준다.
        return (
            <>
                <main className="Main">
                    <MainDetail />
                </main>
                <Footer />
            </>
        );
    }
}

export default withRouter(Main);