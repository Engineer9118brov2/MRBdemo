document.getElementById('manual-add-btn').addEventListener('click', function() {
    document.getElementById('bottom-sheet').classList.remove('hidden');
});

document.getElementById('close-sheet-btn').addEventListener('click', function() {
    document.getElementById('bottom-sheet').classList.add('hidden');
});

document.getElementById('auto-detect-btn').addEventListener('click', function() {
    const btn = document.getElementById('auto-detect-btn');
    const statusMsg = document.getElementById('status-message');

    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-lg"></i><span class="font-semibold">Detecting...</span>';
    btn.classList.add('opacity-70');

    setTimeout(function() {
        btn.innerHTML = '<i class="fa-solid fa-check text-lg"></i><span class="font-semibold">Devices Detected</span>';
        btn.classList.remove('opacity-70');
        btn.classList.add('bg-green-500');

        statusMsg.classList.remove('bg-blue-50', 'border-blue-200');
        statusMsg.classList.add('bg-green-50', 'border-green-200');
        statusMsg.querySelector('i').classList.remove('text-blue-500');
        statusMsg.querySelector('i').classList.add('text-green-500');
        statusMsg.querySelector('p').classList.remove('text-blue-700');
        statusMsg.querySelector('p').classList.add('text-green-700');
        statusMsg.querySelector('p').textContent = 'Successfully detected 3 devices connected to your hub';

        setTimeout(function() {
            btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles text-lg"></i><span class="font-semibold">Auto-Detect Devices</span>';
            btn.classList.remove('bg-green-500');
            btn.classList.add('bg-primary');
        }, 2000);
    }, 1500);
});

// Back button navigates to Builds.html
document.getElementById('back-button').addEventListener('click', function() {
    window.location.href = 'Builds.html';
});

// Save button saves (new or edit) to localStorage and navigates to Builds.html
document.getElementById('save-build').addEventListener('click', function() {
    const name = document.getElementById('build-name').value;
    const description = document.getElementById('build-description').value;
    // For demo, assume photos are hardcoded or use existing; in real, handle upload
    const photo = document.getElementById('photo-1').src || '';
    const motors = document.querySelectorAll('#device-cards [id^="device-card-"]').length; // Demo count
    const sensors = motors; // Demo
    const ports = [];
    document.querySelectorAll('#device-cards [id^="device-card-"]').forEach(card => {
        const port = card.querySelector('.text-blue-600, .text-green-600, .text-purple-600').textContent; // Extract port
        const name = card.querySelector('input').value;
        const type = card.querySelector('.text-xs.text-gray-500').textContent;
        const notes = card.querySelector('input[value*="="]').value; // Demo notes
        ports.push({ port, name, type, notes });
    });
    let builds = JSON.parse(localStorage.getItem('builds') || '[]');
    const editIndex = localStorage.getItem('editBuildIndex');
    if (editIndex !== null) {
        builds[editIndex] = { name, description, photo, motors, sensors, ports };
    } else {
        builds.push({ name, description, photo, motors, sensors, ports });
    }
    localStorage.setItem('builds', JSON.stringify(builds));
    localStorage.removeItem('editBuildIndex');
    window.location.href = 'Builds.html';
});

// Load for edit mode if applicable
window.addEventListener('load', function() {
    const editIndex = localStorage.getItem('editBuildIndex');
    if (editIndex !== null) {
        let builds = JSON.parse(localStorage.getItem('builds') || '[]');
        const build = builds[editIndex];
        if (build) {
            document.getElementById('build-name').value = build.name;
            document.getElementById('build-description').value = build.description;
            if (build.photo) document.getElementById('photo-1').src = build.photo;
            const deviceCards = document.getElementById('device-cards');
            deviceCards.innerHTML = '';
            build.ports.forEach((port, index) => {
                const card = document.createElement('div');
                card.id = `device-card-${index + 1}`;
                card.className = 'bg-white rounded-xl border border-gray-200 overflow-hidden';
                card.innerHTML = `
                    <div class="p-4">
                        <div class="flex items-start justify-between mb-3">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <span class="text-blue-600 font-bold text-sm">${port.port}</span>
                                </div>
                                <div>
                                    <input type="text" value="${port.name}" class="text-sm font-semibold text-gray-900 bg-transparent w-full border-b border-transparent focus:border-gray-300 focus:outline-none">
                                    <p class="text-xs text-gray-500">${port.type}</p>
                                </div>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-plug text-gray-400 text-xs w-4"></i>
                                <span class="text-xs text-gray-600">Port ${port.port}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-microchip text-gray-400 text-xs w-4"></i>
                                <span class="text-xs text-gray-600">${port.type}</span>
                            </div>
                        </div>
                        <div class="mt-3 pt-3 border-t border-gray-100">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-circle-info text-amber-500 text-xs mt-0.5"></i>
                                <input type="text" value="${port.notes}" class="text-xs text-gray-600 leading-relaxed bg-transparent w-full border-b border-transparent focus:border-gray-300 focus:outline-none">
                            </div>
                        </div>
                    </div>
                `;
                deviceCards.appendChild(card);
            });
        }
    } else {
        // New mode defaults
        document.getElementById('build-name').value = '';
        document.getElementById('build-description').value = '';
    }
});