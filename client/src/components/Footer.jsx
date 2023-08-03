import React from 'react';
import './Footer.css';
import logo from '../assets/powerlogo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="footer-services">
          <h3>Navigation</h3>
          <ul >
           <Link to='about'> <li style={{color:'white'}}>About Us</li></Link>
            <Link to='faqs'><li style={{color:'white'}}>FAQs</li></Link>
            <Link to='feedback'><li style={{color:'white'}}>Feedback/Reviews</li></Link>
            {/* Add more services as needed */}
          </ul>
        </div>
        <div>
        <a href=""><i className='bx bxl-instagram box'></i></a>
        <a href=""><i className='bx bxl-facebook-square box' ></i></a>
        <a href=""><i className='bx bxl-twitter box' ></i></a>
        </div>
      </div>
      <hr />
      <div style={{display:'flex',justifyContent:'center'}}>
        <p>Copyright © Powercycle 2023</p>
      </div>
    </footer>
  );
};

export default Footer;
