const startButton = document.getElementById('start-robot-button');
const pauseButton = document.getElementById('pause-button');
const emergencyButton = document.getElementById('emergency-stop-button');
const confirmationModal = document.getElementById('confirmation-modal');
const activityLogModal = document.getElementById('activity-log-modal');
const templatesModal = document.getElementById('templates-modal');

startButton.addEventListener('click', function() {
    confirmationModal.classList.remove('hidden');
});

document.getElementById('cancel-start').addEventListener('click', function() {
    confirmationModal.classList.add('hidden');
});

document.getElementById('confirm-start').addEventListener('click', function() {
    confirmationModal.classList.add('hidden');
    startRobot();
});

function startRobot() {
    const statusCard = document.querySelector('#robot-status-card');
    const statusDot = statusCard.querySelector('.w-2.h-2');
    const statusText = statusCard.querySelector('.text-sm.font-medium');
    
    statusDot.className = 'w-2 h-2 bg-green-500 rounded-full';
    statusText.textContent = 'Running';
    statusText.className = 'text-sm font-medium text-green-600';
    
    startButton.textContent = 'Robot Active';
    startButton.className = 'w-full bg-gray-400 text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-2 cursor-not-allowed';
    startButton.disabled = true;
    
    pauseButton.disabled = false;
    pauseButton.className = 'bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors';
}

emergencyButton.addEventListener('click', function() {
    const statusCard = document.querySelector('#robot-status-card');
    const statusDot = statusCard.querySelector('.w-2.h-2');
    const statusText = statusCard.querySelector('.text-sm.font-medium');
    
    statusDot.className = 'w-2 h-2 bg-red-500 rounded-full';
    statusText.textContent = 'Stopped';
    statusText.className = 'text-sm font-medium text-red-600';
    
    startButton.innerHTML = '<i class="fa-solid fa-play"></i><span>Start Robot</span>';
    startButton.className = 'w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-sm active:scale-98';
    startButton.disabled = false;
    
    pauseButton.disabled = true;
    pauseButton.className = 'bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors opacity-50 cursor-not-allowed';
});

document.getElementById('activity-log-button').addEventListener('click', function() {
    activityLogModal.classList.remove('hidden');
});

document.getElementById('close-activity-log').addEventListener('click', function() {
    activityLogModal.classList.add('hidden');
});

document.getElementById('templates-button').addEventListener('click', function() {
    templatesModal.classList.remove('hidden');
});

document.getElementById('close-templates').addEventListener('click', function() {
    templatesModal.classList.add('hidden');
});

const templateCards = document.querySelectorAll('[data-template]');
const systemInstructions = document.getElementById('system-instructions');

templateCards.forEach(card => {
    card.addEventListener('click', function() {
        const template = this.dataset.template;
        let instruction = '';
        
        switch(template) {
            case 'explorer':
                instruction = 'You are an autonomous explorer robot. Your goal is to safely navigate and document the environment. Rules: Use distance sensor to avoid obstacles, call avoid_obstacle Skill if object <200mm, respond to voice commands...';
                break;
            case 'assistant':
                instruction = 'You are a helpful voice-controlled robot assistant. Follow all voice commands precisely. Always confirm before executing potentially dangerous actions. Be polite and clear in your responses.';
                break;
            case 'line-follower':
                instruction = 'You are a precise line-following robot. Rules: Call line_follower Skill using color sensor, follow black line at speed 150-200 deg/s, stop immediately if red color detected, handle curves smoothly.';
                break;
            case 'sumo':
                instruction = 'You are a competitive sumo robot. Your goal is to push opponents out of the ring. Rules: Stay within white boundary (color sensor), use force sensor to detect contact, call push_forward Skill on contact.';
                break;
        }
        
        systemInstructions.value = instruction;
        templatesModal.classList.add('hidden');
    });
});

// Character counter for system instructions
systemInstructions.addEventListener('input', function() {
    const charCount = this.value.length;
    const counter = document.querySelector('#system-instructions-section .text-xs.text-gray-500 span');
    if (counter) {
        counter.textContent = `Character count: ${charCount}/1000`;
    }
});

// Modal backdrop clicks
activityLogModal.addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.add('hidden');
    }
});

templatesModal.addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.add('hidden');
    }
});

confirmationModal.addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.add('hidden');
    }
});