<template>
  <div class="register-container">
    <!-- Imagem à esquerda -->
    <div class="image-section">
      <img src=".././assets/vue.svg" alt="Música" />
    </div>

    <!-- Formulário à direita -->
    <div class="form-section">
      <div class="register-card">
        <h2>Criar uma conta</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="nome">Nome Completo</label>
            <input
              type="text"
              id="nome"
              v-model="form.nome"
              placeholder="Digite seu nome"
              required
            />
          </div>

          <div class="form-group">
            <label for="email">E-mail</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              placeholder="Digite seu e-mail"
              required
            />
          </div>

          <div class="form-group">
            <label for="cidade">Cidade</label>
            <input
              type="text"
              id="cidade"
              v-model="form.cidade"
              placeholder="Digite sua cidade"
              required
            />
          </div>

          <div class="form-group">
            <label for="senha">Senha</label>
            <input
              type="password"
              id="senha"
              v-model="form.senha"
              placeholder="Digite sua senha"
              required
            />
          </div>

          <div class="form-group">
            <label for="confirmSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmSenha"
              v-model="form.confirmSenha"
              placeholder="Confirme sua senha"
              required
            />
          </div>

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        nome: "",
        email: "",
        cidade: "",
        senha: "",
        confirmSenha: "",
      },
    };
  },
  methods: {
    submitForm() {
      if (this.form.senha !== this.form.confirmSenha) {
        alert("As senhas não coincidem!");
        return;
      }
      alert("Cadastro realizado com sucesso!");
      // Aqui você pode adicionar a lógica para enviar os dados ao backend.
    },
  },
};
</script>

<style scoped>
/* Estilo geral */
/* Estilo geral */
.register-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 40px;
  gap: 40px;
  background-color: #f6f8fa;
}

/* Ajuste responsivo */
@media (max-width: 768px) {
  .image-section img {
    max-width: 200px;
    max-height: 200px;
  }
}

/* Seção da imagem */
.image-section {
  max-width: 10%; /* Define a largura máxima */
  flex: 1;
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center;
}

/* Seção do formulário */
.form-section {
  flex: 1;
  display: flex;
  width: 30%;
  justify-content: center;
  align-items: center;
}

/* Card de Cadastro */
.register-card {
  background-color: #ffffff;
  padding: 20px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #d0d7de;
}

/* Título */
.register-card h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #24292f;
  text-align: center;
}

/* Formulário */
form {
  display: flex;
  flex-direction: column;
}

/* Campo do Formulário */
.form-group {
  margin-bottom: 20px;
}

label {
  font-size: 20px;
  color: #57606a;
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
}

input {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  background-color: #ffffff;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #0969da;
  outline: none;
  box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.3);
}

/* Botão */
button {
  padding: 12px;
  background-color: #2da44e;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #22863a;
}

button:active {
  background-color: #1a7f37;
}

/* Responsividade */
@media (max-width: 768px) {
  .register-container {
    flex-direction: column;
    padding: 10px;
  }

  .image-section {
    margin-bottom: 20px;
  }

  .form-section {
    width: 100%;
  }
}
</style>
