import React, {useState } from "react";

import './Loan.css';
import Navbar from '../Components/Navbar/Navbar.jsx';
import ImagemLado from '../Assets/elementloan.svg';

function Loan() {

    const [buttonclicked,setButtonClicked] = useState(false);




    /*const handleLogin = async () => {
        setButtonClicked(true);
        setTimeout(() => setButtonClicked(false), 100);
        let response;

        try {
            response = await fetch('http://127.0.0.1:8000/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            //Se a resposta for positiva, guardar o token no local storage e redirecionar para a página de estado da candidatura
            if (response.ok) {
                const data = await response.json();
                const token = data["access_token"];
                const user = data["user"];
                const type = data["type"];
                // Guardar o token no local storage
                localStorage.setItem('token', token);
                //Guardar id do user
                localStorage.setItem('user', user);

                window.location.href = '/main';
                
            } else {
                console.error('Erro no login:', response.status);
                alert('User ou senha incorretos. Tente novamente.');
                setPassword('');
            }
        } catch (error) {
            console.error('Error in login:', error.message);
        }
    };*/

    return (
        
      <div className="loan_page">
        <Navbar/>
        
        <div className="form_loan">

            <h1>CREATE A POST</h1>
 <select name="request_dropdown" className="dropdown_element" id="request_dropdown"> 
        <option value="request_option">Request</option> 
        <option value="loan_option">Loan</option> 
    </select>
    <select name="tool_dropdown" className="dropdown_element" id="tool_dropdown"> 
        <option value="tool_option">Hammer</option> 
        <option value="tool_option">Screwdriver</option> 
        <option value="tool_option">Wrench</option> 



        
    </select>
    <select name="marca_dropdown"  className="dropdown_element" id="marca_dropdown"> 
        <option value="marca_option">Pixa</option> 
        <option value="marca_option">Pixa</option> 
        <option value="marca_option">Pixa</option> 
    </select>

    <select name="model_dropdown" className="dropdown_element" id="model_dropdown"> 
        <option value="model_option" className="model_option">Pixa</option> 
        <option value="model_option" className="model_option">Pixa</option> 
        <option value="model_option" className="model_option">Pixa</option> 
    </select>


    <button id="button_loan">SUBMIT</button>
    </div>
    <div><img class="imagem_lado" src={ImagemLado}></img></div>
      </div>
    );
  }
  
  export default Loan;