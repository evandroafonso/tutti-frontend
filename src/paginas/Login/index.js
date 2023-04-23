import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../Firebase";
import App from "../../App.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: "Login",
      email: "",
      senha: "",
      mensagem: "Você ainda não possui um cadastro?",
    };

    this.change = this.change.bind(this);
    this.validacao = this.validacao.bind(this);
  }

  change(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async validacao() {
    console.log("passou validação")
    await firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.senha)
      .then(() => {
        window.location.href = "./principal";
      })
      .catch((erro) => {
        window.location.href = "./naoencontrado";
      });
  }

  render() {
    return (
      <section className="background" >
          <h1 className="titulo"> {this.state.titulo} </h1>
          <input
            className="input"
            placeholder="E-mail"
            name="email"
            value={this.state.email}
            type="text"
            size="35"
            onChange={this.change}
          />{" "}
          <br/>
          <input
            className="input"
            placeholder="Senha"
            name="senha"
            value={this.state.senha}
            type="password"
            size="35"
            onChange={this.change}
          />
          <br/>
          <button className="button" onClick={this.validacao}>Acessar</button>
          <div className="mensagem">{this.state.mensagem}</div>
          <Link to="/cadastro"><button className="button">Cadastra-se aqui</button></Link>
      </section>
    );
  }
}

export default Login;
