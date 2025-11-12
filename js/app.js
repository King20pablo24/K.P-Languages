// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode');
const body = document.body;

darkModeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
});

// Load Dark Mode Preference
if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
}

// Language Selection
const languageCards = document.querySelectorAll('.language-card');

languageCards.forEach(card => {
    card.addEventListener('click', () => {
        const lang = card.dataset.lang;
        window.location.href = `pages/${lang}/index.html`;
    });
});
