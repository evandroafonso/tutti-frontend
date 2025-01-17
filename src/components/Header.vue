<template>
  <header class="app-header">
    <h1>Tutti</h1>
    <!-- Links no lado direito -->
    <nav class="header-nav">
      <a href="/quem-somos">Quem somos</a>
      <a href="/planos">Planos</a>
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
  gap: 1rem; /* Espaçamento entre os links */
  align-items: center; /* Garante que os itens sejam alinhados verticalmente */
}

.header-nav a {
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
}

.header-nav a:hover {
  text-decoration: underline;
}

/* Estilo específico para o botão "Entrar" */
.btn-entrar {
  background-color: #1c8139; /* Cor verde */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s ease;
}
</style>
