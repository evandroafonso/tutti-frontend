<template>
  <div class="min-h-screen p-4 font-inter bg-gray-100 text-gray-900 dark:bg-dark-background dark:text-dark-text sm:p-6 lg:p-8">
    <!-- Layout principal -->
    <div class="mx-auto max-w-7xl">
      <h1 class="mb-8 text-3xl font-bold text-gray-900 dark:text-dark-title">Meu Perfil</h1>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Coluna da Esquerda (Formulário e Assinatura) -->
        <div class="space-y-8 lg:col-span-2">
          <!-- UserProfile.vue: Componente container -->
          <div class="p-6 bg-white rounded-lg shadow-lg dark:bg-dark-backgroundTab">
            <div class="flex flex-col items-center space-y-6 sm:flex-row sm:space-y-0 sm:space-x-6">
              <!-- UserAvatar.vue: Componente do Avatar -->
              <div class="relative cursor-pointer group" @click="triggerFileUpload">
                <img :src="user.avatar" alt="Avatar do Usuário" class="object-cover w-32 h-32 transition-opacity border-4 border-gray-700 rounded-full group-hover:opacity-75" />
                <div class="absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100">
                  <!-- Ícone de Câmera (Heroicons) -->
                  <svg class="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <input type="file" ref="fileInput" @change="handleFileChange" class="hidden" />
              </div>

              <!-- UserInfoForm.vue: Formulário de Informações -->
              <div class="flex-grow w-full">
                <h2 class="mb-4 text-2xl font-semibold text-gray-900 dark:text-dark-title">Editar Informações</h2>
                <form @submit.prevent="saveProfile" class="space-y-4">
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 dark:text-dark-text">Nome</label>
                    <input
                      type="text"
                      id="name"
                      v-model="form.name"
                      class="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-backgroundTab dark:text-dark-text dark:border-dark-border"
                    />
                  </div>
                  <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 dark:text-dark-text">Nova Senha</label>
                    <input
                      type="password"
                      id="password"
                      v-model="form.password"
                      class="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-backgroundTab dark:text-dark-text dark:border-dark-border"
                    />
                  </div>
                  <div>
                    <label for="confirm_password" class="block text-sm font-medium text-gray-700 dark:text-dark-text">Confirmar Nova Senha</label>
                    <input
                      type="password"
                      id="confirm_password"
                      v-model="form.confirmPassword"
                      class="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-backgroundTab dark:text-dark-text dark:border-dark-border"
                    />
                  </div>
                  <div class="text-right">
                    <button
                      type="submit"
                      :disabled="!isFormDirty"
                      class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-800"
                    >
                      Salvar Alterações
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- UserActivityTabs.vue: Abas de Atividade -->
          <div class="p-6 bg-white rounded-lg shadow-lg dark:bg-dark-backgroundTab">
            <h2 class="mb-4 text-xl font-semibold text-gray-900 dark:text-dark-title">Minhas Atividades</h2>
            <!-- Sistema de Abas -->
            <div class="border-b border-gray-200 dark:border-dark-border">
              <nav class="flex -mb-px space-x-6" aria-label="Tabs">
                <button
                  @click="activeTab = 'liked'"
                  :class="[
                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                    activeTab === 'liked' ? 'border-blue-500 text-blue-600 dark:text-dark-title' : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-200 dark:hover:border-dark-border',
                  ]"
                >
                  Aulas Curtidas
                </button>
                <button
                  @click="activeTab = 'comments'"
                  :class="[
                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                    activeTab === 'comments' ? 'border-blue-500 text-blue-600 dark:text-dark-title' : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-200 dark:hover:border-dark-border',
                  ]"
                >
                  Meus Comentários
                </button>
              </nav>
            </div>

            <!-- Conteúdo das Abas -->
            <div class="mt-6">
              <!-- LessonsList.vue: Lista de Aulas Curtidas -->
              <div v-if="activeTab === 'liked'">
                <ul class="space-y-4">
                  <li v-for="lesson in likedLessons" :key="lesson.id" class="flex items-center p-3 transition-colors bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-dark-backgroundTab dark:hover:bg-dark-hover">
                    <!-- Ícone de Coração (Heroicons) -->
                    <svg class="w-6 h-6 mr-4 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-gray-900 dark:text-dark-title">{{ lesson.title }}</span>
                  </li>
                </ul>
              </div>

              <!-- LessonsList.vue: Lista de Comentários -->
              <div v-if="activeTab === 'comments'">
                <ul class="space-y-4">
                  <li v-for="comment in commentedLessons" :key="comment.id" class="p-3 transition-colors bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-dark-backgroundTab dark:hover:bg-dark-hover">
                    <div class="flex items-start">
                      <!-- Ícone de Comentário (Heroicons) -->
                      <svg class="flex-shrink-0 w-6 h-6 mt-1 mr-4 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <div>
                        <p class="font-semibold text-gray-900 dark:text-dark-title">{{ comment.title }}</p>
                        <p class="mt-1 text-sm italic text-gray-500 dark:text-gray-400">"{{ comment.snippet }}"</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Coluna da Direita (Assinatura) -->
        <div class="lg:col-span-1">
          <!-- UserSubscription.vue: Card de Assinatura -->
          <div class="p-6 rounded-lg shadow-lg bg-gradient-to-br from-blue-600 to-indigo-700 text-white dark:from-blue-800 dark:to-indigo-900">
            <div class="flex items-center mb-4">
              <!-- Ícone de Coroa (Heroicons) -->
              <svg class="w-8 h-8 mr-3 text-yellow-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <h2 class="text-xl font-bold">{{ subscription.plan }}</h2>
            </div>
            <div class="text-sm">
              <p>Válido até:</p>
              <p class="text-lg font-semibold">{{ formattedExpiresAt }}</p>
            </div>
          </div>

          <!-- Preferência de Tema -->
          <div class="mt-6 p-6 rounded-lg shadow-lg bg-white text-gray-900 dark:bg-dark-backgroundTab dark:text-dark-title">
            <div class="flex items-center mb-4">
              <!-- Ícone de Tema (Heroicons) -->
              <svg v-if="darkMode" class="w-7 h-7 mr-3 text-yellow-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              <svg v-else class="w-7 h-7 mr-3 text-gray-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"></path></svg>
              <h2 class="text-lg font-bold">Tema do site</h2>
            </div>
            <div class="flex flex-col gap-2">
              <label class="inline-flex items-center cursor-pointer">
                <input type="radio" class="form-radio text-blue-600" :checked="darkMode" @change="setTheme(true)" name="theme" />
                <span class="ml-2">Modo Escuro</span>
              </label>
              <label class="inline-flex items-center cursor-pointer">
                <input type="radio" class="form-radio text-blue-600" :checked="!darkMode" @change="setTheme(false)" name="theme" />
                <span class="ml-2">Modo Claro</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import { useDarkMode } from '../composables/useDarkMode';

