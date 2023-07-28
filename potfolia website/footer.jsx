import React from 'react'
import './footer.css';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import { SiHashnode } from 'react-icons/si';


const Footer = () => {
  return (
    <footer>
        <a href="#" className='footer__logo'>RUTUJA</a>
        <ul className="permalinks">
          <li><a href="#">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#services">Achievements</a></li>
          <li><a href="#portfolio">Projects</a></li>
          <li><a href="#testimonials">Education</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="footer__socials">
          <a href="http://www.linkedin.com/in/rutuja-tapkir"><FaLinkedin/></a>
          <a href="https://twitter.com/Sit18T?s=09"><FaTwitter /></a>
          <a href="https://github.com/Rututapkir/Rututapkir-"><FaGithub /></a>
          <a href="https://hashnode.com/@Rutujatapkir"><SiHashnode /></a>
        </div> 

        <div className="footer__copyright">
          <small> Created by <strong>Rutuja Tapkir </strong>| &copy; 2023 All rights reserved</small>
        </div>
    </footer>
  )
}

export default Footer