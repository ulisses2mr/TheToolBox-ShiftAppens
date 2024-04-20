import React, {useEffect, useState } from "react";



function Offers() {

    
    const getProposals = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/proposals', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            // Check if the response is successful
            if (response.ok) {
                //const data = await response.json();
                console.log(response); // Log the data received from the server
                // Proceed with handling the data, updating UI, etc.
            } else {
                console.error('Error getting proposals:', response.status);
            }
        } catch (error) {
            console.error('Error fetching proposals:', error.message);
        }
    }

    useEffect(() => {
        getProposals();
      }, []);

    return (
      <div className="login_page">
        <button> ola </button>
      </div>
    );
  }
  
  export default Offers;