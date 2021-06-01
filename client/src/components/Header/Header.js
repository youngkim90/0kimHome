import React, {useEffect, useState} from 'react';

function Header(props) {

    useEffect(()=>{
        //토글 버튼을 활용하여 네비게이션 메뉴를 활성화or비활성화 한다.
        const showMenu = (toggleId, navId) =>{
            const toggle = document.getElementById(toggleId),
                nav = document.getElementById(navId)

            if(toggle && nav){
                toggle.addEventListener('click', ()=>{
                    nav.classList.toggle('show')
                })
            }
        }
        showMenu('nav-toggle','nav-menu')

        const navLink = document.querySelectorAll('.nav_link');
        //각 네비게이션 메뉴에 클릭 이벤트를 추가한다.
        function linkAction(){
            /*Active link*/
            navLink.forEach(n => n.classList.remove('active'));
            this.classList.add('active');

            /*Remove menu mobile*/
            const navMenu = document.getElementById('nav-menu')
            navMenu.classList.remove('show')
        }
        navLink.forEach(n => n.addEventListener('click', linkAction));

        const mode = document.querySelector("#nav-mode");
        mode.addEventListener("click", (event) => {
            if(event.target.className === "fas fa-sun"){
                document.body.className = "dark"
                event.target.className = "fas fa-star";
            } else {
                document.body.className = ""
                event.target.className = "fas fa-sun";
            }
        });
    },[]);

    return (
        <header className="header">
            {/* Navigation */}
            <nav className="nav all-grid">
                <div>
                    <i className="fas fa-child"></i><a href="/" className="nav_logo">0Kim</a>
                </div>

                {/* Navigiation 리스트 메뉴 */}
                <div className="nav_menu" id="nav-menu">
                    <ul className="nav_list">
                        <li className="nav_item"><a href="/" className="nav_link active">Home</a></li>
                        <li className="nav_item"><a href="/#about" className="nav_link">About Me</a></li>
                        <li className="nav_item"><a href="/#skills" className="nav_link">Skills</a></li>
                        <li className="nav_item"><a href="/#projects" className="nav_link">Projects</a></li>
                        <li className="nav_item"><a href="/#contact" className="nav_link">Contact</a></li>
                    </ul>
                </div>

                {/* 모바일 화면에서의 메뉴 토글 버튼 */}
                <div>
                    <i className="fas fa-sun" id="nav-mode"></i>
                </div>
                <div className="nav_toggle" id="nav-toggle">
                    <i className='fas fa-bars'></i>
                </div>
            </nav>
        </header>
    );
}

export default Header;