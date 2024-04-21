import './Navbar.css';
import Menu from '../../Assets/menubutton.svg'
import Logo from '../../Assets/menulogo.svg'


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

const Navbar = () => (
    <div className="navbar_component">
   <div class="navbar_section1">
   <img id="menu_icon" src={Menu} onClick={hideMenu()}></img>
   <img class="menu_element" src={Menu}></img>
   <img class="menu_element" src={Menu}></img>
   </div>
   <img id="menu_logo" src={Logo}></img>
    </div>
);

export default Navbar;