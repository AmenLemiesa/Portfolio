// Paste all JavaScript from the <script> tag here
// Logo Interaction
const letters = document.querySelectorAll('.letter');
const animationBtn = document.getElementById('animationBtn');
let hasAnimated = false;

// Individual letter click functionality
letters.forEach(letter => {
    letter.addEventListener('click', () => {
        letter.classList.toggle('active');
    });

    letter.addEventListener('mouseenter', () => {
        if (!letter.classList.contains('active')) {
            letter.style.fill = 'rgba(255, 255, 255, 0.2)';
            letter.style.stroke = 'var(--highlight-color)';
        }
    });

    letter.addEventListener('mouseleave', () => {
        if (!letter.classList.contains('active')) {
            letter.style.fill = 'transparent';
            letter.style.stroke = 'var(--stroke-color)';
        }
    });
});

// Animation sequence
function runAnimation() {
    // Clear all first
    letters.forEach(letter => {
        letter.classList.remove('active', 'visible');
    });
    
    // Animate letters one by one from left to right
    const letterOrder = ['A', 'M', 'E', 'N', 'L', 'E1', 'M1', 'I', 'E2', 'S', 'A1'];
    
    letterOrder.forEach((letterId, index) => {
        setTimeout(() => {
            const letter = document.getElementById(letterId);
            if (letter) {
                letter.classList.add('visible', 'active');
            }
        }, index * 200);
    });
    
    // Show animation button after first run
    if (!hasAnimated) {
        setTimeout(() => {
            animationBtn.classList.add('show');
            hasAnimated = true;
        }, letterOrder.length * 200 + 1000);
    }
}

// Animation button click handler
animationBtn.addEventListener('click', () => {
    runAnimation();
    
    // Temporarily disable button during animation
    animationBtn.style.opacity = '0.5';
    animationBtn.disabled = true;
    
    setTimeout(() => {
        animationBtn.style.opacity = '1';
        animationBtn.disabled = false;
    }, 11 * 200 + 500);
});

// Typing Effect Function
function typeWriter(elementId, text, speed = 50) {
    return new Promise((resolve) => {
        const element = document.getElementById(elementId);
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.add('typing-done');
                resolve();
            }
        }
        type();
    });
}

// About Section Typing Animation
let aboutAnimationTriggered = false;

async function triggerAboutAnimation() {
    if (aboutAnimationTriggered) return;
    aboutAnimationTriggered = true;
    
    const lines = [
        { id: 'typing-line-1', typewriterId: 'typewriter-1', text: 'Hello, I\'m' },
        { id: 'typing-line-2', typewriterId: 'typewriter-2', text: 'Amen Lemiesa' },
        { id: 'typing-line-3', typewriterId: 'typewriter-3', text: 'Computer Science Student at the University of Michigan' },
        { id: 'typing-line-4', typewriterId: 'typewriter-4', text: 'Passionate about creating innovative solutions through code. I love exploring new technologies, building meaningful projects, and pushing the boundaries of what\'s possible in the digital world.' },
        { id: 'typing-line-5' },
        { id: 'typing-line-6' },
        { id: 'typing-line-7' }
    ];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const container = document.getElementById(line.id);
        container.classList.add('show');
        
        if (line.text) {
            await typeWriter(line.typewriterId, line.text, line.id === 'typing-line-4' ? 15 : 30);
        }
        
        await new Promise(resolve => setTimeout(resolve, 300));
    }
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionContent = entry.target.querySelector('.section-content');
            sectionContent.classList.add('animate');
            
            // Trigger about section typing animation
            if (entry.target.id === 'about') {
                setTimeout(() => triggerAboutAnimation(), 500);
            }
            
            // Animate project boxes
            if (entry.target.id === 'projects') {
                const projectBoxes = entry.target.querySelectorAll('.project-box');
                projectBoxes.forEach((box, index) => {
                    setTimeout(() => {
                        box.classList.add('animate');
                    }, index * 200);
                });
            }
        }
    });
}, observerOptions);

// Observe all nav sections
document.querySelectorAll('.nav-section').forEach(section => {
    observer.observe(section);
});

// Run initial animation when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        runAnimation();
    }, 500);
}); 