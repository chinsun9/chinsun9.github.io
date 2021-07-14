const initTheme = () => {
  const theme = localStorage.getItem('theme');

  const isDark = 'dark' === theme;
  if (isDark) document.body.classList.add('dark');
  document.documentElement.setAttribute(
    'data-color-scheme',
    isDark ? 'dark' : 'light'
  );
};
