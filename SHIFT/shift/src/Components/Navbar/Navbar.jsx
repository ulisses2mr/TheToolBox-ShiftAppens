import './Navbar.css';
import Menu from '../../Assets/menubutton.svg'
import Add from '../../Assets/menuadd.svg'
import Home from '../../Assets/menuhome.svg'
import Profile from '../../Assets/menuprofile.svg'
import Logo from '../../Assets/menulogo.svg'
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function hideMenu() {
    // Get all elements with class "menu_element"
    var elements = document.querySelectorAll(".menu_element");

    // Loop through each element
    elements.forEach(function(element) {

        if (element.style.display === "none") {

            element.style.display = "block";
        } else {

            element.style.display = "none";
        }
    });
}

function toOffers(){
    window.location.href = '/offers';
}

function toLoan(){
    window.location.href = '/loan';
}

function toProfile(){
    window.location.href = '/profile';
}

const Navbar = () => (
    <div className="navbar_component">
   <div class="navbar_section1">
   <img id="menu_icon" src={Menu} onClick={hideMenu}></img>
   <img class="menu_element" src={Home} onClick={toOffers}></img>
   <img class="menu_element" src={Profile} onClick={toProfile}></img>
   <img class="menu_element" src={Add} onClick={toLoan}></img>
   </div>
   <img id="menu_logo" src={Logo} onClick={toOffers}></img>
    </div>
);

export default Navbar;