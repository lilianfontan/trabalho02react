import { useState } from 'react';
import './styles.css';

import ResultCard from 'components/ResultCard';
import axios from 'axios';

type FormData = {
  usuario: string;
};

type GitUser = {
  url: string;
  seguidores: number;
  localidade: string;
  nome: string;
  imagem: string;
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
        {gitUser && (
          <>
            <ResultCard title="Perfil" description={gitUser.url} />
            <ResultCard title="Localidade" description={gitUser.localidade} />
          </>
        )}
      </div>
    </div>
  );
};

export default GitSearch;
