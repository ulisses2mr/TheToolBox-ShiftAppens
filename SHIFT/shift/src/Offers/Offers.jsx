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
    
            // Verifique se a resposta foi bem-sucedida
            if (response.ok) {
                const data = await response.json();
                console.log(data.results[0]); // Imprime os dados retornados no console
                // Você pode fazer algo com os dados, como atualizar a interface do usuário
            } else {
                console.error('Erro ao obter propostas:', response.status);
            }
        } catch (error) {
            console.error('Erro na requisição:', error.message);
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