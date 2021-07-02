const initTheme = () => {
  const theme = localStorage.getItem('theme');

  if ('dark' === theme) {
    document.body.classList.add('dark');
  }
};
