import React from 'react';

function Footer(props) {
    return (
        <footer className="footer">
            <p className="footer_title">0Kim</p>
                <a href="" className="footer_icon"><i className="fab fa-github" onClick={()=> window.open("about:blank").location.href="https://github.com/youngkim90"}></i></a>
                <a href="" className="footer_icon"><i className="fab fa-blogger-b" onClick={()=> window.open("about:blank").location.href="https://0kim.tistory.com"}></i></a>
            <p>&#169; 2021 copyright all right reserved</p>
        </footer>
    );
}

export default Footer;