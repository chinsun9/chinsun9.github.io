const btn = document.getElementById('toggleTheme');

// utterances
function setUtterancesTheme(theme) {
  const utterances = document.querySelector('.utterances iframe');

  const message = {
    type: 'set-theme',
    theme: theme === 'dark' ? 'github-dark' : 'github-light',
  };

  utterances.contentWindow.postMessage(message, 'https://utteranc.es');
}

function initUtterancesTheme() {
  const utterances = document.querySelector('.utterances iframe');

  if (utterances) {
    const message = {
      type: 'set-theme',
      theme: document.body.classList.contains('dark')
        ? 'github-dark'
        : 'github-light',
    };

    utterances.contentWindow.postMessage(message, 'https://utteranc.es');
  } else {
    setTimeout(initUtterancesTheme, 1000);
  }
}

initUtterancesTheme();

// basic

function initTheme() {
  // chk local storage
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark');
    btn.innerText = '🌙';
    return;
  }
  if (theme === 'light') {
    btn.innerText = '🌞';
    return;
  }

  //   visit first time
  const isDark = window.matchMedia('(prefers-color-scheme: dark)');
  if (isDark) {
    document.body.classList.add('dark');
  }

  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  btn.innerText = isDark ? '🌙' : '🌞';
}

function toggleTheme() {
  console.log(`toggle theme`);
  document.body.classList.toggle('dark');

  localStorage.setItem(
    'theme',
    document.body.classList.contains('dark') ? 'dark' : 'light'
  );
  btn.innerText = document.body.classList.contains('dark') ? '🌙' : '🌞';
  setUtterancesTheme(
    document.body.classList.contains('dark') ? 'dark' : 'light'
  );
}

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    const newColorScheme = e.matches ? 'dark' : 'light';
    localStorage.setItem('theme', newColorScheme);

    if (newColorScheme === 'dark') {
      document.body.classList.add('dark');
      btn.innerText = '🌙';
      setUtterancesTheme('dark');
      return;
    }
    document.body.classList.remove('dark');
    btn.innerText = '🌞';
    setUtterancesTheme('light');
  });

btn.addEventListener('click', function (event) {
  toggleTheme();
});

initTheme();
