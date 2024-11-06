import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Membros from "./Pages/Membros/Membros";
import HomePage from "./Pages/HomePage/HomePage";
import NovoMembro from "./Pages/NovoMembro/NovoMembro"
import "./Global.css";
import Menu from "./Components/Menu";
import Registrar from "./Pages/Registrar/Registrar";

export default function Rout(){
    return (
        <div className="app-container">
  <Menu/>
  <div className="main-content">
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/" element={<Login />} />
      <Route path="/membros" element={<Membros />} />
      <Route path="/membros/membro/novo/:membroId" element={<NovoMembro />} />
      <Route path="/registrar" element={<Registrar/>} />
    </Routes>
  </div>
  </div>    
    );
}