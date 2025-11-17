document.getElementById('scan-button').addEventListener('click', function() {
    const icon = this.querySelector('i');
    icon.classList.add('fa-spin');
    setTimeout(() => {
        icon.classList.remove('fa-spin');
    }, 2000);
});

const portCards = document.querySelectorAll('[id$="-card"]');
const testModal = document.getElementById('device-test-modal');
const closeTestModal = document.getElementById('close-test-modal');
const visualContent = document.getElementById('visual-content');
const consoleContent = document.getElementById('console-content');

portCards.forEach(card => {
    card.addEventListener('click', function() {
        if (!this.classList.contains('border-dashed')) {
            const port = this.id.charAt(5).toUpperCase();
            const type = this.querySelector('p.text-sm.font-semibold').textContent;
            const customName = this.querySelector('p.text-xs.font-medium').textContent;
            document.getElementById('test-modal-subtitle').textContent = `Port ${port} - ${type}`;
            
            let visualHTML = '';
            let consoleHTML = '';
            
            if (type.includes('Motor')) {
                const speed = this.querySelectorAll('.font-medium')[0].textContent.replace('%', '% deg/s');
                const position = this.querySelectorAll('.font-medium')[1].textContent;
                visualHTML = `
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-700">Direction</span>
                        <div class="flex items-center space-x-2">
                            <i class="fa-solid fa-arrow-rotate-right text-blue-500 text-xl"></i>
                            <span class="text-sm font-semibold text-gray-900">Clockwise</span>
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center justify-between mb-1">
                            <span class="text-sm font-medium text-gray-700">Speed</span>
                            <span class="text-sm font-semibold text-gray-900">${speed}</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-blue-500 h-2 rounded-full" style="width: ${speed.replace(' deg/s', '')};"></div>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-700">Position</span>
                        <span class="text-sm font-semibold text-gray-900">${position}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-700">Status</span>
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            <div class="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                            Running
                        </span>
                    </div>
                `;
                consoleHTML = `
                    <div>>>> Testing Motor ${port}...</div>
                    <div>>>> Speed: ${speed.replace('%', '% deg/s')}</div>
                    <div>>>> Position: ${position}</div>
                    <div>>>> Direction: Clockwise</div>
                    <div>>>> Status: Running</div>
                `;
            } else if (type === 'Color Sensor') {
                const color = this.querySelectorAll('.font-medium')[0].textContent;
                const ambient = this.querySelectorAll('.font-medium')[1].textContent;
                visualHTML = `
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-700">Color</span>
                        <span class="text-sm font-semibold text-gray-900">${color}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-700">Ambient</span>
                        <span class="text-sm font-semibold text-gray-900">${ambient}</span>
                    </div>
                `;
                consoleHTML = `
                    <div>>>> Testing Color Sensor...</div>
                    <div>>>> Color: ${color}</div>
                    <div>>>> Ambient: ${ambient}</div>
                `;
            } else if (type === 'Distance Sensor') {
                const distance = this.querySelectorAll('.font-medium')[0].textContent;
                const range = this.querySelectorAll('.font-medium')[1].textContent;
                visualHTML = `
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-700">Distance</span>
                        <span class="text-sm font-semibold text-gray-900">${distance}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-700">Range</span>
                        <span class="text-sm font-semibold text-gray-900">${range}</span>
                    </div>
                `;
                consoleHTML = `
                    <div>>>> Testing Distance Sensor...</div>
                    <div>>>> Distance: ${distance}</div>
                    <div>>>> Range: ${range}</div>
                `;
            }

            visualContent.innerHTML = visualHTML;
            consoleContent.innerHTML = consoleHTML;
            testModal.classList.remove('hidden');
        }
    });
});

closeTestModal.addEventListener('click', function() {
    testModal.classList.add('hidden');
});

testModal.addEventListener('click', function(e) {
    if (e.target === testModal) {
        testModal.classList.add('hidden');
    }
});

const logsButton = document.getElementById('logs-button');
const logsModal = document.getElementById('logs-modal');
const closeLogsButton = document.getElementById('close-logs');

logsButton.addEventListener('click', function() {
    logsModal.classList.remove('hidden');
});

closeLogsButton.addEventListener('click', function() {
    logsModal.classList.add('hidden');
});

logsModal.addEventListener('click', function(e) {
    if (e.target === logsModal) {
        logsModal.classList.add('hidden');
    }
});

document.getElementById('export-logs-button').addEventListener('click', function() {
    console.log('Exporting logs...');
});

document.getElementById('save-build-button').addEventListener('click', function() {
    const ports = [];
    portCards.forEach(card => {
        if (!card.classList.contains('border-dashed')) {
            const portLetter = card.id.charAt(5).toUpperCase();
            const type = card.querySelector('p.text-sm.font-semibold').textContent;
            const name = card.querySelector('p.text-xs.font-medium').textContent;
            let notes = '';
            if (portLetter === 'A') notes = 'Counter-clockwise = forward';
            if (portLetter === 'B') notes = 'Clockwise = forward';
            if (portLetter === 'C') notes = 'Positioned 2cm above ground for line detection';
            if (portLetter === 'D') notes = '';
            ports.push({ port: portLetter, name, type, notes });
        }
    });
    const prepopulate = {
        name: 'New Build from Home',
        description: '',
        photo: '',
        ports
    };
    localStorage.setItem('prepopulateBuild', JSON.stringify(prepopulate));
    window.location.href = 'BuildEditor.html';
});

document.getElementById('test-all-button').addEventListener('click', function() {
    console.log('Testing all devices...');
});

document.getElementById('toggle-console').addEventListener('click', function() {
    const consoleContent = document.getElementById('console-content');
    const icon = this.querySelector('i');
    consoleContent.classList.toggle('hidden');
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
});