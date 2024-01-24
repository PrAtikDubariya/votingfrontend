import React from "react";
import "./CSS/About.css";
// import { useNavigate } from "react-router-dom";
// import { FaChevronRight } from "react-icons/fa";
import aboutImg2 from "../images/about-img-1.webp";
import aboutImg1 from "../images/about-img-2.webp";
import Feature from "./Feature";

const About = () => {

    // const navigate = useNavigate();

    const scrollHandler = () => {

        let scroll = document.getElementById("scrollToAbout");
        scroll.scrollIntoView();
    }

    // const clickHandler = () => {
    //     navigate("/");
    // }
    
    return (
        <div>
            {/* <div className="title-container">
                <div className="header-about-us">
                    <h1>About Us</h1>
                </div>
                <div className="title-navigator">
                    <div onClick={clickHandler} className="title-home">Home</div>
                    <FaChevronRight/>
                    <div>About Us</div>
                </div>
            </div> */}
            <div className="about-body">
                <div className="about-images">
                    <div className="about-img-1" ><img src={aboutImg1} alt="about-img-1" height={250} ></img></div>
                    <div className="about-img-2" ><img src={aboutImg2} alt="about-img-2" height={250} ></img></div>
                </div>
                <div className="body-text">
                    <div className="body-about-company">About Company</div>
                    <div className="body-header">
                        <div>We Provide Transparent</div>
                        <div>& More Secure</div>
                        <div className="voting-portal-header">Voting Portal</div>
                    </div>
                    <div className="body-para">
                        <span>Always recognize that your blog's primary purpose is marketing and driving</span>
                        <span>new traffic to buy from you. While you do want to inform, and in some cases</span>
                        <span>entertain agency. Spark creativity and craft beautiful store experiences with</span>
                        <span>design tools that you want.</span>
                    </div>
                    <div onClick={scrollHandler} className="button-know-more">
                        know more
                    </div>
                </div>
            </div>
            <div>
                <div className="about-container" id="scrollToAbout" >
                    <div className="vertical-align-about-text">
                        About
                    </div>
                    <div className="about-container-desc">
                        <div>An online voting system that will replace the</div>
                        <div>old ballot sytem or paper system. Over the time</div>
                        <div>we have utilized the required technology in every</div>
                        <div>sector to improve efficiency and save the extra</div>
                        <div>resources. But the voting system is still very</div>
                        <div>expensive and requires a bigger workforce.</div>
                        <div>The system is slower and still not completely</div>
                        <div>tamper proof. We bring the system that is safe,</div>
                        <div>reliable and solve the modern issues like higher</div>
                        <div>reachability of the booth, crowd free voting,</div>
                        <div>inexpensive, faster results and others.</div>
                    </div>
                </div>
            </div>
            <Feature/>
        </div>
    )

}

export default About;