export default {
  name: 'UserProfile',
  setup() {
    // --- DADOS SIMULADOS (Mock Data) ---

    // Dados do usuário
    const user = ref({
      name: 'Aluno Exemplo',
      avatar: 'https://placehold.co/200x200/4a5568/ffffff?text=User',
    });

    // Dados da assinatura
    const subscription = ref({
      plan: 'Plano Premium',
      expires_at: '2024-12-31',
    });

    // Dados das aulas curtidas
    const likedLessons = ref([
      { id: 1, title: 'Vue 3 - Guia Completo para Iniciantes' },
      { id: 2, title: 'Tailwind CSS - Do Básico ao Avançado' },
      { id: 3, title: 'JavaScript Moderno (ES6+)' },
    ]);

    // Dados das aulas comentadas
    const commentedLessons = ref([
      { id: 1, title: 'Composition API no Vue 3', snippet: 'Excelente explicação sobre refs e reactives! Muito claro.' },
      { id: 2, title: 'Design Responsivo com Flexbox e Grid', snippet: 'Finalmente entendi a diferença! Ótimo conteúdo.' },
      { id: 3, title: 'Gerenciamento de Estado com Pinia', snippet: 'Pinia parece ser muito mais simples que Vuex. Adorei a aula.' },
    ]);

    // --- LÓGICA DO FORMULÁRIO ---

    // Dados reativos para o formulário de edição
    const form = reactive({
      name: user.value.name,
      password: '',
      confirmPassword: '',
    });

    // Propriedade computada para verificar se o formulário foi alterado
    const isFormDirty = computed(() => {
      return form.name !== user.value.name || form.password !== '';
    });

    // Função para salvar o perfil
    const saveProfile = () => {
      if (form.password && form.password !== form.confirmPassword) {
        alert('As senhas não coincidem!');
        return;
      }

      // Simula o salvamento dos dados
      user.value.name = form.name;
      console.log('Dados salvos!', {
        name: user.value.name,
        password: form.password ? '******' : '(não alterada)',
      });
      alert('Dados do perfil salvos com sucesso!');

      // Reseta os campos de senha
      form.password = '';
      form.confirmPassword = '';
    };

    // --- LÓGICA DO AVATAR ---
    const fileInput = ref(null);

    const triggerFileUpload = () => {
      // Aciona o clique no input de arquivo escondido
      fileInput.value.click();
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        // Cria uma URL temporária para a imagem selecionada e atualiza o avatar
        const reader = new FileReader();
        reader.onload = (e) => {
          user.value.avatar = e.target.result;
        };
        reader.readAsDataURL(file);
        console.log('Nova imagem de avatar selecionada:', file.name);
      }
    };

    // --- LÓGICA DAS ABAS DE ATIVIDADE ---
    const activeTab = ref('liked'); // 'liked' ou 'comments'

    // --- PROPRIEDADES COMPUTADAS AUXILIARES ---

    // Formata a data de expiração da assinatura
    const formattedExpiresAt = computed(() => {
      const date = new Date(subscription.value.expires_at + 'T00:00:00');
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    });

    // --- DARK MODE ---
    const { darkMode, toggleDarkMode } = useDarkMode();
    // Função para definir tema explicitamente
    const setTheme = (isDark) => {
      if (darkMode.value !== isDark) {
        toggleDarkMode();
      }
    };

    return {
      user,
      subscription,
      likedLessons,
      commentedLessons,
      form,
      isFormDirty,
      saveProfile,
      fileInput,
      triggerFileUpload,
      handleFileChange,
      activeTab,
      formattedExpiresAt,
      darkMode,
      setTheme,
    };
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.font-inter {
  font-family: 'Inter', sans-serif;
}
</style>
