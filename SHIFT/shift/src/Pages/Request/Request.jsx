import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import "./Request.css";
import ImagemLupa from "../../Assets/lupa-04.svg";
import Butt from '../../Assets/boton.svg';

function Requests_page() {
  const [offers, setOffers] = useState([]);

  return (
    <div className="requests_page">
      <Navbar />

      <div id="Request_container">
        <div id="tool_image">
          <img src={ImagemLupa} alt="tool" />
        </div>
        <div id="left_section">
          <div id="user">
            <div id="pfp"></div>
            <div id="userName">António Variações</div>
          </div>
          <div id="Request_name">
            <h2>Request</h2>
            <div id="tool_name">Lupa?</div>
          </div>
          <div id="message">
          Write a message for the owner/asker!<br></br>
          <input type="text" id="Message_Box"></input>
          </div>
          <div id="aaaa">
            <div id="balance"></div>
            <a id="link" href="/offers"><img id="butao"  src={Butt} ></img></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Requests_page;
