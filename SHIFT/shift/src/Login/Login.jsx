import React, {useState } from "react";



function Login() {

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
      <div className="login_page">
        <button> ola </button>
      </div>
    );
  }
  
  export default Login;