const addBuildButton = document.getElementById('add-build-button');

addBuildButton.addEventListener('click', function() {
    localStorage.removeItem('editBuildIndex');
    window.location.href = 'BuildEditor.html';
});

const buildMenuModal = document.getElementById('build-menu-modal');
const closeMenuModal = document.getElementById('close-menu-modal');
let selectedIndex = -1;

closeMenuModal.addEventListener('click', function() {
    buildMenuModal.classList.add('hidden');
});

buildMenuModal.addEventListener('click', function(e) {
    if (e.target === buildMenuModal) {
        buildMenuModal.classList.add('hidden');
    }
});

document.getElementById('edit-build').addEventListener('click', function() {
    if (selectedIndex !== -1) {
        localStorage.setItem('editBuildIndex', selectedIndex);
        window.location.href = 'BuildEditor.html';
    }
    buildMenuModal.classList.add('hidden');
});

document.getElementById('export-json').addEventListener('click', function() {
    if (selectedIndex !== -1) {
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

// Render builds from localStorage on load
function renderBuilds() {
    const buildsList = document.getElementById('builds-list');
    buildsList.innerHTML = '';
    let builds = JSON.parse(localStorage.getItem('builds') || '[]');
    if (builds.length === 0) {
        document.getElementById('empty-state-section').classList.remove('hidden');
    } else {
        document.getElementById('empty-state-section').classList.add('hidden');
    }
    document.getElementById('builds-count').textContent = `${builds.length} Builds`;
    builds.forEach((build, index) => {
        const card = document.createElement('div');
        card.id = `build-card-${index + 1}`;
        card.className = 'bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm active:scale-98 transition-transform cursor-pointer';
        card.innerHTML = `
            <div class="h-40 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
                <img class="w-full h-full object-cover" src="${build.photo}" alt="${build.name}" />
            </div>
            <div class="p-4">
                <div class="flex items-start justify-between mb-2">
                    <div class="flex-1">
                        <h4 class="text-base font-semibold text-gray-900">${build.name}</h4>
                        <p class="text-xs text-gray-500 mt-0.5">Modified just now</p>
                    </div>
                    <button class="text-gray-400 hover:text-gray-600 menu-button" data-index="${index}">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                </div>
                <p class="text-sm text-gray-600 mb-3 line-clamp-2">${build.description}</p>
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center space-x-3">
                        <div class="flex items-center space-x-1">
                            <i class="fa-solid fa-cog text-blue-500 text-xs"></i>
                            <span class="text-xs font-medium text-gray-700">${build.motors} Motors</span>
                        </div>
                        <div class="flex items-center space-x-1">
                            <i class="fa-solid fa-eye text-green-500 text-xs"></i>
                            <span class="text-xs font-medium text-gray-700">${build.sensors} Sensors</span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <button class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                        <i class="fa-solid fa-code mr-1"></i>Create Skill
                    </button>
                    <button class="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-colors edit-button" data-index="${index}">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                </div>
            </div>
        `;
        buildsList.appendChild(card);
        // Add menu listener
        card.querySelector('.menu-button').addEventListener('click', (e) => {
            e.stopPropagation();
            selectedIndex = e.target.closest('.menu-button').dataset.index;
            buildMenuModal.classList.remove('hidden');
        });
        // Add edit button listener
        card.querySelector('.edit-button').addEventListener('click', (e) => {
            e.stopPropagation();
            selectedIndex = e.target.closest('.edit-button').dataset.index;
            localStorage.setItem('editBuildIndex', selectedIndex);
            window.location.href = 'BuildEditor.html';
        });
        // Add click listener for details
        card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                localStorage.setItem('selectedBuildIndex', index);
                window.location.href = 'BuildDetails.html';
            }
        });
    });
}

// Initial render
window.addEventListener('load', renderBuilds);

// Marketplace download buttons
document.querySelectorAll('.download-button').forEach(button => {
    button.addEventListener('click', function() {
        const marketplaceCard = this.closest('[id^="marketplace-build-"]');
        const name = marketplaceCard.querySelector('h4').textContent;
        const description = marketplaceCard.querySelector('p.line-clamp-2').textContent;
        const photo = marketplaceCard.querySelector('img').src;
        const motors = marketplaceCard.querySelector('.text-xs.font-medium.text-gray-700:first-of-type').textContent.split(' ')[0];
        const sensors = marketplaceCard.querySelector('.text-xs.font-medium.text-gray-700:last-of-type').textContent.split(' ')[0];
        // Demo ports for marketplace builds
        const ports = [
            { port: 'A', name: 'Left Wheel', type: 'Large Angular Motor', notes: 'Counter-clockwise = forward' },
            { port: 'B', name: 'Right Wheel', type: 'Large Angular Motor', notes: 'Clockwise = forward' },
            { port: 'C', name: 'Ground Scanner', type: 'Color Sensor', notes: '13mm height optimal' }
        ];
        let builds = JSON.parse(localStorage.getItem('builds') || '[]');
        builds.push({ name, description, photo, motors, sensors, ports });
        localStorage.setItem('builds', JSON.stringify(builds));
        renderBuilds();
        alert('Downloaded and added to My Builds');
    });
});