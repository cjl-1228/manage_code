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
    const [card1, card2] = flippedCards;

    if (card1.getAttribute('data-card') === card2.getAttribute('data-card')) {
        // 獲取卡片的內容
        const cardContent = card1.querySelector(".card-back").textContent;


        const drugDescriptions = {
            "海洛因": "海洛因是一種強效的麻醉性鎮痛劑，具有極高的成癮性。",
            "嗎啡": "嗎啡是一種有效的止痛劑，但長期使用可能導致身體依賴。",
            "鴉片": "鴉片是從罌粟植物中提取的樹脂，可用於鎮痛但容易成癮。",
            "古柯鹼": "古柯鹼是一種強效中樞神經興奮劑，濫用可能引發嚴重健康問題。",
            "罌粟": "罌粟是一種植物，提取物可用於製造止痛藥及鴉片類藥物。",
            "古柯": "古柯是南美原生植物，其葉子含有可提煉古柯鹼的成分。",
            "大麻": "大麻是一種含有四氫大麻酚（THC）的植物，具有心理活性。",
            "安非他命": "安非他命是一種中樞神經興奮劑，用於治療多動症和嗜睡症。",
            "搖頭丸": "搖頭丸是一種合成迷幻藥，會產生興奮及輕微的幻覺效果。",
            "依托咪酯": "依托咪酯是一種短效的靜脈麻醉劑，用於誘導麻醉。"
        };

        const drugImages = {
            "海洛因": "asset/海洛因.jfif",
            "嗎啡": "asset/嗎啡.jfif",
            "鴉片": "asset/鴉片.jfif",
            "古柯鹼": "asset/古柯鹼.jfif",
            "罌粟": "asset/罌粟.jfif",
            "古柯": "asset/古柯.jfif",
            "大麻": "asset/大麻.jfif",
            "安非他命": "asset/安非他命.jfif",
            "搖頭丸": "asset/搖頭丸.jfif",
            "依托咪酯": "asset/依托咪酯.jfif"
        };
        

        // 更新 modal 的內容
        document.querySelector("#finalModal .modal-body img").setAttribute("src", `${drugImages[cardContent]}`); // 根據內容設置圖片
        document.querySelector("#finalModal .modal-body p").innerHTML = `你配對成功了：${cardContent}<br>介紹：${drugDescriptions[cardContent]}`; // 設置文字並換行

        matchedPairs++;
        setTimeout(() => {
            $('#finalModal').modal('show'); // 顯示配對成功的 modal
        }, 500);

        if (matchedPairs === 10) {
            // 如果所有配對完成
            setTimeout(() => {
                $('#finalModal').modal('show');
                launchFireworks(); // 啟動煙火效果
            }, 500);
        }

        resetBoard(true);
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

document.addEventListener("DOMContentLoaded", function () {
    const cardsData = [
        { cardId: 1, content: "海洛因" },
        { cardId: 1, content: "海洛因" },
        { cardId: 2, content: "嗎啡" },
        { cardId: 2, content: "嗎啡" },
        { cardId: 3, content: "鴉片" },
        { cardId: 3, content: "鴉片" },
        { cardId: 4, content: "古柯鹼" },
        { cardId: 4, content: "古柯鹼" },
        { cardId: 5, content: "罌粟" },
        { cardId: 5, content: "罌粟" },
        { cardId: 6, content: "古柯" },
        { cardId: 6, content: "古柯" },
        { cardId: 7, content: "大麻" },
        { cardId: 7, content: "大麻" },
        { cardId: 8, content: "安非他命" },
        { cardId: 8, content: "安非他命" },
        { cardId: 9, content: "搖頭丸" },
        { cardId: 9, content: "搖頭丸" },
        { cardId: 10, content: "依托咪酯" },
        { cardId: 10, content: "依托咪酯" }
    ];

    // 使用Fisher-Yates洗牌演算法隨機排列
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // 隨機排列卡片並生成HTML
    function renderCards() {
        const shuffledCards = shuffle(cardsData);
        const cardContainer = document.getElementById("cardContainer");
        cardContainer.innerHTML = "";

        shuffledCards.forEach((cardData) => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");
            cardElement.setAttribute("onclick", "flipCard(this)");
            cardElement.setAttribute("data-card", cardData.cardId);

            cardElement.innerHTML = `
                <div class="card-inner">${cardData.content}
                    <div class="card-front"></div>
                    <div class="card-back">${cardData.content}</div>
                </div>
            `;
            cardContainer.appendChild(cardElement);
        });
    }

    renderCards(); // 呼叫函數以隨機排列並顯示卡片
});



