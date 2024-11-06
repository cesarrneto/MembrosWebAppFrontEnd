import React, { useState } from 'react';
import './Registrar.css';
import api from "../../services/api";
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';

export default function Registrar() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    async function register(event) {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('As senhas não são iguais');
            return;
        }

        const data = {
            email,
            password,
            confirmPassword
        };

        try {
            const response = await api.post('api/account/createuser', data);

            localStorage.setItem('email', email);
            localStorage.setItem('password', response.data.password);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expiration', response.data.expiration);

            navigate('/home');
        } catch (error) {
            console.error("Erro ao registrar:", error.response?.data || error.message);
            alert('O registro falhou ' + (error.response?.data?.message || error.message));
        }
    }

    return (
        <div className="register-container">
            <section className="form">
                <img src={logo} alt="Logo ICERJB" className="logo" />
                <form onSubmit={register}>
                    <h1>Cadastre-se na ICERJB</h1>

                    <input
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirme sua Senha"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                    <button className="button" type="submit">
                        Registrar
                    </button>
                </form>
            </section>
        </div>
    );
}
