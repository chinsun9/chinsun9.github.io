const btn = document.getElementById('toggleTheme');

// utterances
function setUtterancesTheme(theme) {
  const utterances = document.querySelector('.utterances iframe');
  if (!utterances) return;

  const message = {
    type: 'set-theme',
    theme: `github-${theme}`,
  };

  utterances.contentWindow.postMessage(message, 'https://utteranc.es');
}

function initUtterancesTheme() {
  const utterances = document.querySelector('.utterances iframe');

  const message = {
    type: 'set-theme',
    theme: document.body.classList.contains('dark')
      ? 'github-dark'
      : 'github-light',
  };

  utterances.contentWindow.postMessage(message, 'https://utteranc.es');
}

// initUtterancesTheme();
window.addEventListener(
  'message',
  (e) => {
    // utterances 를 사용하면 페이지가 로드되고 resize를 한다
    // 이 메시지를 이벤트리스너로 수신할 수 있다
    // 이 메시지를 수신 받으면 안전하게 테마를 초기화할 수 있다
    if (e.origin !== 'https://utteranc.es') return;
    initUtterancesTheme();
  },
  false
);

// favicon

function setFaviconTheme(theme) {
  const href = `https://cdn.jsdelivr.net/gh/chinsun9/chinsun9.github.io@master/img/favicon-bold-color210928${
    theme === 'dark' ? '-dark' : ''
  }.svg?`;
  document.querySelector(`head > link[rel="icon"]`).href = href;
}

const DISPLAY_DARK = '🌙';
const DISPLAY_LIGHT = '🌞';

function updateTheme(isDark) {
  const theme = isDark ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-color-scheme', theme);
  document.body.classList[isDark ? 'add' : 'remove']('dark');
  btn.innerText = isDark ? DISPLAY_DARK : DISPLAY_LIGHT;
  setUtterancesTheme(theme);
  setFaviconTheme(theme);
}

// basic
function initTheme() {
  // chk local storage
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark');
    btn.innerText = DISPLAY_DARK;
    setFaviconTheme('dark');
    return;
  }
  if (theme === 'light') {
    btn.innerText = DISPLAY_LIGHT;
    return;
  }

  //   visit first time
  const isDark = window.matchMedia('(prefers-color-scheme: dark)');
  if (isDark) {
    document.body.classList.add('dark');
  }

  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  btn.innerText = isDark ? DISPLAY_DARK : DISPLAY_LIGHT;
  setFaviconTheme(isDark ? 'dark' : 'light');
}

function toggleTheme() {
  console.log(`toggle theme`);
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  updateTheme(isDark);
}

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    const isDark = e.matches;
    updateTheme(isDark);
  });

btn.addEventListener('click', () => {
  toggleTheme();
});

initTheme();
