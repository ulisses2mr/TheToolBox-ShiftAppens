import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar.jsx";
import "./Request.css";
import ImagemLupa from "../Assets/lupa-04.svg";

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
            <div id="userName">Antonio Variações</div>
          </div>

          <div id="Request_name">
            <h2>Requesting</h2>
            <div id="tool_name">Lupa?</div>
          </div>

          <div id="message">
            <p>Write your message to the owner/asker!</p>
            <input
              type="text"
              id="Message_Box"
            ></input>
          </div>

          <div>
            <div id="balance"></div>
            <button id="Submit"></button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Requests_page;
