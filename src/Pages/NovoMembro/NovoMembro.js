import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiCornerDownLeft } from "react-icons/fi";
import api from "../../services/api";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

export default function NovoMembro() {
  const [id, setId] = useState("");
  const [nomeMembro, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dataDeNascimento, setDataDeNascimento] = useState(null);
  const [cargo, setCargo] = useState([]);
  const [departamento, setDepartamento] = useState([]);
  const [endereco, setEndereco] = useState("");

  const { membroId } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (membroId && membroId !== "0") {
      loadMembro();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [membroId]);

  async function loadMembro() {
    try {
      const response = await api.get(`api/membros/${membroId}`, authorization);
      setId(response.data.id);
      setNome(response.data.nomeMembro);
      setEmail(response.data.email);
      setDataDeNascimento(dayjs(response.data.dataDeNascimento));
      setCargo(response.data.cargo);
      setDepartamento(response.data.departamento);
      setEndereco(response.data.endereco);
    } catch (error) {
      alert("Erro ao recuperar o membro " + error);
      navigate("/membros");
    }
  }

  async function saveOrUpdate(event) {
    event.preventDefault();

    const data = {
      nomeMembro,
      email,
      dataDeNascimento: dataDeNascimento ? dataDeNascimento.toISOString() : null,
      cargo,
      departamento,
      endereco,
    };

    try {
      if (membroId === "0") {
        await api.post("api/membros", data, authorization);
      } else {
        data.id = id;
        if (!id) {
          alert("ID do membro não encontrado. Não é possível atualizar.");
          return;
        }
        await api.put(`api/membros/${id}`, data, authorization);
      }
    } catch (error) {
      alert("Erro ao gravar membro: " + error.response?.data?.message || error.message);
    }
    navigate("/membros");
  }

  return (
    <div className="novo-membro-container">
      <div className="content">
        <section className="form">
          <h1>{membroId === "0" ? "Incluir Novo Membro" : "Atualizar Membro"}</h1>
          <Link className="back-link" to="/membros">
            <FiCornerDownLeft size="25" color="#17202a" /> Retornar
          </Link>
        </section>

        <form onSubmit={saveOrUpdate}>
          <input
            placeholder="Nome"
            value={nomeMembro}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <DatePicker
              value={dataDeNascimento ? dayjs(dataDeNascimento) : null}
              onChange={(date, dateString) => setDataDeNascimento(date)}
              format="DD/MM/YYYY"
              className="form-control"
              placeholder="Data de Nascimento"
              showPopperArrow={false}
            />
          </div>
          
          <Select
            placeholder="Selecione o(s) Cargo(s)"
            value={cargo}
            onChange={(value) => setCargo(value)}
            className="form-control"
            style={{ width: "100%" }}
          >
            <Option value="Pastor">Pastor</Option>
            <Option value="Presbítero">Presbítero</Option>
            <Option value="Evangelista">Evangelista</Option>
            <Option value="Diácono">Diácono</Option>
            <Option value="Cooperador">Cooperador</Option>
            <Option value="Membro">Membro</Option>
            <Option value="Líder">Líder</Option>
            <Option value="Professor">Professor</Option>
          </Select>
          
          <Select
            placeholder="Selecione o(s) Departamento(s)"
            value={departamento}
            onChange={(value) => setDepartamento(value)}
            className="form-control"
            style={{ width: "100%", marginTop: "10px" }}
          >
            <Option value="Varões">Varões</Option>
            <Option value="Mulheres">Mulheres</Option>
            <Option value="Jovens">Jovens</Option>
            <Option value="Infantil">Infantil</Option>
            <Option value="Dança">Dança</Option>
            <Option value="Teatro">Teatro</Option>
            <Option value="Jogral">Jogral</Option>
            <Option value="Louvor">Louvor</Option>
            
          </Select>

          <input
            placeholder="Endereço"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
          <button className="button" type="submit">
            {membroId === "0" ? "Incluir " : "Atualizar "}
          </button>
        </form>
      </div>
    </div>
  );
}
