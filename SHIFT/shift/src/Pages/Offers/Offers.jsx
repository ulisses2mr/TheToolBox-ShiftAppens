import React, { useEffect, useState } from "react";
import Navbar from '../../Components/Navbar/Navbar.jsx';
import "./Offers.css";
import ImagemLupa from '../../Assets/lupa-04.svg';
import bgTreadmill from '../../Assets/bg_passadeira.png';
import Offer_Card from "../../Components/Cards/Cards.jsx";

function Offers() {
  const [offers, setOffers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [userName, setUserName] = useState(null);
  let users = {};

  async function getUser(id) {
    try {
      const response = await fetch(`http://127.0.0.1:8080/user_info/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.results)

        let name = (data.results).name;
        console.log("Name:", name)

        users[id] = name;

      } else {
        console.error('Error in reponse to get user name:', response.status);
      } 
    } catch (error) {
      console.error('Error trying  getting user name:', error.message);
    }
  }


  const getProposals = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8080/proposals', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            //console.log(Object.keys(data.results[0]))
            let param = (Object.keys(data.results[0]));
            console.log("Keys")
            console.log(param)

            let proposal_data = []
            for (let i=0; i < (data.results).length; i++){
                let date = (data.results[i]).date_start
                let brand = (data.results[i]).ferramenta_brand
                let tool_id = (data.results[i]).ferramenta_id
                let photo = (data.results[i]).ferramenta_photo
                let price = (data.results[i]).ferramenta_price 
                let type = (data.results[i]).ferramenta_type
                let id = (data.results[i]).id
                let location = (data.results[i]).location
                let user_id = (data.results[i]).utilizador_id
                
                if (!(user_id in users)) {
                  getUser(user_id);
                }
                //console.log("Data results")
                //console.log(date, brand, tool_id, type, id, user_id)
                //console.log(data.results[i])

                proposal_data.push([date, brand, tool_id, price, type, id, location, user_id, users[user_id]])
            }
            
            //setOffers(data.results[0].date_start);
            console.log(proposal_data)
            setOffers(proposal_data)
        } else {
            console.error('Error in reponse to get proposals:', response.status);
        }
    } catch (error) {
        console.error('Error trying  getting proposals:', error.message);
    }
}

const getRequests = async () => {
  try {
      const response = await fetch('http://127.0.0.1:8080/requests', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (response.ok) {
          const data = await response.json();
          //console.log(Object.keys(data.results[0]))
          let param = (Object.keys(data.results[0]));
          console.log("Keys")
          console.log(param)

          let request_data = []
          for (let i=0; i < (data.results).length; i++){
              let date = (data.results[i]).date_start
              let brand = (data.results[i]).ferramenta_brand
              let tool_id = (data.results[i]).ferramenta_id
              let photo = (data.results[i]).ferramenta_photo
              let price = (data.results[i]).ferramenta_price 
              let type = (data.results[i]).ferramenta_type
              let id = (data.results[i]).id
              let user_id = (data.results[i]).utilizador_id
              //console.log("Data results")
              //console.log(date, brand, tool_id, type, id, user_id)
              //console.log(data.results[i])
              if (!(user_id in users)) {
                getUser(user_id);
              }
              //console.log("Username")
              //console.log(userName);

              request_data.push([date, brand, tool_id, price, type, id, user_id, users[user_id]]);
          }
          
          //setOffers(data.results[0].date_start);
          console.log(request_data)
          setRequests(request_data)
      } else {
          console.error('Error in reponse to get proposals:', response.status);
      }
  } catch (error) {
      console.error('Error trying  getting proposals:', error.message);
  }
}

  // Associar à Navbar
  const filterProposals = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/proposals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOffers(data.results);
      } else {
        console.error("Error in reponse to filter proposals:", response.status);
      }
    } catch (error) {
      console.error("Error filtering the proposals:", error.message);
    }
  };
  //};

  useEffect(() => {
    getProposals();
    getRequests();
  }, []);


  return (
    <div className="offers_page">
      <Navbar />

      <div id="banner">
        <img id="treadmill" src={bgTreadmill} alt="" />
        <img id="treadmill2" src={bgTreadmill} alt="" />

        <div className="search_bar">
          <div className="search_Backdrop"></div>

          <input type="text" placeholder="Search.."></input>
          <button className="searchBtn">
            <img id="lupa" src={ImagemLupa} alt="lupa" />
          </button>
        </div>
      </div>

      <div id="Off_Req_container">
        <div className="PostList" id="Lending">
          <h2>Lending</h2>
          {offers.map((offer, index) => (
            <Offer_Card
              key={index}
              username={ offer[offer.length - 1] }
              location={offer[4]}
            />
          ))}

        </div>

        <div className="PostList" id="Borrowing">
          <h2>Borrowing</h2>
          {requests.map((request, index) => (
            <Offer_Card
              key={index}
              username={ request[request.length - 1] }
              location={request[4]}
            />
          ))}
          
        </div>
      </div>
    </div>
  );
}

export default Offers;
