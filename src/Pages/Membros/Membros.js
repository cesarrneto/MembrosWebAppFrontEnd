import React, { useState, useEffect } from "react";
import "./Membros.css";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiUserX } from "react-icons/fi";
import { Button } from "antd";

function Membros() {
  const [searchInput, setSearchInput] = useState("");
  const [filtro, setFiltro] = useState([]);
  const [membros, setMembros] = useState([]);

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    api.get("api/membros", authorization).then((response) => {
      setMembros(response.data);
      setFiltro(response.data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const searchMembros = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const dadosFiltrados = membros.filter((item) =>
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFiltro(dadosFiltrados);
    } else {
      setFiltro(membros);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const editMembro = (id) => navigate(`/membros/membro/novo/${id}`);

  const deleteMembro = async (id) => {
    if (window.confirm(`Deseja deletar o membro de id = ${id} ?`)) {
      await api.delete(`api/membros/${id}`, authorization);
      setMembros(membros.filter((membro) => membro.id !== id));
      setFiltro(filtro.filter((membro) => membro.id !== id));
    }
  };

  return (
    <div className="membro-container">
      <header>
        <span>
          Bem-Vindo, <strong>{email}</strong>!
        </span>
        <Link className="button" to="membro/novo/0">
          Novo membro
        </Link>
        <Button onClick={logout} color="danger" variant="solid">Sair</Button>
      </header>

      <form>
        <input
          type="text"
          placeholder="Filtrar membros"
          value={searchInput}
          onChange={(e) => searchMembros(e.target.value)}
        />
      </form>

      <h1>Relação de membros</h1>
      <ul>
        {(searchInput ? filtro : membros).map((membro) => (
          <li key={membro.id}>
            <b>Nome:</b> {membro.nomeMembro}
            <br />
            <b>Email:</b> {membro.email}
            <br />
            <b>Data de Nascimento:</b> {new Date(membro.dataDeNascimento).toLocaleDateString('pt-BR')}
            <br />
            <b>Cargo:</b> {membro.cargo}
            <br />
            <b>Departamento:</b> {membro.departamento}
            <br />
            <b>Endereço:</b> {membro.endereco}
            <br />
            <button onClick={() => editMembro(membro.id)} type="button">
              <FiEdit size="25" color="#17202a" />
            </button>
            <button onClick={() => deleteMembro(membro.id)} type="button">
              <FiUserX size="25" color="#17202a" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Membros;
