<template>
  <Disclosure as="nav" class="bg-white" v-slot="{ open }">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="shrink-0">
          <MusicalNoteIcon class="size-8 text-emerald-500" />
        </div>

        <!-- Botão do menu para dispositivos móveis -->
        <div class="flex -mr-2 md:hidden">
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 text-gray-800 rounded-md hover:bg-gray-200"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                :class="{ hidden: open, block: !open }"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
              <path
                :class="{ block: open, hidden: !open }"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </DisclosureButton>
        </div>

        <div class="hidden md:block">
          <div class="flex items-baseline space-x-4">
            <a
              v-for="item in navigation"
              :key="item.name"
              :href="item.href"
              class="px-3 py-1 text-sm font-medium text-gray-800 rounded-md hover:bg-green-400 hover:text-white"
            >
              {{ item.name }}
            </a>
          </div>
        </div>

        <div class="hidden md:block">
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton
                class="relative flex items-center max-w-xs text-sm bg-gray-800 rounded-full"
              >
                <span class="sr-only">Open user menu</span>
                <img class="rounded-full size-8" :src="user.imageUrl" alt="" />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black/5"
              >
                <MenuItem
                  v-for="item in userNavigation"
                  :key="item.name"
                  v-slot="{ active }"
                >
                  <a
                    :href="item.href"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                  >
                    {{ item.name }}
                  </a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <!-- Menu Mobile -->
    <DisclosurePanel class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a
          v-for="item in navigation"
          :key="item.name"
          :href="item.href"
          class="block px-3 py-2 text-base font-medium text-gray-800 rounded-md hover:bg-green-400 hover:text-white"
        >
          {{ item.name }}
        </a>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue';
import { MusicalNoteIcon } from '@heroicons/vue/24/solid';

defineProps({
  user: Object,
  navigation: Array,
  userNavigation: Array,
});
</script>
