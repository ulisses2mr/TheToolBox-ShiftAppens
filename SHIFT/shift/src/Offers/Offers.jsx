import React, { useEffect, useState } from "react";
import "./Offers.css";

function Offers() {
  const getProposals = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/proposals", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Verifique se a resposta foi bem-sucedida
      if (response.ok) {
        const data = await response.json();
        console.log(data.results[0]); // Imprime os dados retornados no console
        // Você pode fazer algo com os dados, como atualizar a interface do usuário
      } else {
        console.error("Erro ao obter propostas:", response.status);
      }
    } catch (error) {
      console.error("Erro na requisição:", error.message);
    }
  };

  useEffect(() => {
    //getProposals();
  }, []);

  return (
    <div className="offers_page">
      <div id="banner">
        <img></img>
        <img></img>

        <div className="search_bar">
          <div className="search_Backdrop"></div>
          
          <input type="text" placeholder="Search.."></input>
          <button className="searchBtn">
            <img src=""></img>
          </button>
        </div>
      </div>

      <div id="Off_Req_container">
        <div id="Lending">
          <h2>Lending</h2>
         
          <div className="unit Have">
            <div className="unit_left">
            <div className="pfp"></div>
            <p>User X has a Pixa</p>
            </div>
            <div className="unit_right">
            <p>5.9Km</p>
            <img src="" alt="tool_image" />
            </div>
          </div>
          
          
        </div>

        <div id="Borrowing">
          <h2>Borrowing</h2>

          <div className="unit Have">
            <div className="unit_left">
            <div className="pfp"></div>
            <p>User X has a Pixa</p>
            </div>
            <div className="unit_right">
            <p>5.9Km</p>
            <img src="" alt="tool_image" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Offers;
