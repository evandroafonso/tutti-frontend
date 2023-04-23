import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../Firebase";

class Cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      sobrenome: "",
      email: "",
      senha: "",
      dataNascimento: ""
    };

    this.change = this.change.bind(this);
    this.gravar = this.gravar.bind(this);
  }

  change(event) {
    this.setState({ [event.target.nome]: event.target.value });
  }

  async gravar() {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.senha)
      .then(async (retorno) => {
        await firebase
          .firestore()
          .collection("usuario")
          .doc(retorno.user.uid)
          .set({
            nome: this.state.nome,
            sobrenome: this.state.sobrenome,
            dataNascimento: this.state.dataNascimento
          });
      }).then(() => {
        window.location.href = "./login";
      })
      .catch(() => {
        window.location.href = "./naoencontrado";
      });;
  }

  render() {
    return (
        <section className="background" >
        <Link to="/login"><button className="buttonVoltar">Voltar para Login</button></Link>
        <h1 className="titulo">Tela de Cadastro</h1>
        <input
          className="input"
          type="email"
          placeholder="E-mail"
          onChange={(e) => this.setState({ email: e.target.value })}
        />
        <br/>
        <input
          className="input"
          type="password"
          placeholder="Senha"
          onChange={(e) => this.setState({ senha: e.target.value })}
        />
        <br/>
        <input
          className="input"
          type="text"
          placeholder="Nome"
          onChange={(e) => this.setState({ nome: e.target.value })}
        />
        <br/>
        <input
          className="input"
          type="text"
          placeholder="Sobrenome"
          onChange={(e) => this.setState({ sobrenome: e.target.value })}
        />
        <br/>
        <input
          className="input"
          type="text"
          placeholder="Data de Nascimento"
          onChange={(e) => this.setState({ dataNascimento: e.target.value })}
        />
        <br/>
        <button className="button" onClick={this.gravar}>Efetuar Cadastro</button>
        </section>
    );
  }
}

export default Cadastro;
