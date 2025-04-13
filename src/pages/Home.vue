<template>
  <div class="bg-white">
    <header class="absolute inset-x-0 top-0 z-50">
      <nav
        class="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Tutti</span>
            <img class="h-14 w-auto" src="/music.svg" alt="" loading="lazy" />
            <h1 class="text-2xl font-bold text-gray-700">Tutti</h1>
          </a>
        </div>
        <div class="hidden lg:flex lg:gap-x-8">
          <a
            v-for="item in navigation"
            :key="item.name"
            :href="item.href"
            class="text-sm/6 font-semibold text-gray-900"
            >{{ item.name }}</a
          >
        </div>
        <div class="lg:hidden">
          <button
            type="button"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-3 text-gray-700"
            @click="mobileMenuOpen = true"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-8 w-8" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog
        class="lg:hidden"
        @close="mobileMenuOpen = false"
        :open="mobileMenuOpen"
      >
        <div
          class="fixed inset-0 z-50 bg-black bg-opacity-25"
          aria-hidden="true"
        ></div>
        <DialogPanel
          class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
        >
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Tutti</span>
              <img class="h-14 w-auto" src="/music.svg" alt="" loading="lazy" />
              <h1 class="text-2xl font-bold text-gray-700">Tutti</h1>
            </a>
            <button
              type="button"
              class="-m-2.5 rounded-md p-2.5 text-gray-700"
              @click="mobileMenuOpen = false"
            >
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <a
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
                  class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                  >{{ item.name }}</a
                >
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>

    <div class="relative isolate px-6 pt-14 lg:px-8">
      <section class="h-screen flex items-center justify-center snap-start">
        <div class="text-center">
          <h1
            class="text-5xl font-bold tracking-tight text-gray-800 sm:text-6xl"
          >
            Musicalização Infantil facilitada!
          </h1>
          <p class="mt-8 text-lg font-bold text-green-600 sm:text-xl/8">
            Aprenda a transformar sons e brincadeiras em momentos mágicos de
            aprendizagem
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              class="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >Get started</a
            >
          </div>
        </div>
      </section>

      <section class="flex items-center justify-center snap-start">
        <div class="text-center">
          <h2 class="text-base/7 font-semibold text-green-600">
            Planos e Preços
          </h2>
          <p
            class="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl"
          >
            Escolha o plano certo para você
          </p>
          <p
            class="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8"
          >
            Choose an affordable plan that’s packed with the best features for
            engaging your audience, creating customer loyalty, and driving
            sales.
          </p>
        </div>
      </section>
      <div
        class="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2"
      >
        <div
          v-for="(tier, tierIdx) in tiers"
          :key="tier.id"
          :class="[
            tier.featured ? 'bg-green-200' : 'bg-white/60 sm:mx-8 lg:mx-0',
            tier.featured
              ? ''
              : tierIdx === 0
              ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl'
              : 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
            'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10',
          ]"
        >
          <!-- tipos dos planos: mensal ou anual -->
          <h3
            :id="tier.id"
            :class="[
              tier.featured ? 'text-green-600' : 'text-green-600',
              'text-base/7 font-semibold',
            ]"
          >
            {{ tier.name }}

            <!-- preços dos planos -->
          </h3>
          <p class="mt-4 flex items-baseline gap-x-2">
            <span
              :class="[
                tier.featured ? 'text-gray-900' : 'text-gray-900',
                'text-5xl font-semibold tracking-tight',
              ]"
              >{{ tier.priceMonthly }}</span
            >
            <span
              :class="[
                tier.featured ? 'text-gray-600' : 'text-gray-500',
                'text-base',
              ]"
              >{{ tier.id === "tier-anual" ? "/por ano" : "/por mês" }}</span
            >
          </p>

          <!-- descrições dos planos-->
          <p
            :class="[
              tier.featured ? 'text-gray-700' : 'text-gray-600',
              'mt-6 text-base/7',
            ]"
          >
            {{ tier.description }}
          </p>
          <!-- lista de vantagens -->

          <ul
            role="list"
            :class="[
              tier.featured ? 'text-gray-600' : 'text-gray-600',
              'mt-8 space-y-3 text-sm/6 sm:mt-10',
            ]"
          >
            <li
              v-for="feature in tier.features"
              :key="feature"
              class="flex gap-x-3"
            >
              <!-- icones da lista de vantagens -->
              <CheckIcon
                :class="[
                  tier.featured ? 'text-green-700' : 'text-green-600',
                  'h-6 w-5 flex-none',
                ]"
                aria-hidden="true"
              />
              {{ feature }}
            </li>
          </ul>
          <!-- botão de ação -->
          <a
            :href="tier.href"
            :aria-describedby="tier.id"
            :class="[
              tier.featured
                ? 'bg-green-500 text-white shadow-xs hover:bg-green-400 focus-visible:outline-green-500'
                : 'bg-green-300 text-gray-500 hover:text-white shadow-xs hover:bg-green-400 focus-visible:outline-green-500',
              'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10',
            ]"
            >Comece agora</a
          >
        </div>
      </div>
    </div>
    <div class="fixed bottom-4 right-4 z-50" style="position: sticky">
      <img
        src="/passaro-guitar.svg"
        alt="Imagem fixa"
        class="h-20 w-20 cursor-pointer hover:animate-bounce"
        loading="lazy"
      />
    </div>

    <footer class="bg-white dark:bg-gray-900">
      <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div class="md:flex md:justify-between">
          <div class="mb-6 md:mb-0">
            <a href="https://flowbite.com/" class="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                class="h-8 me-3"
                alt="FlowBite Logo"
              />
              <span
                class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
                >Flowbite</span
              >
            </a>
          </div>
          <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2
                class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
              >
                Recursos
              </h2>
              <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li class="mb-4">
                  <a href="https://flowbite.com/" class="hover:underline"
                    >Flowbite</a
                  >
                </li>
                <li>
                  <a href="https://tailwindcss.com/" class="hover:underline"
                    >Tailwind CSS</a
                  >
                </li>
              </ul>
            </div>
            <div>
              <h2
                class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
              >
                Siga-nos
              </h2>
              <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li class="mb-4">
                  <a
                    href="https://github.com/themesberg/flowbite"
                    class="hover:underline"
                    >Github</a
                  >
                </li>
                <li>
                  <a
                    href="https://discord.gg/4eeurUVvTy"
                    class="hover:underline"
                    >Discord</a
                  >
                </li>
              </ul>
            </div>
            <div>
              <h2
                class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
              >
                Legal
              </h2>
              <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li class="mb-4">
                  <a href="#" class="hover:underline"
                    >Política de Privacidade</a
                  >
                </li>
                <li>
                  <a href="#" class="hover:underline">Termos &amp; Condições</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr
          class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
        />
        <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
            >© 2023
            <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a
            >. All Rights Reserved.
          </span>
          <div class="flex mt-4 sm:justify-center sm:mt-0">
            <a
              href="#"
              class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="sr-only">Facebook page</span>
            </a>
            <a
              href="#"
              class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 21 16"
              >
                <path
                  d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59Z"
                />
              </svg>
              <span class="sr-only">Discord community</span>
            </a>
            <a
              href="#"
              class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 17"
              >
                <path
                  fill-rule="evenodd"
                  d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="sr-only">Twitter page</span>
            </a>
            <a
              href="#"
              class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="sr-only">GitHub account</span>
            </a>
            <a
              href="#"
              class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="sr-only">Dribbble account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Dialog, DialogPanel } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { CheckIcon } from "@heroicons/vue/20/solid";

