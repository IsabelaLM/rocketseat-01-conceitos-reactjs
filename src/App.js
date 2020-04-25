import React, { useState, useEffect } from "react";
import api from "./services/api.js";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const newRepo = {
      title: "Projeto mobile em React Native",
      url: "www.google.com",
      techs: ["ReactJS", "Git"],
    };

    const response = await api.post("/repositories", newRepo);
    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    const auxRepositories = [...repositories];
    const repoIndex = auxRepositories.findIndex((repo) => repo.id === id);

    if (repoIndex >= 0) {
      auxRepositories.splice(repoIndex, 1);
      setRepositories(auxRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => {
          return (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
