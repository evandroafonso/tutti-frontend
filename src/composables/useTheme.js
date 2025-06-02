import { computed } from 'vue';
import { useDarkMode } from './useDarkMode';
import { colors, darkColors, textColors, backgroundColors, borderColors, stateColors } from '../theme/colors';

export function useTheme() {
  const { darkMode } = useDarkMode();

  const theme = computed(() => ({
    colors: darkMode.value ? darkColors : colors,
    text: darkMode.value ? textColors.dark : textColors.light,
    background: darkMode.value ? backgroundColors.dark : backgroundColors.light,
    border: darkMode.value ? borderColors.dark : borderColors.light,
    state: stateColors,
  }));

  const getColor = (colorName, shade = 500) => {
    return theme.value.colors[colorName]?.[shade] || theme.value.colors.primary[shade];
  };

  const getTextColor = (type = 'primary') => {
    return theme.value.text[type];
  };

  const getBackgroundColor = (type = 'primary') => {
    return theme.value.background[type];
  };

  const getBorderColor = (type = 'primary') => {
    return theme.value.border[type];
  };

  const getStateColor = (state, type = 'light') => {
    return theme.value.state[state]?.[type] || theme.value.state.info[type];
  };

  return {
    theme,
    getColor,
    getTextColor,
    getBackgroundColor,
    getBorderColor,
    getStateColor,
  };
} 