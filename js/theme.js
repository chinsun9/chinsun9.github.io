const STORAGE_THEME_KEY = 'darkTheme';
const HTML_THEME_DATASET_KEY = 'data-color-scheme';
const HTML = document.documentElement;
const TOGGLE_BUTTON_ID = 'toggleThemeButton';

const DISPLAY_DARK = '🌙';
const DISPLAY_LIGHT = '🌞';

const getJsonFromStorage = key => JSON.parse(localStorage.getItem(key));

// eslint-disable-next-line no-confusing-arrow
const getThemeString = isDark => isDark ? 'dark' : 'light';

// utterances
function setUtterancesTheme(isDark) {
    const utterances = document.querySelector('.utterances iframe');
    if (!utterances) return;

    const message = {
        type: 'set-theme',
        theme: `github-${getThemeString(isDark)}`
    };

    utterances.contentWindow.postMessage(message, 'https://utteranc.es');
}

function initUtterancesTheme() {
    const utterances = document.querySelector('.utterances iframe');

    const isDark = getJsonFromStorage(STORAGE_THEME_KEY);
    const message = {
        type: 'set-theme',
        theme: `github-${getThemeString(isDark)}`
    };

    utterances.contentWindow.postMessage(message, 'https://utteranc.es');
}

window.addEventListener(
    'message',
    e => {
    // utterances 를 사용하면 페이지가 로드되고 resize를 한다
    // 이 메시지를 이벤트리스너로 수신할 수 있다
    // 이 메시지를 수신 받으면 안전하게 테마를 초기화할 수 있다
        if (e.origin !== 'https://utteranc.es') return;
        initUtterancesTheme();
    },
    false
);

function setFaviconTheme(isDark) {
    const href = `https://cdn.jsdelivr.net/gh/chinsun9/chinsun9.github.io@master/img/favicon-bold-color210928${isDark ? '-dark' : ''}.svg?`;
    document.querySelector('head > link[rel="icon"]').href = href;
}


function updateTheme(isDark) {
    localStorage.setItem(STORAGE_THEME_KEY, isDark);
    const btn = document.getElementById(TOGGLE_BUTTON_ID);
    if (btn) btn.innerText = isDark ? DISPLAY_DARK : DISPLAY_LIGHT;
    HTML.setAttribute(HTML_THEME_DATASET_KEY, getThemeString(isDark));
    setUtterancesTheme(isDark);
    setFaviconTheme(isDark);
}

function initTheme() {
    const savedIsDark = getJsonFromStorage(STORAGE_THEME_KEY);
    const isDark = savedIsDark !== null && savedIsDark !== undefined ? savedIsDark : window.matchMedia('(prefers-color-scheme: dark)').matches;
    updateTheme(isDark);

    const observer = new MutationObserver(mutations => {
        mutations.forEach(() => {
            const btn = document.getElementById(TOGGLE_BUTTON_ID);
            if (!btn) return;
            btn.innerText = isDark ? DISPLAY_DARK : DISPLAY_LIGHT;
            observer.disconnect();
        });
    });

    observer.observe(HTML, { childList: true });
}

function toggleTheme() {
    const isDark = getJsonFromStorage(STORAGE_THEME_KEY);
    updateTheme(!isDark);
}

window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', e => {
        const isDark = e.matches;
        updateTheme(isDark);
    });

window.addEventListener('click', e => {
    if (e.target.id !== TOGGLE_BUTTON_ID) return;
    toggleTheme();
});

initTheme();
