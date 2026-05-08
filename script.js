// Page Management
const pages = {
    landing: document.getElementById('landing-page'),
    questions: document.getElementById('questions-page'),
    analysis: document.getElementById('analysis-page'),
    facts: document.getElementById('facts-page'),
    certificate: document.getElementById('certificate-page'),
    final: document.getElementById('final-page')
};

let currentPage = 'landing';
let noClickCount = 0;
let currentQuestion = 0;
let factIndex = 0;

// Navigation
function showPage(pageName) {
    Object.values(pages).forEach(page => page.classList.remove('active'));
    pages[pageName].classList.add('active');
    currentPage = pageName;
}

// Landing Page Logic
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const landingMessage = document.getElementById('landing-message');

yesBtn.addEventListener('click', () => {
    landingMessage.textContent = "Good. At least you remembered.";
    landingMessage.style.opacity = '1';
    setTimeout(() => {
        showPage('questions');
        startQuestions();
    }, 2000);
});

noBtn.addEventListener('click', () => {
    noClickCount++;
    handleNoClick();
});

function handleNoClick() {
    const messages = [
        "Wrong answer.",
        "Try again, birthday criminal.",
        "Fine… maybe it IS my birthday"
    ];
    
    if (noClickCount === 1) {
        // Move button away
        noBtn.classList.add('moving');
        const randomX = Math.random() * 200 - 100;
        const randomY = Math.random() * 100 - 50;
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
        landingMessage.textContent = messages[0];
        landingMessage.style.opacity = '1';
    } else if (noClickCount === 2) {
        // Shrink button
        noBtn.style.transform = 'scale(0.8)';
        landingMessage.textContent = messages[1];
        landingMessage.style.opacity = '1';
    } else if (noClickCount === 3) {
        // Change button text and allow progression
        noBtn.textContent = messages[2];
        noBtn.addEventListener('click', () => {
            showPage('questions');
            startQuestions();
        }, { once: true });
    }
}

// Questions Page Logic
const questions = [
    {
        question: "Ready to get old?",
        options: ["Absolutely", "Already feeling old"],
        responses: {
            "Absolutely": "Confidence level suspiciously high.",
            "Already feeling old": "Back pain DLC unlocked."
        }
    },
    {
        question: "Do you deserve cake?",
        options: ["Yes", "Definitely yes"],
        responses: {
            "Yes": "Correct answer detected.",
            "Definitely yes": "Correct answer detected."
        }
    },
    {
        question: "Will you share cake with me?",
        options: ["Yes 🍰", "No 😈"],
        responses: {
            "Yes 🍰": "Rare species: generous birthday human.",
            "No 😈": "Friendship has been downgraded."
        }
    }
];

function startQuestions() {
    currentQuestion = 0;
    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= questions.length) {
        setTimeout(() => showPage('analysis'), 1500);
        startAnalysis();
        return;
    }
    
    const question = questions[currentQuestion];
    const questionText = document.getElementById('question-text');
    const questionButtons = document.getElementById('question-buttons');
    const questionResponse = document.getElementById('question-response');
    
    questionText.textContent = question.question;
    questionButtons.innerHTML = '';
    questionResponse.textContent = '';
    questionResponse.style.opacity = '0';
    
    question.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.textContent = option;
        btn.addEventListener('click', () => {
            questionResponse.textContent = question.responses[option];
            questionResponse.style.opacity = '1';
            currentQuestion++;
            setTimeout(() => showQuestion(), 2000);
        });
        questionButtons.appendChild(btn);
    });
}

// Bonus Button
document.getElementById('bonus-btn').addEventListener('click', () => {
    alert("I knew you wouldn't listen.");
    createConfetti();
});

// Analysis Page Logic
const loadingMessages = [
    "Checking drama levels...",
    "Calculating cake capacity...",
    "Scanning emotional damage...",
    "Too much chaos detected...",
    "Detecting snack addiction...",
    "Searching for maturity… not found.",
    "Generating birthday magic...",
    "Loading main character energy..."
];

