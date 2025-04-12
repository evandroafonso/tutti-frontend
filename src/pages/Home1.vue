<template>
  <!-- Root com suporte a dark mode -->
  <div class="flex flex-col min-h-screen dark:bg-gray-900">
    <!-- Header -->
    <header class="bg-white shadow-md dark:bg-gray-800">
      <div class="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" class="flex items-center">
          <!-- Logo usando o ícone de música -->
          <img class="h-10 w-auto" src="https://img.icons8.com/fluency/48/000000/music.png" alt="Logo Musical" />
          <span class="ml-2 text-2xl font-bold text-gray-800 dark:text-gray-300">Musicify</span>
        </a>
        <nav class="space-x-8 hidden lg:flex">
          <a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-semibold">Início</a>
          <a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-semibold">Recursos</a>
          <a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-semibold">Planos</a>
          <a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-semibold">Contato</a>
        </nav>
        <div class="hidden lg:flex items-center space-x-4">
          <a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-semibold">Entrar</a>
          <a href="#" class="px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-500 transition">
            Cadastrar
          </a>
          <!-- Botão para alternar dark mode -->
          <button @click="toggleDarkMode" class="focus:outline-none text-gray-600 dark:text-gray-300">
            <template v-if="darkMode">
              <SunIcon class="w-6 h-6" />
            </template>
            <template v-else>
              <MoonIcon class="w-6 h-6" />
            </template>
          </button>
        </div>
        <!-- Menu Mobile -->
        <button @click="toggleMobileMenu" class="lg:hidden text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
      <!-- Menu Mobile -->
      <transition name="fade">
        <div v-if="mobileMenuOpen" class="lg:hidden">
          <nav class="px-6 pt-4 pb-6 bg-white shadow-md dark:bg-gray-800">
            <a href="#" class="block py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-semibold">Início</a>
            <a href="#" class="block py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-semibold">Recursos</a>
            <a href="#" class="block py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-semibold">Planos</a>
            <a href="#" class="block py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-semibold">Contato</a>
            <div class="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
              <a href="#" class="block py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-semibold">Entrar</a>
              <a href="#" class="block py-2 px-4 mt-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-500 transition">
                Cadastrar
              </a>
            </div>
          </nav>
        </div>
      </transition>
    </header>

    <!-- Hero Section -->
    <section class="flex-grow bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-700 dark:to-purple-800 text-white">
      <div class="container mx-auto px-6 py-20 text-center">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
          Revolucione sua experiência musical
        </h1>
        <p class="max-w-xl mx-auto text-lg md:text-xl mb-10">
          Descubra uma plataforma inovadora que conecta você ao universo da música. Aprenda, crie e compartilhe suas paixões com recursos interativos que encantam e transformam.
        </p>
        <a href="#" class="inline-block px-8 py-4 bg-white text-indigo-600 font-bold rounded-md shadow hover:bg-gray-100 transition">
          Experimente Agora
        </a>
      </div>
    </section>

    <!-- Seção de Recursos -->
    <section class="py-20 bg-white dark:bg-gray-800">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-300 text-center mb-12">
          Recursos Inovadores
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm hover:shadow-lg transition">
            <svg class="w-12 h-12 text-indigo-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 19V6l12-2v13" />
            </svg>
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-300">Aulas Interativas</h3>
            <p class="mt-2 text-gray-600 dark:text-gray-400">
              Aprenda teoria, prática e improvisação com lições interativas e vídeos dinâmicos.
            </p>
          </div>
          <div class="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm hover:shadow-lg transition">
            <svg class="w-12 h-12 text-indigo-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8c-2.21 0-4 1.79-4 4v7h8v-7c0-2.21-1.79-4-4-4z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 2a10 10 0 00-10 10h4a6 6 0 0112 0h4a10 10 0 00-10-10z" />
            </svg>
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-300">Comunidade Vibrante</h3>
            <p class="mt-2 text-gray-600 dark:text-gray-400">
              Conecte-se com outros entusiastas da música, compartilhe ideias e colabore em projetos.
            </p>
          </div>
          <div class="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm hover:shadow-lg transition">
            <svg class="w-12 h-12 text-indigo-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 8h10M7 12h8m-8 4h6" />
            </svg>
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-300">Planos Flexíveis</h3>
            <p class="mt-2 text-gray-600 dark:text-gray-400">
              Escolha o plano ideal para você e tenha acesso a todos os recursos premium da plataforma.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Carrossel de Planos de Preço -->
  <div class="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl" aria-hidden="true">
      <div class="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>
    <div class="mx-auto max-w-4xl text-center">
      <h2 class="text-base/7 font-semibold text-indigo-600">Pricing</h2>
      <p class="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">Choose the right plan for you</p>
    </div>
    <p class="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer loyalty, and driving sales.</p>
    <div class="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
      <div v-for="(tier, tierIdx) in tiers" :key="tier.id" :class="[tier.featured ? 'relative bg-gray-900 shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0', tier.featured ? '' : tierIdx === 0 ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl' : 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none', 'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10']">
        <h3 :id="tier.id" :class="[tier.featured ? 'text-indigo-400' : 'text-indigo-600', 'text-base/7 font-semibold']">{{ tier.name }}</h3>
        <p class="mt-4 flex items-baseline gap-x-2">
          <span :class="[tier.featured ? 'text-white' : 'text-gray-900', 'text-5xl font-semibold tracking-tight']">{{ tier.priceMonthly }}</span>
          <span :class="[tier.featured ? 'text-gray-400' : 'text-gray-500', 'text-base']">/month</span>
        </p>
        <p :class="[tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base/7']">{{ tier.description }}</p>
        <ul role="list" :class="[tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-8 space-y-3 text-sm/6 sm:mt-10']">
          <li v-for="feature in tier.features" :key="feature" class="flex gap-x-3">
            <CheckIcon :class="[tier.featured ? 'text-indigo-400' : 'text-indigo-600', 'h-6 w-5 flex-none']" aria-hidden="true" />
            {{ feature }}
          </li>
        </ul>
        <a :href="tier.href" :aria-describedby="tier.id" :class="[tier.featured ? 'bg-indigo-500 text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-indigo-500' : 'text-indigo-600 ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300 focus-visible:outline-indigo-600', 'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10']">Get started today</a>
      </div>
    </div>
  </div>


    <!-- Rodapé -->
    <footer class="bg-gray-800 dark:bg-gray-900 text-gray-300 py-8">
      <div class="container mx-auto px-6 text-center">
        <p class="text-sm">
          &copy; 2025 Musicify. Todos os direitos reservados.
        </p>
        <p class="mt-2 text-xs">
          Desenvolvido com Vue 3 e Tailwind CSS.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { MoonIcon, SunIcon } from '@heroicons/vue/24/outline'
