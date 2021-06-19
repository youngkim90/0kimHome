import React, {useEffect}  from 'react';
import SkillDetail from './contents/SkillDetail';
import { IMAGE_BASE_URL } from '../../config';
import { withRouter } from 'react-router-dom';

function MainDetail(props) {
    useEffect(() =>{
        /* ===== SCROLL ANIMATION ===== */
        const sr = ScrollReveal({
            origin: 'top',
            distance: '80px',
            duration: 2000,
            reset: true
        });

        /*SCROLL HOME*/
        sr.reveal('.home_title',{});
        sr.reveal('.button',{delay: 200});
        sr.reveal('.home_img',{delay: 400});
        sr.reveal('.home_social-icon',{ interval: 200});
        /*SCROLL ABOUT*/
        sr.reveal('.about_img',{});
        sr.reveal('.about_subtitle',{delay: 400});
        sr.reveal('.about_text',{delay: 400});
        /*SCROLL SKILLS*/
        sr.reveal('.skills_subtitle',{});
        sr.reveal('.skills_text',{});
        sr.reveal('.skills_data',{interval: 200});
        sr.reveal('.skills_img',{delay: 600});
        /*SCROLL WORK*/
        sr.reveal('.work_img',{interval: 200});
        /*SCROLL CONTACT*/
        sr.reveal('.contact_input',{interval: 200});
    },[])

    return (
        //홈페이지의 첫 메인화면
        <>
            {/* Welcome */}
            <section className="home all-grid" id="home">
                <div className="home_data">
                    <h1 className="home_title">Junior Developer<br/><span className="home_title-color">김영완</span>입니다.<br/>환영합니다.</h1>
                </div>

                <div className="home_social">
                    <a href="" className="home_social-icon"><i className="fab fa-github" onClick={()=> window.open("about:blank").location.href="https://github.com/youngkim90"}></i></a>
                    <a href="" className="home_social-icon"><i className="fab fa-blogger-b" onClick={()=> window.open("about:blank").location.href="https://0kim.tistory.com"}></i></a>
                </div>

                <div className="home_img">
                    <img src={IMAGE_BASE_URL+"main/myFace.png"} alt="" />
                </div>
            </section>

            {/* About Me */}
            <section className="about section " id="about">
                <h2 className="section-title">About Me</h2>

                <div className="about_container all-grid">
                    <div className="about_img">
                        <i className="far fa-id-card"></i>
                    </div>
                    <div>
                        <h2 className="about_subtitle">2년차 개발자 김영완입니다.</h2>
                        <p className="about_text">Frontend와 Backend에서 웹을 개발하고 2년차 주니어 개발자입니다.
                                주로 사용한 프로그래밍 언어는 Java와 Javascript 입니다. <br/>여러 개의 프로젝트를 경험하면서 데이터 시각화가 가져다주는
                                유용함을 알게되었고, 더 정확하고 편리하게 데이터를 다룰 수 있는 데이터 전문가가 되어야겠다는 목표를 갖게 되었습니다.</p>
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section className="skills section" id="skills">
                <h2 className="section-title">Skills</h2>
                <div className="skills_container all-grid">
                    <div>
                        <h2 className="skills_subtitle">기술스택</h2>
                        <p className="skills_text">2년이라는 짧은 시간동안 프로젝트 및 개인공부를 통해서 몇 가지의 기술스택 실력을 쌓을 수 있었습니다.</p>

                        <SkillDetail name="fab fa-html5" title="HTML5" skill="skills_html" per="65%"/>
                        <SkillDetail name="fab fa-css3" title="CSS3" skill="skills_css" per="60%"/>
                        <SkillDetail name="fab fa-java" title="JAVA" skill="skills_jv" per="75%"/>
                        <SkillDetail name="fas fa-seedling" title="SPRING(springboot)" skill="skills_sp" per="60%"/>
                        <SkillDetail name="fab fa-js-square" title="JAVASCRIPT" skill="skills_js" per="70%"/>
                        <SkillDetail name="fab fa-react" title="REACT" skill="skills_ra" per="50%"/>
                        <SkillDetail name="fab fa-node-js" title="NodeJS" skill="skills_nd" per="50%"/>
                        <SkillDetail name="fas fa-database" title="Mysql/Oracle" skill="skills_db" per="40%"/>
                    </div>

                    <div>
                        <i className="fas fa-laptop-code skills_img"></i>
                    </div>
                </div>
            </section>

            {/* Project */}
            <section className="work section" id="projects">
                <h2 className="section-title">Projects</h2>

                <div className="work_container all-grid">
                    <div className="work_img">
                        <p onClick={()=>{props.history.push('/projects/dashboard')}}><h1>Dashboard</h1></p>
                    </div>
                    <div className="work_img">
                        <p onClick={()=>{props.history.push('/projects/movies')}}><h1>Movies</h1></p>
                    </div>
                    <div className="work_img" onClick={()=>{alert('작업 중입니다.')}}>
                        <p><h1>Calender</h1></p>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="contact section" id="contact">
                <h2 className="section-title">Contact</h2>

                <div className="contact_container all-grid">
                    <h2>Email : youngkim9012@gmail.com</h2>
                    <h2>Blog : <a href="https://0kim.tistory.com/" style={{color:'#1e6695'}}>0kim.tistory.com/</a></h2>
                    <h2>Github : <a href="https://github.com/youngkim90" style={{color:'#1e6695'}}>github.com/youngkim90</a></h2><br/><br/>
                    <form action="" className="contact_form">
                        <input type="text" placeholder="Name" className="contact_input"/>
                        <input type="mail" placeholder="Email" className="contact_input"/>
                        <textarea name="" id="" cols="0" rows="10" className="contact_input"></textarea>
                        <input type="button" value="Contact" className="contact_button button"/>
                    </form>
                </div>
            </section>
        </>
    );
}

export default withRouter(MainDetail);