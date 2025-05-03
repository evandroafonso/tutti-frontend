import { ref, onMounted } from 'vue';

export function useDarkMode() {
  const darkMode = ref(false);

  const applyClass = (isDark) => document.documentElement.classList.toggle('dark', isDark);

  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value;
    localStorage.setItem('darkMode', darkMode.value);
    applyClass(darkMode.value);
  };

  onMounted(() => {
    const saved = localStorage.getItem('darkMode');
    darkMode.value = saved === 'true';
    applyClass(darkMode.value);
  });

  return { darkMode, toggleDarkMode };
}
