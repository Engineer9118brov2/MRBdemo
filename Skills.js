const chatTab = document.getElementById('chat-tab');
const previewTab = document.getElementById('preview-tab');
const chatContent = document.getElementById('chat-content');
const previewContent = document.getElementById('preview-content');

chatTab.addEventListener('click', function() {
    chatTab.classList.add('bg-white', 'text-blue-600', 'shadow-sm');
    chatTab.classList.remove('text-gray-600');
    previewTab.classList.remove('bg-white', 'text-blue-600', 'shadow-sm');
    previewTab.classList.add('text-gray-600');
    chatContent.classList.remove('hidden');
    previewContent.classList.add('hidden');
});

previewTab.addEventListener('click', function() {
    previewTab.classList.add('bg-white', 'text-blue-600', 'shadow-sm');
    previewTab.classList.remove('text-gray-600');
    chatTab.classList.remove('bg-white', 'text-blue-600', 'shadow-sm');
    chatTab.classList.add('text-gray-600');
    previewContent.classList.remove('hidden');
    chatContent.classList.add('hidden');
});

const historyButton = document.getElementById('history-button');
const historyModal = document.getElementById('version-history-modal');
const closeHistory = document.getElementById('close-history');

historyButton.addEventListener('click', function() {
    historyModal.classList.remove('hidden');
});

closeHistory.addEventListener('click', function() {
    historyModal.classList.add('hidden');
});

const buildSelector = document.getElementById('build-selector');
const buildSelectorModal = document.getElementById('build-selector-modal');
const closeBuildSelector = document.getElementById('close-build-selector');

buildSelector.addEventListener('click', function() {
    buildSelectorModal.classList.remove('hidden');
});

closeBuildSelector.addEventListener('click', function() {
    buildSelectorModal.classList.add('hidden');
});

const runButton = document.getElementById('run-button');
const stopButton = document.getElementById('stop-button');

runButton.addEventListener('click', function() {
    runButton.classList.add('hidden');
    stopButton.classList.remove('hidden');
    setTimeout(() => {
        stopButton.classList.add('hidden');
        runButton.classList.remove('hidden');
    }, 5000);
});

stopButton.addEventListener('click', function() {
    stopButton.classList.add('hidden');
    runButton.classList.remove('hidden');
});

const sendButton = document.getElementById('send-button');
const chatInput = document.getElementById('chat-input');

sendButton.addEventListener('click', function() {
    const message = chatInput.value.trim();
    if (message) {
        console.log('Sending message:', message);
        chatInput.value = '';
    }
});

chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendButton.click();
    }
});

chatInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});