let auraChart = null;

function renderLeaderboard() {
    const students = DataService.getStudents()
        .sort((a, b) => b.aura - a.aura);
    
    const container = document.getElementById('leaderboardList');
    container.innerHTML = '';
    
    students.forEach((student, index) => {
        const div = document.createElement('div');
        div.className = `student-item ${index < 3 ? ['gold', 'silver', 'bronze'][index] : ''}`;
        div.innerHTML = `
            <span>${index + 1}</span>
            <div class="student-name" onclick="showStudentDetails('${student.name}')">
                ${student.name}
                ${index < 3 ? ['👑', '🥈', '🥉'][index] : ''}
            </div>
            <span>${student.aura} Aura</span>
            <div class="badges">${student.badges.join(' ')}</div>
        `;
        container.appendChild(div);
    });
}

function showStudentDetails(name) {
    const student = DataService.getStudents().find(s => s.name === name);
    if(!student) return;

    document.getElementById('modalName').textContent = student.name;
    document.getElementById('modalAura').textContent = student.aura;
    document.getElementById('modalRank').textContent = student.rank;
    document.getElementById('modalBadges').innerHTML = student.badges.join(' ');

    // Initialize chart
    const ctx = document.getElementById('auraChart').getContext('2d');
    if(auraChart) auraChart.destroy();
    
    auraChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: student.history.map((_, i) => `Update ${i + 1}`),
            datasets: [{
                label: 'Aura History',
                data: student.history.map(entry => entry.aura),
                borderColor: '#3498db',
                tension: 0.1
            }]
        }
    });

    document.getElementById('studentModal').style.display = 'block';
}

// Event listeners
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('studentModal').style.display = 'none';
});

window.onclick = (e) => {
    if(e.target === document.getElementById('studentModal')) {
        document.getElementById('studentModal').style.display = 'none';
    }
};

// Initial render
renderLeaderboard();