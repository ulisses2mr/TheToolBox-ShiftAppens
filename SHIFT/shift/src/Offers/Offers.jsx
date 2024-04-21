import React, {useEffect, useState } from "react";



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
                console.log("Keys")
                console.log(param)

                let proposal_data = []
                for (let i=0; i < (data.results).length; i++){
                    let date = (data.results[i]).date_start
                    let brand = (data.results[i]).ferramenta_brand
                    let tool_id = (data.results[i]).ferramenta_id
                    let photo = (data.results[i]).ferramenta_photo
                    let type = (data.results[i]).ferramenta_price
                    let id = (data.results[i]).id
                    let user_id = (data.results[i]).utilizador_id
                    console.log("Data results")
                    console.log(date, brand, tool_id, type, id, user_id)
                    console.log(data.results[i])
                    
                    let img = new Image()
                    img.src = "data:image/png;base64," + photo;

                    proposal_data = [date, brand, tool_id, type, id, user_id, img]
                }
                
                //setOffers(data.results[0].date_start);
                setOffers(proposal_data)
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

    useEffect(() => {
        getProposals();
      }, []);

    return (
      <div className="login_page">
        <h1>{offers}</h1>
        
      </div>
    );
  }
  
  export default Offers;