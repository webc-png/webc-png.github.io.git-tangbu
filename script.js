
function openTab(evt, tabName) {
    
    const tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }
    
    
    const tablinks = document.getElementsByClassName("tab");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    
    
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
    
    
    updateProgressBar();
    
    
    animateOnScroll();
}

function showPopup(title, content) {
    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popup-title");
    const popupContent = document.getElementById("popup-content");
    
    popupTitle.textContent = title;
    popupContent.innerHTML = content;
    popup.style.display = "flex";
    
    const popupContentElement = document.querySelector(".popup-content");
    popupContentElement.classList.add("animate__animated", "animate__zoomIn");
}

function closePopup() {
    const popup = document.getElementById("popup");
    const popupContentElement = document.querySelector(".popup-content");

    popupContentElement.classList.remove("animate__zoomIn");
    popupContentElement.classList.add("animate__zoomOut");

    setTimeout(() => {
        popup.style.display = "none";
        popupContentElement.classList.remove("animate__zoomOut");
    }, 300);
}

function showImagePopup(src, caption) {
    const popup = document.getElementById("imagePopup");
    const img = document.getElementById("popup-image");
    const imgCaption = document.getElementById("popup-image-caption");
    const popupContent = document.querySelector("#imagePopup .popup-content");
    
    img.src = src;
    img.alt = caption;
    imgCaption.textContent = caption;
    popup.style.display = "flex";

    popupContent.classList.add("animate__animated", "animate__zoomIn");
}

function closeImagePopup() {
    const popup = document.getElementById("imagePopup");
    const popupContent = document.querySelector("#imagePopup .popup-content");

    popupContent.classList.remove("animate__zoomIn");
    popupContent.classList.add("animate__zoomOut");

    setTimeout(() => {
        popup.style.display = "none";
        popupContent.classList.remove("animate__zoomOut");
    }, 300);
}

function checkAnswer(element, correctness, correctAnswer) {
    const feedbackId = element.parentElement.parentElement.querySelector(".quiz-feedback").id;
    const feedback = document.getElementById(feedbackId);
    const options = element.parentElement.querySelectorAll(".quiz-option");

    options.forEach(option => {
        option.style.backgroundColor = "";
    });

    element.classList.add("animate__animated", "animate__pulse");
    setTimeout(() => {
        element.classList.remove("animate__animated", "animate__pulse");
    }, 500);

    if (correctness === 'correct') {
        element.style.backgroundColor = "#d4edda";
        feedback.className = "quiz-feedback correct";
        feedback.style.display = "block";
        feedback.classList.add("animate__animated", "animate__fadeIn");
    } else {
        element.style.backgroundColor = "#f8d7da";
        feedback.className = "quiz-feedback incorrect";
        feedback.style.display = "block";
        feedback.classList.add("animate__animated", "animate__fadeIn");

        const correctOption = element.parentElement.querySelector(`[onclick*="correctAnswer=${correctAnswer}"]`);
        if (correctOption) {
            correctOption.style.backgroundColor = "#d4edda";
            correctOption.classList.add("animate__animated", "animate__tada");
            setTimeout(() => {
                correctOption.classList.remove("animate__animated", "animate__tada");
            }, 1000);
        }
    }
}

function showStepDetail(stepName) {
    const stepDetails = {
        '撕裂': '使用撕裂機將每支甘蔗撕裂，依甘蔗的纖維方向撕裂',
        '壓榨': '使用大型壓榨機，每噸甘蔗可榨出約700公斤汁液',
        '清淨': '加入石灰中和酸性，pH值控制在7-8之間',
        '蒸發': '在多效蒸發罐中濃縮至65°Brix糖度',
        '結晶': '在真空罐60°C低溫下結晶，保護糖的品質',
        '分蜜': '每分鐘1200轉的離心機分離糖蜜',
        '乾燥': '熱風乾燥至水分含量低於0.06%'
    };

    const stepIndex = Object.keys(stepDetails).indexOf(stepName);
    if (stepIndex >= 0) {
        const steps = document.querySelectorAll('.process-steps li');
        steps[stepIndex].click();
    }
    
    showPopup(stepName + '小知識', stepDetails[stepName] || '這是製糖的重要步驟！');
}

