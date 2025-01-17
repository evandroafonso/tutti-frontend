<template>
  <header class="app-header">
    <h1>Tutti</h1>
    <!-- Links no lado direito -->
    <nav class="header-nav">
      <a href="/quem-somos">Quem somos</a>
      <a href="/planos">Planos</a>
      <a href="/cadastro">Cadastre-se</a>
      <a href="/entrar" class="btn-entrar">Entrar</a>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-header {
  background-color: #f6f8fa;
  color: #1f2328;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e1e4e8;
}

.app-header h1 {
  font-size: 1.5rem;
  font-weight: 600;
}

/* Estilo para o container dos links */
.header-nav {
  display: flex;
  font-size: 1rem;
  color: #1f2328;
  font-weight: 500;
  gap: 1rem; /* Espaçamento entre os links */
  align-items: center; /* Garante que os itens sejam alinhados verticalmente */
}

.header-nav a {
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  color: #1f2328;
}

.header-nav a:hover {
  text-decoration: none;
}

/* Estilo específico para o botão "Entrar" */
.header-nav .btn-entrar {
  background-color: #2ea44f; /* Cor verde */
  color: #ffffff; /* Cor do texto branca */
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-entrar:hover {
  background-color: #22863a;
}

.btn-entrar:active {
  background-color: #176f2c;
}

.btn-entrar:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(34, 134, 58, 0.3);
}
</style>
