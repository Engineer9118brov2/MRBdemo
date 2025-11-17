let selectedIndex = localStorage.getItem('selectedBuildIndex');
const buildMenuModal = document.getElementById('build-menu-modal');
const closeMenuModal = document.getElementById('close-menu-modal');

closeMenuModal.addEventListener('click', function() {
    buildMenuModal.classList.add('hidden');
});

buildMenuModal.addEventListener('click', function(e) {
    if (e.target === buildMenuModal) {
        buildMenuModal.classList.add('hidden');
    }
});

document.querySelector('.menu-button').addEventListener('click', (e) => {
    e.stopPropagation();
    buildMenuModal.classList.remove('hidden');
});

document.getElementById('edit-build').addEventListener('click', function() {
    if (selectedIndex !== null) {
        localStorage.setItem('editBuildIndex', selectedIndex);
        window.location.href = 'BuildEditor.html';
    }
    buildMenuModal.classList.add('hidden');
});

document.getElementById('export-json').addEventListener('click', function() {
    if (selectedIndex !== null) {
        let builds = JSON.parse(localStorage.getItem('builds') || '[]');
        const build = builds[selectedIndex];
        const json = JSON.stringify(build, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${build.name}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
    buildMenuModal.classList.add('hidden');
});

// Open in Pybricks
document.getElementById('open-pybricks').addEventListener('click', function() {
    window.location.href = 'Skills.html';
});

// Test Build
document.getElementById('test-build').addEventListener('click', function() {
    alert('Testing build... (demo)');
});

// Render selected build details from localStorage on load
window.addEventListener('load', function() {
    if (selectedIndex !== null) {
        let builds = JSON.parse(localStorage.getItem('builds') || '[]');
        const selectedBuild = builds[selectedIndex];
        if (selectedBuild) {
            document.getElementById('build-name').textContent = selectedBuild.name;
            document.getElementById('build-description').textContent = selectedBuild.description;
            document.getElementById('build-photo').src = selectedBuild.photo;
            document.getElementById('build-summary').textContent = `${selectedBuild.motors} Motors, ${selectedBuild.sensors} Sensors`;
            const portsList = document.getElementById('ports-list');
            portsList.innerHTML = '';
            selectedBuild.ports.forEach(port => {
                const card = document.createElement('div');
                card.className = 'bg-white rounded-xl border border-gray-200 p-4';
                card.innerHTML = `
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-bold text-gray-900">Port ${port.port}</span>
                        <span class="text-xs text-gray-500">${port.type}</span>
                    </div>
                    <p class="text-sm font-medium text-gray-900 mb-1">${port.name}</p>
                    <p class="text-xs text-gray-600">${port.notes}</p>
                `;
                portsList.appendChild(card);
            });
        }
    }
});