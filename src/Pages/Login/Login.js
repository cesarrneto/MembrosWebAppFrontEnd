import React, { useState } from 'react';
import './Login.css';
import api from "../../services/api";
import { useNavigate } from 'react-router-dom';
import logo from './logo.png'

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function login(event){
        event.preventDefault();

        const data = {
            email, password
        };

        try{

            const response = await api.post('api/account/loginuser',data);

            localStorage.setItem('email',email);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expiration', response.data.expiration);

            navigate('/home');
        }catch(error){
            alert('O login falhou ' + error)
        }      
    }
    function goToRegister() {
        navigate('/registrar');
    }

    return (
        <div className="login-container">
          <section className="form">
          <img src={logo} alt="Logo ICERJB" className="logo" />
            <form onSubmit={login}>
                <h1>Seja Bem vindo a ICERJB</h1>
                    
                <input placeholder="Email" 
                     value={email}
                     onChange={e=>setEmail(e.target.value)}
                />
                <input type="password" placeholder="Password"
                   value={password}
                   onChange={e => setPassword(e.target.value)}
                />
                <button className="button" type="submit">Entrar</button>
                <button className='button' type="button" onClick={goToRegister}>Registrar</button>
            </form>
            </section>
        </div>
    )
}
