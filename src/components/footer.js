//components/footer.js
import React from 'react';

import './footer.css'; // Si tu as un fichier CSS pour la navbar
import facebook from '../assets/iconfacebook.png';
import instagram from'../assets/iconinstagram.png';
import logo from '../assets/logoIdiriCoaching.png';


const Footer  = () => {
    return (
        <div className="home-container">
 <footer className="social-media">
          <div className="social-linksnadia"><span>Nadia</span>
           <div> <a href="https://www.facebook.com/idiri.nadia/"><img src={facebook} alt="Facebook" /></a>
            <a href="https://www.instagram.com/idirinadia"><img src={instagram} alt="Instagram" /></a></div>
          </div>
          <div className='logo'> <img src={logo} alt="logo" /></div>
          <div className="social-linkssabrina"><span>Sabrina</span>
           <div> <a href="https://www.facebook.com/sabrina.idiri"><img src={facebook} alt="Facebook" /></a>
            <a href="https://www.instagram.com/sabrinaidiri/"><img src={instagram} alt="Instagram" /></a></div>
          </div>
        </footer>
        
         </div>
         );
        }

        export default Footer;
