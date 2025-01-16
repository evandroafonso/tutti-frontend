<template>
  <div id="app">
    <!-- Cabeçalho -->
    <header class="app-header">
      <h1>Plataforma Educacional</h1>
    </header>

    <!-- Conteúdo da página -->
    <main class="app-content">
      <router-view />
    </main>

    <!-- Rodapé -->
    <footer class="app-footer">
      <p>&copy; 2025 Plataforma Educacional. Todos os direitos reservados.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Estilo principal do app */
#app {
  background-color: #f6f8fa;
  color: #24292f;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Altura mínima da tela inteira */
}

.app-content {
  flex: 1; /* Faz o conteúdo crescer para ocupar o espaço restante */
}

/* Cabeçalho */
.app-header {
  background-color: #1f2328;
  color: #ffffff;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #d0d7de;
}

.app-header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

/* Conteúdo principal *

/* Seção da imagem (esquerda) */
.image-section {
  flex: 1;
  max-width: 50%;
}

.image-section img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Seção do formulário (direita) */
.form-section {
  flex: 1;
  max-width: 400px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Rodapé */
.app-footer {
  background-color: #1f2328;
  color: #ffffff;
  padding: 10px;
  text-align: center;
  border-top: 1px solid #d0d7de;
}

.app-footer p {
  margin: 0;
  font-size: 14px;
  color: #adbac7;
}

/* Responsividade */
@media (max-width: 100%) {
  .app-content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    gap: 20px;
  }

  @media (max-width: 768px) {
    .app-content {
      flex-direction: column;
    }
  }

  .image-section {
    max-width: 80%;
    margin-bottom: 20px;
  }

  .form-section {
    width: 100%;
    max-width: 90%;
  }

  .app-header h1 {
    font-size: 20px;
  }

  .app-footer p {
    font-size: 12px;
  }
}
</style>
