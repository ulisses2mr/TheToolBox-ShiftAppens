import React, { useState } from "react";
import './Loan.css';
import Navbar from '../../Components/Navbar/Navbar.jsx';
import Mapa from '../../Components/Mapa/Mapa.jsx';
import ImagemLado from '../../Assets/elementloan.svg';

import Butt from '../../Assets/boton.svg';

function Loan() {
    const [location, setLocation] = useState("Coimbra");
    const [user_id, setUser_id] = useState(1);
    const [is_offer, setIs_offer] = useState(); // true - offer request - false
    const [brand, setBrand] = useState("");
    const [tool_type, setToll_type] = useState();
    const [url, setUrl] = useState("");
    

    const create = async () => {
        try {
            const offerData = {
                utilizador_id: 2,
                ferramenta_id: tool_type
            };
            if (is_offer)  {setUrl('http://127.0.0.1:8080/new_request');}
            else {setUrl('http://127.0.0.1:8080/new_proposal');}
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(offerData),
            });

            if (response.ok) {
                console.log(response);
                console.log(offerData);
                window.location.href = '/offers';
            } else {
                console.error('Error in response to filter proposals:', response.status);
            }
        } catch (error) {
            console.error('Error filtering the proposals:', error.message);
        }
    }

    const handleSubmit = () => {
        console.log(location) 
        console.log(user_id)
        console.log(is_offer)
        console.log(brand)
        console.log(tool_type)
        if (tool_type=="hammer") setToll_type(1);
        if (tool_type=="tool case") setToll_type(2);
        if (tool_type=="drill") setToll_type(3);
        if (is_offer==="1") setIs_offer(true);
        else setIs_offer(false);
        create();
    }

    return (
        <div className="loan_page">
            <Navbar />
            
            <div className="form_loan">
           <div className="title_loan"> <h1>CREATE A </h1>   
           <select name="tool_dropdown"  id="button_request" onChange={(e) => setIs_offer(e.target.value)}>
                    <option value="1">REQUEST</option>
                    <option value="2">LOAN</option>
                   
                </select>
           </div>
              
                <select name="tool_dropdown" className="dropdown_element" id="tool_dropdown" onChange={(e) => setToll_type(e.target.value)}>
                    <option value="hammer">Hammer</option>
                    <option value="tool case">Tool Case</option>
                    <option value="drill">Drill</option>
                </select>
                <select name="marca_dropdown" className="dropdown_element" id="marca_dropdown" onChange={(e) => setBrand(e.target.value)}>
                    <option value="bosch">Bosch</option>
                    <option value="dexter">Dexter</option>
                </select>
                <a id="button_loan" onClick={handleSubmit}><img  src={Butt} ></img></a>
            </div>
      

            <div id="imagem_container_loan"><img className="imagem_lado" src={ImagemLado} alt="Loan side image" /></div>
        </div>
    );
}

export default Loan;