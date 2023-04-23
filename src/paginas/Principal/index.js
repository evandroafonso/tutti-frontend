import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../Firebase";

class Principal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      sobrenome: "",
      dataNascimento: "",
    };
  }

  async componentDidMount() {
    await firebase.auth().onAuthStateChanged(async (usuario) => {
      if (usuario) {
        var uid = usuario.uid;

        await firebase
          .firestore()
          .collection("usuario")
          .doc(uid)
          .get()
          .then((retorno) => {
            this.setState({
              nome: retorno.data().nome,
              sobrenome: retorno.data().sobrenome,
              dataNascimento: retorno.data().dataNascimento,
            });
          });
      }
    });
  }

  render() {
    return (
      <section className="background" >
        <Link to="/login"><button className="buttonVoltar">Voltar para o Início</button></Link>
        <div className="backgroundTexto">
        <div className="mensagemTexto">
          <strong>Nome:</strong> {this.state.nome}
          <br/>
          <strong>Sobrenome: </strong>
          {this.state.sobrenome}
          <br/>
          <strong>Data de Nascimento: </strong>
          {this.state.dataNascimento}
        </div>
        </div>
      </section>
    );
  }
}

export default Principal;
