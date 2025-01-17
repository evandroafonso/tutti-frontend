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

<style scoped></style>
