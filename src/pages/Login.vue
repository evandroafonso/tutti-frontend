<template>
  <div class="register-container">

    <!-- Formulário à direita -->
    <div class="form-section">
      <div class="register-card">
        <h2>Entrar</h2>
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
            <label for="senha">Senha</label>
            <input
              type="password"
              id="senha"
              v-model="form.senha"
              placeholder="Digite sua senha"
              required
            />
          </div>

          <button type="submit">Login</button>
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
        senha: "",
      },
    };
  },
  methods: {
    submitForm() {
      console.log(this.form);
    },
  },
};
</script>

<style scoped>
/* Container geral */

.register-container {
  display: flex;
  justify-content: center;
}

.form-section {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.register-card {
  background-color: #ffffff;
  padding: 1.25rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2328;
  margin-bottom: 1rem;
  text-align: center;

}

.form-group {
  margin-bottom: 10px;
}

label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #586069;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  font-size: 0.875rem;
  border: 1px solid #d1d5da;
  border-radius: 4px;
  background-color: #fafbfc;
  color: #24292e;
  transition: border-color 0.2s ease-in-out;
}

input:focus {
  border-color: #4444;
  outline: none;
  background-color: #ffffff;
}

button {
  margin-top: 1rem; /* Ajuste conforme a distância desejada */
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background-color: #2ea44f;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}
button:hover {
  background-color: #22863a;
}

button:active {
  background-color: #176f2c;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(34, 134, 58, 0.3);
}

/* Responsividade */
@media (max-width: 768px) {
  .register-container {
    flex-direction: column;
    height: auto;
  }

  .form-section {
    padding: 1rem;
  }

  .register-card {
    padding: 1.5rem;
    max-width: 90%;
    min-width: unset;
  }
}
</style>
