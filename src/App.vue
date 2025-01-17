<template>
  <div id="app">
    <!-- Cabeçalho -->
    <Header />

    <!-- Conteúdo da página -->
    <main class="app-content">
      <router-view />
    </main>

    <!-- Rodapé -->
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue"; // Importa o componente Header
import Footer from "./components/Footer.vue"; // Importa o componente Footer

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
/* Reset de estilos padrão */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%; /* Garante que o corpo tenha 100% da altura da janela */
}

/* Estilização geral */
body {
  font-family: -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial,
    sans-serif;
  background-color: #f6f8fa;
  line-height: 1.5;
  display: flex;
  flex-direction: column; /* Define layout flex vertical */
  margin: 0;
  padding: 0;
  min-height: 100vh; /* Garante que o layout ocupe pelo menos a altura total da janela */
}

#app {
  display: flex;
  flex-direction: column; /* Garante alinhamento vertical para o cabeçalho, conteúdo e rodapé */
  flex: 1; /* Expande o app para ocupar o restante do espaço do body */
}

/* Conteúdo principal */
.app-content {
  flex: 1; /* Garante que o conteúdo principal ocupe o espaço restante entre cabeçalho e rodapé */
  padding: 2rem;
}

/* Links */
a {
  color: #0366d6;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