function startAnalysis() {
    const progressBar = document.getElementById('progress-bar');
    const loadingMessage = document.getElementById('loading-message');
    let progress = 0;
    let messageIndex = 0;
    let lastMessageChange = 0;
    
    // Set initial message
    loadingMessage.textContent = loadingMessages[0];
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            setTimeout(() => {
                showPage('facts');
                showFact();
            }, 1500);
        }
        progressBar.style.width = progress + '%';
        
        // Change message every 2-3 seconds for better readability
        if (progress - lastMessageChange >= 20) {
            messageIndex++;
            loadingMessage.textContent = loadingMessages[messageIndex % loadingMessages.length];
            lastMessageChange = progress;
        }
    }, 500);
    
    // Add click interaction
    document.getElementById('analysis-page').addEventListener('click', function handleClick() {
        alert("Patience. This is advanced birthday science.");
        this.removeEventListener('click', handleClick);
    }, { once: true });
}

// Facts Page Logic
const facts = [
    "Cake calories don't count today.",
    "You are now 1 year closer to becoming unc status.",
    "Scientifically proven: birthday people become dramatic.",
    "Your gift expectations are unrealistically high.",
    "Today you can legally ignore responsibilities.",
    "Birthday magic makes you 10% more awesome.",
    "Your age is now just a number, a bigger number.",
    "You've earned the right to be extra today.",
    "Birthday physics: time moves faster when having fun.",
    "Congrats on completing another lap around the sun."
];

function showFact() {
    const factText = document.getElementById('fact-text');
    factText.textContent = facts[factIndex % facts.length];
    factIndex++;
}

document.getElementById('next-fact-btn').addEventListener('click', () => {
    if (factIndex >= facts.length + 2) {
        showPage('certificate');
    } else {
        showFact();
    }
});

// Certificate Page Logic
document.getElementById('accept-honor-btn').addEventListener('click', () => {
    console.log('Accept Honor button clicked');
    const stamp = document.getElementById('approval-stamp');
    stamp.classList.add('show');
    // Create mini confetti burst
    createMiniConfetti();
    setTimeout(() => {
        showPage('final');
        startFinalReveal();
    }, 2000);
});

// Final Page Logic
function startFinalReveal() {
    createConfetti();
    createFloatingBalloons();
    createFireworks();
    addParticlesToAnalysis();
}

document.getElementById('claim-cake-btn').addEventListener('click', () => {
    const errorPopup = document.getElementById('error-popup');
    errorPopup.classList.add('show');
    setTimeout(() => {
        errorPopup.classList.remove('show');
    }, 5000);
});

// Emergency Birthday Button
document.getElementById('emergency-btn').addEventListener('click', () => {
    // Maximum birthday chaos mode
    document.body.style.animation = 'rainbow-flash 0.5s infinite';
    createRainbowConfetti();
    showEmergencyMessage();
    
    // Play chaos sound effect (if needed)
    const audio = new Audio();
    audio.volume = 0.3;
    // Add sound effect here if needed
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 3000);
});

// Animation Functions
function createConfetti() {
    const container = document.querySelector('.confetti-container');
    if (!container) return;
    
    const colors = ['#FFB6C1', '#87CEEB', '#98FB98', '#FFD700', '#FF69B4', '#DDA0DD'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            container.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
}

function createMiniConfetti() {
    const container = document.querySelector('.certificate');
    if (!container) return;
    
    const colors = ['#FFD700', '#FFA500', '#FF69B4'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.position = 'absolute';
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animation = 'mini-confetti-burst 1s ease-out forwards';
        container.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 1000);
    }
}

