import React, { useEffect, useState } from "react";
import Navbar from '../../Components/Navbar/Navbar.jsx';
import "./Request.css";
import ImagemLupa from '../../Assets/lupa-04.svg';

function Requests_page() {
  const [offers, setOffers] = useState([]);

  return (
    <div className="requests_page">
      <Navbar />

      <div id="Request_container">
        <div id="tool_image">
            <img src={ImagemLupa} alt="tool" />
        </div>
        <div id="left section">
          <div id="user">
            <div id="pfp"></div>
            <div id="userName"></div>
          </div>
          <div id="Request_name">
            <h2>Request</h2>
            <div  id="tool_name"></div>
          </div>
          <input  type="text" placeholder="Description" id="Message_Box"></input>
          <button id="Submit"></button>
        </div>
      </div>
    </div>
  );
}

export default Requests_page;
