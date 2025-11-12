// Progress tracking using localStorage

const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (currentUser) {
    // Display user stats
    document.getElementById('streak').textContent = (currentUser.streak || 0) + ' days';
    document.getElementById('points').textContent = currentUser.points || 0;
    document.getElementById('badges').textContent = currentUser.badges || 0;

    // Display language progress
    const progressContainer = document.getElementById('language-progress');
    const languages = ['english', 'spanish', 'french', 'german'];

    languages.forEach(lang => {
        const progress = currentUser.progress[lang] || 0;
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.innerHTML = `
            <h4>${lang.charAt(0).toUpperCase() + lang.slice(1)}</h4>
            <div class="bar">
                <div class="fill" style="width: ${progress}%"></div>
            </div>
            <p>${progress}% complete</p>
        `;
        progressContainer.appendChild(progressBar);
    });

    // AI Tutor suggestion (simulated)
    const aiSuggestions = [
        "Focus on vocabulary building to improve your speaking skills.",
        "Practice grammar exercises daily to strengthen your foundation.",
        "Try conversation practice to build confidence in real-life scenarios.",
        "Review past quizzes to identify areas for improvement."
    ];
    document.getElementById('ai-suggestion').textContent = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)];
} else {
    document.getElementById('progress').innerHTML = '<p>Please <a href="login.html">login</a> to view your progress.</p>';
}
