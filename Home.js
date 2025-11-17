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

portCards.forEach(card => {
    card.addEventListener('click', function() {
        if (!this.classList.contains('border-dashed')) {
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
    console.log('Navigating to Builds screen...');
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

// Footer navigation
document.querySelector('footer button:nth-child(2)').addEventListener('click', () => {
    window.location.href = 'Builds.html';
});
document.querySelector('footer button:nth-child(3)').addEventListener('click', () => {
    window.location.href = 'Skills.html';
});
document.querySelector('footer button:nth-child(4)').addEventListener('click', () => {
    window.location.href = 'Robot.html';
});