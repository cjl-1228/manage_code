let flippedCards = [];
let lockBoard = false;
let matchedPairs = 0; // 計數配對成功的卡片組數

function flipCard(cardElement) {
    if (lockBoard) return;  // 防止多次點擊
    if (cardElement.classList.contains('flipped')) return;

    cardElement.classList.add('flipped');
    flippedCards.push(cardElement);

    if (flippedCards.length === 2) {
        lockBoard = true; // 鎖定板面
        checkForMatch();
    }
}

function checkForMatch() {
    lockBroad = true;
    const [card1, card2] = flippedCards;

    if (card1.getAttribute('data-card') === card2.getAttribute('data-card')) {
        matchedPairs++;
        if (matchedPairs === 10) {
            // 如果這是最後一組配對成功，顯示最終恭喜畫面並啟動煙火
            setTimeout(() => {
                $('#finalModal').modal('show'); // 顯示遊戲完成的最終恭喜模態框
                launchFireworks(); // 啟動煙火效果
            }, 500);
        } else {
            // 如果還有未配對完成的組數，顯示配對成功的 modal
            setTimeout(() => {
                $('#finalModal').modal('show'); // 顯示配對成功的 modal
                resetBoard(true);
            }, 500);
        }
    } else {
        // 如果配對不成功，翻回卡片
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            resetBoard(false);
        }, 1000);
    }
}

function resetBoard(isMatch) {
    flippedCards = [];
    lockBoard = false;
}

function launchFireworks() {
    const fireworksContainer = document.createElement('div');
    fireworksContainer.className = 'fireworks';
    document.body.appendChild(fireworksContainer);

    // 每0.5秒產生一次煙火，持續5秒
    const intervalId = setInterval(() => {
        for (let i = 0; i < 50; i++) { // 每次產生50個煙火效果
            createFirework(fireworksContainer);
        }
    }, 500); // 0.5秒產生一次

    // 5秒後停止煙火效果
    setTimeout(() => {
        clearInterval(intervalId); // 停止setInterval
        setTimeout(() => {
            fireworksContainer.remove(); // 移除煙火容器
        }, 1500); // 讓最後一組煙火在1.5秒後淡出
    }, 5000); // 5秒後停止產生新的煙火
}

function createFirework(container) {
    const firework = document.createElement('div');
    firework.className = 'firework';

    // 隨機位置和大小
    firework.style.left = Math.random() * 100 + 'vw';
    firework.style.top = Math.random() * 100 + 'vh';
    firework.style.backgroundColor = getRandomColor();

    // 隨機大小，讓煙火看起來更生動
    const size = Math.random() * 10 + 5; // 隨機尺寸在5-15px之間
    firework.style.width = `${size}px`;
    firework.style.height = `${size}px`;

    container.appendChild(firework);
}

function getRandomColor() {
    const colors = ['#ffcc00', '#ff6699', '#66ccff', '#ff6666', '#99ff99', '#ff33cc', '#ff9966'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// 修改 checkGameComplete 函數，加入煙火效果
function checkGameComplete() {
    if (matchedPairs === 10) { // 如果所有10組都配對成功
        setTimeout(() => {
            $('#finalModal').modal('show'); // 顯示遊戲完成的最終恭喜模態框
            launchFireworks(); // 啟動煙火效果
        }, 500);
    }
}
