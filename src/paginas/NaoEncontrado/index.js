import React, { Component } from "react";
import { Link } from "react-router-dom";

class NaoEncontrado extends Component {
  constructor(props) {
      super(props);
      this.state = {
        errorMessage: "Usuário não encontrado."
    }
  }

  render() {
    return (
      <section className="background">
        <h2 className="mensagem">
          Ops... Usuário não encontrado. <br />
          Volte para a página inicial.
        </h2>
        <Link to="/login">
          <button className="buttonVoltar">Voltar para a Página Inicial</button>
        </Link>
      </section>
    );
  }
}

export default NaoEncontrado;