import { CheckIcon } from '@heroicons/vue/20/solid'

const tiers = [
  {
    name: 'Hobby',
    id: 'tier-hobby',
    href: '#',
    priceMonthly: '$29',
    description: "The perfect plan if you're just getting started with our product.",
    features: ['25 products', 'Up to 10,000 subscribers', 'Advanced analytics', '24-hour support response time'],
    featured: false,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    priceMonthly: '$99',
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Unlimited products',
      'Unlimited subscribers',
      'Advanced analytics',
      'Dedicated support representative',
      'Marketing automations',
      'Custom integrations',
    ],
    featured: true,
  },
]
// Estado para o menu mobile
const mobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Controle do carrossel de planos
const plans = ref([
  { name: 'Mensal', price: '25', period: 'Por Mês', recommended: true },
  { name: 'Semestral', price: '130', period: 'A cada 6 meses', recommended: false },
  { name: 'Anual', price: '199', period: 'Por Ano', recommended: false },
])
const currentSlide = ref(0)

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? plans.value.length - 1 : currentSlide.value - 1
}

const nextSlide = () => {
  currentSlide.value = currentSlide.value === plans.value.length - 1 ? 0 : currentSlide.value + 1
}

const goToSlide = (index) => {
  currentSlide.value = index
}

// Estado e função para dark mode
const darkMode = ref(false)
const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  if (darkMode.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('darkMode', 'true')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('darkMode', 'false')
  }
}

onMounted(() => {
  if (localStorage.getItem('darkMode') === 'true') {
    darkMode.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<style scoped>
/* Transição para o menu mobile */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
