import React, { useEffect, useState } from "react";
import "./Offers.css";

function Offers() {
    const [offers,setOffers] = useState([]);
    
    const getProposals = async () => {
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
                console.log(param)
                for (let i=0; i < (data.results).length; i++){
                    (data.results[i]).date_start
                    //console.log(data.results[i])
                    
                }
                
                setOffers(data.results[0].date_start);
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
            const response = await fetch('http://127.0.0.1:8080/proposals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setOffers(data.results);
            } else {
                console.error('Error in reponse to filter proposals:', response.status);
            }
        } catch (error) {
            console.error('Error filtering the proposals:', error.message);
        }
    }
  };

  useEffect(() => {
    //getProposals();
  }, []);

    return (
      <div className="login_page">
        <h1>{offers}</h1>
        
      </div>
    );
  }
  
  export default Offers;