import React, { useState } from "react";
import './Loan.css';
import Navbar from '../Components/Navbar/Navbar.jsx';
import ImagemLado from '../Assets/elementloan.svg';

function Loan() {
    const [location, setLocation] = useState("loc");
    const [user_id, setUser_id] = useState("dqqe");

    const create = async () => {
        try {
            const offerData = {
                location: location,
                user_id: user_id,
            };

            const response = await fetch('http://127.0.0.1:8080/new_proposal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(offerData),
            });

            if (response.ok) {
                console.log(response);
                const data = await response.json();
                // Handle successful response if needed
            } else {
                console.error('Error in response to filter proposals:', response.status);
            }
        } catch (error) {
            console.error('Error filtering the proposals:', error.message);
        }
    }

    const handleSubmit = () => {
        create();
    }

    return (
        <div className="loan_page">
            <Navbar />
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
                <select name="marca_dropdown" className="dropdown_element" id="marca_dropdown">
                    <option value="marca_option">Pixa</option>
                    <option value="marca_option">Pixa</option>
                    <option value="marca_option">Pixa</option>
                </select>
                <select name="model_dropdown" className="dropdown_element" id="model_dropdown">
                    <option value="model_option" className="model_option">Pixa</option>
                    <option value="model_option" className="model_option">Pixa</option>
                    <option value="model_option" className="model_option">Pixa</option>
                </select>
                <button id="button_loan" onClick={handleSubmit}>SUBMIT</button>
            </div>
            <div><img className="imagem_lado" src={ImagemLado} alt="Loan side image" /></div>
        </div>
    );
}

export default Loan;