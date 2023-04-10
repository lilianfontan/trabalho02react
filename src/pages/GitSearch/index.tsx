import { useState } from 'react';
import './styles.css';

import ResultCard from 'components/ResultCard';
import axios from 'axios';

type FormData = {
  usuario: string;
};

type GitUser = {
  url: string;
  followers: string;
  location: string;
  name: string;
  avatar_url: string;
};

const GitSearch = () => {
  const [formData, setFormData] = useState<FormData>({
    usuario: '',
  });

  const [gitUser, setGitUser] = useState<GitUser>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .get(`https://api.github.com/users/${formData.usuario}`)
      .then((response) => {
        setGitUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setGitUser(undefined);
        console.log(error);
      });
  };

  return (
    <div className="cep-search-container">
      <div className="container search-container">
        <h3>Encontre um perfil Github</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              type="text"
              name="usuario"
              value={formData.usuario}
              className="search-input"
              placeholder="Usuário Github"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary search-button">
              Encontrar
            </button>
          </div>
        </form>
      </div>
      {gitUser && (
        <>
          <div className="container response-container">
            <div>
              <img src={gitUser.avatar_url} alt="" />
            </div>
            <div className="response-container-data">
              <div className="informacoes">
                <h4>Informações</h4>
              </div>
              <div className="results-container">
                <div className="results-container-link">
                  <div className="title">Perfil: </div>
                  <div className="description">
                    <a href="">{gitUser.url}</a>
                  </div>
                </div>
                <ResultCard title="Seguidores: " description={gitUser.followers} />
                <ResultCard title="Localidade: " description={gitUser.location} />
                <ResultCard title="Nome: " description={gitUser.name} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GitSearch;