function setupSugarProcessAnimation() {
    const steps = document.querySelectorAll('.process-steps li');
    const resetBtn = document.getElementById('reset-animation');

    const sugarcane = document.querySelector('.sugarcane');
    const juice = document.querySelector('.juice');
    const syrup = document.querySelector('.syrup');
    const sugarCrystals = document.querySelector('.sugar-crystals');
    const finalSugar = document.querySelector('.final-sugar');

    function resetAnimation() {
        sugarcane.style.display = 'block';
        juice.style.display = 'none';
        syrup.style.display = 'none';
        sugarCrystals.style.display = 'none';
        finalSugar.style.display = 'none';
        steps.forEach(step => step.classList.remove('highlighted'));
        sugarcane.style.animation = '';
        juice.style.animation = '';
        syrup.style.animation = '';
        sugarCrystals.style.animation = '';
    }
    
    resetAnimation();

    resetBtn.addEventListener('click', function() {
        this.classList.add("animate__animated", "animate__pulse");
        setTimeout(() => {
            this.classList.remove("animate__animated", "animate__pulse");
        }, 500);
        resetAnimation();
    });

    steps.forEach((step, index) => {
        step.addEventListener('click', function() {
        steps.forEach(s => s.classList.remove('highlighted'));
            this.classList.add('highlighted');
            
            this.classList.add("animate__animated", "animate__pulse");
            setTimeout(() => {
                this.classList.remove("animate__animated", "animate__pulse");
            }, 500);
            
            switch(index) {
                case 0: // 撕裂
                    animateTearing();
                    break;
                case 1: // 壓榨
                    animatePressing();
                    break;
                case 2: // 清淨
                    animateCleaning();
                    break;
                case 3: // 蒸發
                    animateEvaporating();
                    break;
                case 4: // 結晶
                    animateCrystallizing();
                    break;
                case 5: // 分蜜
                    animateSeparating();
                    break;
                case 6: // 乾燥
                    animateDrying();
                    break;
            }
        });
    });
    
    function animateTearing() {
        sugarcane.style.animation = 'shake 0.5s ease 3';
        setTimeout(() => {
            sugarcane.style.animation = '';
        }, 1500);
    }
    
    function animatePressing() {
        sugarcane.style.display = 'none';
        juice.style.display = 'block';
        juice.style.height = '60px';
        setTimeout(() => {
            juice.style.height = '40px';
        }, 500);
    }
    
    function animateCleaning() {
        juice.style.backgroundColor = '#f8f4a0';
    }
    
    function animateEvaporating() {
        juice.style.display = 'none';
        syrup.style.display = 'block';
        
        syrup.style.animation = 'bubble 1s ease infinite';
    }
    
    function animateCrystallizing() {
        syrup.style.display = 'none';
        sugarCrystals.style.display = 'block';
        sugarCrystals.style.opacity = '1';
        sugarCrystals.style.animation = 'glow 1s ease infinite';
    }
    
    function animateSeparating() {
        sugarCrystals.style.backgroundColor = '#f5f5f5';
    }
    
    function animateDrying() {
        sugarCrystals.style.display = 'none';
        finalSugar.style.display = 'block';
        finalSugar.style.opacity = '1';
    }
}
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate]');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if(elementPosition < screenPosition) {
            const animationClasses = element.getAttribute('data-animate').split(' ');
            element.classList.add(...animationClasses);
        }
    });
}
function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
}
window.onscroll = function() {
    updateProgressBar();
    animateOnScroll();
};

window.onclick = function(event) {
    const popup = document.getElementById("popup");
    const imagePopup = document.getElementById("imagePopup");
    
    if (event.target == popup) {
        closePopup();
    }
    
    if (event.target == imagePopup) {
        closeImagePopup();
    }
};

function init() {
    addAnimationKeyframes();
    setupSugarProcessAnimation();
    animateOnScroll();
    document.querySelector(".tab").classList.add("active");
    document.querySelector(".tab-content").classList.add("active");
    document.querySelectorAll('.expand-image').forEach(img => {
        img.addEventListener('click', function() {
            this.classList.add("animate__animated", "animate__pulse");
            setTimeout(() => {
                this.classList.remove("animate__animated", "animate__pulse");
            }, 500);
        });
    });
}

function addAnimationKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(-50%) rotate(0deg); }
            25% { transform: translateX(-52%) rotate(-5deg); }
            75% { transform: translateX(-48%) rotate(5deg); }
        }
        
        @keyframes bubble {
            0% { box-shadow: 0 0 0 0 rgba(212, 167, 106, 0.4); }
            50% { box-shadow: 0 0 0 10px rgba(212, 167, 106, 0); }
            100% { box-shadow: 0 0 0 0 rgba(212, 167, 106, 0); }
        }
        
        @keyframes glow {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
        }
        
        @keyframes scrollDown {
            0% {
                opacity: 0;
                transform: rotate(45deg) translate(-10px, -10px);
            }
            50% {
                opacity: 1;
            }
            100% {
                opacity: 0;
                transform: rotate(45deg) translate(10px, 10px);
            }
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener("DOMContentLoaded", init);
