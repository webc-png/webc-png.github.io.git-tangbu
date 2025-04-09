// 切換標籤頁
function openTab(evt, tabName) {
    // 隱藏所有標籤內容
    const tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }
    
    // 移除所有標籤按鈕的active類
    const tablinks = document.getElementsByClassName("tab");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    
    // 顯示當前標籤內容並標記按鈕為active
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
    
    // 更新進度條
    updateProgressBar();
}

// 顯示彈出視窗
function showPopup(title, content) {
    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popup-title");
    const popupContent = document.getElementById("popup-content");
    
    popupTitle.textContent = title;
    popupContent.innerHTML = content;
    popup.style.display = "flex";
}

// 關閉彈出視窗
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// 顯示圖片彈出視窗
function showImagePopup(src, caption) {
    const popup = document.getElementById("imagePopup");
    const img = document.getElementById("popup-image");
    const imgCaption = document.getElementById("popup-image-caption");
    
    img.src = src;
    img.alt = caption;
    imgCaption.textContent = caption;
    popup.style.display = "flex";
}

// 關閉圖片彈出視窗
function closeImagePopup() {
    document.getElementById("imagePopup").style.display = "none";
}

// 檢查測驗答案
function checkAnswer(element, correctness, correctAnswer) {
    const feedbackId = element.parentElement.parentElement.querySelector(".quiz-feedback").id;
    const feedback = document.getElementById(feedbackId);
    const options = element.parentElement.querySelectorAll(".quiz-option");
    
    // 移除所有選項的高亮
    options.forEach(option => {
        option.style.backgroundColor = "";
    });
    
    // 高亮所選選項
    if (correctness === 'correct') {
        element.style.backgroundColor = "#d4edda";
        feedback.className = "quiz-feedback correct";
        feedback.style.display = "block";
    } else {
        element.style.backgroundColor = "#f8d7da";
        feedback.className = "quiz-feedback incorrect";
        feedback.style.display = "block";
        
        // 找出正確答案並高亮
        const correctOption = element.parentElement.querySelector(`[onclick*="correctAnswer=${correctAnswer}"]`);
        if (correctOption) {
            correctOption.style.backgroundColor = "#d4edda";
        }
    }
}

// 顯示製糖步驟詳細資訊
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
    
    // 觸發對應步驟的點擊事件
    const stepIndex = Object.keys(stepDetails).indexOf(stepName);
    if (stepIndex >= 0) {
        const steps = document.querySelectorAll('.process-steps li');
        steps[stepIndex].click();
    }
    
    showPopup(stepName + '小知識', stepDetails[stepName] || '這是製糖的重要步驟！');
}

// 製糖流程動畫控制
function setupSugarProcessAnimation() {
    const steps = document.querySelectorAll('.process-steps li');
    const resetBtn = document.getElementById('reset-animation');
    
    // 動畫元素
    const sugarcane = document.querySelector('.sugarcane');
    const juice = document.querySelector('.juice');
    const syrup = document.querySelector('.syrup');
    const sugarCrystals = document.querySelector('.sugar-crystals');
    const finalSugar = document.querySelector('.final-sugar');
    
    // 重置動畫狀態
    function resetAnimation() {
        // 顯示甘蔗，隱藏其他
        sugarcane.style.display = 'block';
        juice.style.display = 'none';
        syrup.style.display = 'none';
        sugarCrystals.style.display = 'none';
        finalSugar.style.display = 'none';
        
        // 重置所有步驟高亮
        steps.forEach(step => step.classList.remove('highlighted'));
    }
    
    // 初始化
    resetAnimation();
    
    // 綁定重置按鈕
    resetBtn.addEventListener('click', resetAnimation);
    
    // 為每個步驟綁定動畫
    steps.forEach((step, index) => {
        step.addEventListener('click', function() {
            // 高亮當前步驟
            steps.forEach(s => s.classList.remove('highlighted'));
            this.classList.add('highlighted');
            
            // 根據步驟播放對應動畫
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
    
    // 各步驟動畫函數
    function animateTearing() {
        // 甘蔗抖動效果
        sugarcane.style.animation = 'shake 0.5s ease 3';
        setTimeout(() => {
            sugarcane.style.animation = '';
        }, 1500);
    }
    
    function animatePressing() {
        // 甘蔗消失，汁液出現
        sugarcane.style.display = 'none';
        juice.style.display = 'block';
        
        // 汁液流動效果
        juice.style.height = '60px';
        setTimeout(() => {
            juice.style.height = '40px';
        }, 500);
    }
    
    function animateCleaning() {
        // 汁液顏色變淺
        juice.style.backgroundColor = '#f8f4a0';
    }
    
    function animateEvaporating() {
        // 汁液變糖漿
        juice.style.display = 'none';
        syrup.style.display = 'block';
        
        // 糖漿冒泡效果
        syrup.style.animation = 'bubble 1s ease infinite';
    }
    
    function animateCrystallizing() {
        // 糖漿變糖晶
        syrup.style.display = 'none';
        sugarCrystals.style.display = 'block';
        sugarCrystals.style.opacity = '1';
        
        // 結晶閃爍效果
        sugarCrystals.style.animation = 'glow 1s ease infinite';
    }
    
    function animateSeparating() {
        // 糖晶變白
        sugarCrystals.style.backgroundColor = '#f5f5f5';
    }
    
    function animateDrying() {
        // 最終砂糖出現
        sugarCrystals.style.display = 'none';
        finalSugar.style.display = 'block';
        finalSugar.style.opacity = '1';
    }
}

// 添加動畫關鍵幀
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
    `;
    document.head.appendChild(style);
}

// 初始化時調用
document.addEventListener("DOMContentLoaded", function() {
    addAnimationKeyframes();
    setupSugarProcessAnimation();
});

// 更新閱讀進度條
function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
}

// 滾動時更新進度條
window.onscroll = function() {
    updateProgressBar();
};

// 點擊彈出視窗外部關閉視窗
window.onclick = function(event) {
    const popup = document.getElementById("popup");
    const imagePopup = document.getElementById("imagePopup");
    
    if (event.target == popup) {
        popup.style.display = "none";
    }
    
    if (event.target == imagePopup) {
        imagePopup.style.display = "none";
    }
};

// 初始化第一個標籤頁為active
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".tab").classList.add("active");
    document.querySelector(".tab-content").classList.add("active");
});