// Navegação principal
const navigation = [
  { name: "Sobre nós", href: "#" },
  { name: "Preços", href: "#" },
  { name: "Cadastre-se", href: "#" },
  { name: "Login", href: "#" },
];

// Estado do menu móvel
const mobileMenuOpen = ref(false);

// Planos e preços
const tiers = [
  {
    name: "Mensal",
    id: "tier-mensal",
    href: "#",
    priceMonthly: "R$25,00",
    description: "O plano perfeito para quem está começando.",
    features: [
      "25 produtos",
      "Até 10.000 assinantes",
      "Análises avançadas",
      "Suporte com tempo de resposta de 24 horas",
    ],
    featured: false,
  },
  {
    name: "Anual",
    id: "tier-anual",
    href: "#",
    priceMonthly: "$199,00",
    description: "Suporte dedicado e infraestrutura para sua empresa.",
    features: [
      "Produtos ilimitados",
      "Assinantes ilimitados",
      "Análises avançadas",
      "Representante de suporte dedicado",
      "Automação de marketing",
      "Integrações personalizadas",
    ],
    featured: true,
  },
];

console.log(tiers);
// Links do rodapé
const footerLinks = [
  {
    title: "Recursos",
    items: [
      { label: "Flowbite", href: "https://flowbite.com/" },
      { label: "Tailwind CSS", href: "https://tailwindcss.com/" },
    ],
  },
  {
    title: "Siga-nos",
    items: [
      { label: "Github", href: "https://github.com/themesberg/flowbite" },
      { label: "Discord", href: "https://discord.gg/4eeurUVvTy" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Política de Privacidade", href: "#" },
      { label: "Termos & Condições", href: "#" },
    ],
  },
];

// Ícones sociais
const socialIcons = [
  {
    label: "Facebook",
    href: "#",
    svg: '<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19"><path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd"/></svg>',
  },
  {
    label: "Discord",
    href: "#",
    svg: '<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16"><path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59Z"/></svg>',
  },
];
</script>

<style>
html {
  scroll-behavior: smooth;
}

body {
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}

section {
  scroll-snap-align: start;
}
</style>
