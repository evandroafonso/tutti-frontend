<template>
  <div class="min-h-screen p-4 text-gray-300 bg-gray-900 sm:p-6 lg:p-8 font-inter">
    <!-- Layout principal -->
    <div class="mx-auto max-w-7xl">
      <h1 class="mb-8 text-3xl font-bold text-white">Meu Perfil</h1>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Coluna da Esquerda (Formulário e Assinatura) -->
        <div class="space-y-8 lg:col-span-2">
          <!-- UserProfile.vue: Componente container -->
          <div class="p-6 bg-gray-800 rounded-lg shadow-lg">
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
                <h2 class="mb-4 text-2xl font-semibold text-white">Editar Informações</h2>
                <form @submit.prevent="saveProfile" class="space-y-4">
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-400">Nome</label>
                    <input
                      type="text"
                      id="name"
                      v-model="form.name"
                      class="block w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label for="password" class="block text-sm font-medium text-gray-400">Nova Senha</label>
                    <input
                      type="password"
                      id="password"
                      v-model="form.password"
                      class="block w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label for="confirm_password" class="block text-sm font-medium text-gray-400">Confirmar Nova Senha</label>
                    <input
                      type="password"
                      id="confirm_password"
                      v-model="form.confirmPassword"
                      class="block w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div class="text-right">
                    <button
                      type="submit"
                      :disabled="!isFormDirty"
                      class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                      Salvar Alterações
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- UserActivityTabs.vue: Abas de Atividade -->
          <div class="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h2 class="mb-4 text-xl font-semibold text-white">Minhas Atividades</h2>
            <!-- Sistema de Abas -->
            <div class="border-b border-gray-700">
              <nav class="flex -mb-px space-x-6" aria-label="Tabs">
                <button
                  @click="activeTab = 'liked'"
                  :class="[
                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                    activeTab === 'liked' ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500',
                  ]"
                >
                  Aulas Curtidas
                </button>
                <button
                  @click="activeTab = 'comments'"
                  :class="[
                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                    activeTab === 'comments' ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500',
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
                  <li v-for="lesson in likedLessons" :key="lesson.id" class="flex items-center p-3 transition-colors bg-gray-700 rounded-md hover:bg-gray-600">
                    <!-- Ícone de Coração (Heroicons) -->
                    <svg class="w-6 h-6 mr-4 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-white">{{ lesson.title }}</span>
                  </li>
                </ul>
              </div>

              <!-- LessonsList.vue: Lista de Comentários -->
              <div v-if="activeTab === 'comments'">
                <ul class="space-y-4">
                  <li v-for="comment in commentedLessons" :key="comment.id" class="p-3 transition-colors bg-gray-700 rounded-md hover:bg-gray-600">
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
                        <p class="font-semibold text-white">{{ comment.title }}</p>
                        <p class="mt-1 text-sm italic text-gray-400">"{{ comment.snippet }}"</p>
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
          <div class="p-6 text-white rounded-lg shadow-lg bg-gradient-to-br from-blue-600 to-indigo-700">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';

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