function createRainbowConfetti() {
    const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
    
    for (let i = 0; i < 200; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 15 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.animationDuration = (Math.random() * 2 + 1) + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

function createFireworks() {
    const colors = ['#FF69B4', '#00CED1', '#FFD700', '#FF6347', '#9370DB'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight / 2;
            
            for (let j = 0; j < 20; j++) {
                const particle = document.createElement('div');
                particle.className = 'firework';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                particle.style.setProperty('--x', (Math.random() - 0.5) * 200 + 'px');
                particle.style.setProperty('--y', (Math.random() - 0.5) * 200 + 'px');
                document.body.appendChild(particle);
                
                setTimeout(() => particle.remove(), 1000);
            }
        }, i * 800);
    }
}

function addParticlesToAnalysis() {
    const analysisPage = document.getElementById('analysis-page');
    if (!analysisPage) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        analysisPage.appendChild(particle);
    }
}

function showEmergencyMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #FF1493, #FF69B4, #FFD700);
        color: white;
        padding: 2rem;
        border-radius: 20px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10000;
        animation: emergency-bounce 0.5s ease;
        text-align: center;
        box-shadow: 0 10px 30px rgba(255, 0, 0, 0.5);
    `;
    message.textContent = 'You unlocked maximum birthday energy! 🎉🎂🎊';
    document.body.appendChild(message);
    
    setTimeout(() => message.remove(), 3000);
}

function createFloatingBalloons() {
    const body = document.body;
    const balloonEmojis = ['🎈', '🎉', '🎊', '⭐', '✨'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const balloon = document.createElement('div');
            balloon.className = 'float balloon';
            balloon.textContent = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
            balloon.style.position = 'fixed';
            balloon.style.left = Math.random() * 100 + '%';
            balloon.style.bottom = '-50px';
            balloon.style.fontSize = (Math.random() * 20 + 20) + 'px';
            balloon.style.animation = `float-up ${Math.random() * 3 + 4}s ease-out forwards`;
            body.appendChild(balloon);
            
            setTimeout(() => balloon.remove(), 7000);
        }, i * 200);
    }
}

// Add floating up animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float-up {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Music functionality
let musicStarted = false;
let isMuted = false;

const backgroundMusic = document.getElementById('background-music');
const muteBtn = document.getElementById('mute-btn');

function startMusic() {
    if (!musicStarted) {
        backgroundMusic.volume = 0.7; // Higher volume for better audibility
        backgroundMusic.play().then(() => {
            console.log('Music started successfully');
        }).catch(e => {
            console.log('Music autoplay prevented:', e);
            // Try to play music on user interaction
            document.addEventListener('click', function playMusic() {
                backgroundMusic.play().then(() => {
                    console.log('Music started on user interaction');
                });
            }, { once: true });
        });
        musicStarted = true;
    }
}

// Force play music function for testing
function forcePlayMusic() {
    backgroundMusic.volume = 0.7;
    backgroundMusic.play().then(() => {
        console.log('Music force played successfully');
    }).catch(e => {
        console.log('Force play failed:', e);
    });
}

function toggleMute() {
    if (isMuted) {
        backgroundMusic.volume = 0.7;
        muteBtn.textContent = '🔊';
        muteBtn.classList.remove('muted');
        isMuted = false;
    } else {
        backgroundMusic.volume = 0;
        muteBtn.textContent = '🔇';
        muteBtn.classList.add('muted');
        isMuted = true;
    }
}

muteBtn.addEventListener('click', toggleMute);

// Test music button
document.getElementById('test-music-btn').addEventListener('click', forcePlayMusic);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showPage('landing');
    
    // Test if audio file loads
    backgroundMusic.addEventListener('canplaythrough', () => {
        console.log('Music file loaded successfully');
    });
    
    backgroundMusic.addEventListener('error', (e) => {
        console.log('Music file error:', e);
        console.log('Check if music/glue-song.mp3 exists');
    });
    
    // Add click listener to start music on first interaction
    document.body.addEventListener('click', function startMusicOnce() {
        startMusic();
        document.body.removeEventListener('click', startMusicOnce);
    }, { once: true });
});

// Prevent context menu on long press (mobile)
document.addEventListener('contextmenu', e => e.preventDefault());
