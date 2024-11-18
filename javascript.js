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
            "合成大麻素": "合成大麻素（Synthetic Cannabinoids）是仿效天然大麻作用的化學合成物，俗稱「K2」或「Spice」，常包裝成香料或草藥形式。可能誘發嚴重的精神錯亂與幻覺，具有高風險副作用。",
            "喵喵": "喵喵（Mephedrone）是一種合成卡西酮類興奮劑，導致強烈欣快感和高度活躍，但長期使用可能引發心臟損害和精神健康問題。",
            "MDPV": "MDPV（Methylenedioxypyrovalerone）是一種合成卡西酮類的強效興奮劑，俗稱「浴鹽」，可導致焦慮、幻覺及暴力行為，成癮性高且危害性大。",
            "搖頭丸": "搖頭丸（MDMA）是一種苯乙胺類致幻興奮劑，帶來情緒高漲與共鳴感，但對中樞神經系統損害嚴重，可能導致認知障礙與情緒失控。",
            "K他命": "K他命（Ketamine）是一種原為醫療麻醉劑，因解離效應被濫用作迷幻藥。長期使用會導致身心損害，並造成嚴重依賴性。",
            "PMA": "PMA（Para-Methoxyamphetamine）是一種屬於強效致幻及興奮劑，毒性高，與MDMA作用類似，但更易引發過量中毒，具有極大致命風險。",
            "GHB": " GHB（Gamma-Hydroxybutyrate）是一種中樞神經抑制劑，常用作迷藥。吸食後可能導致嗜睡、記憶缺失及昏迷，過量會引發呼吸抑制甚至死亡。",
            "FM2": "氟硝西泮（Flunitrazepam）是一種鎮靜催眠藥，俗稱「FM2」，濫用時可導致短暫失憶及意識混亂，常被不法分子用於犯罪。",
            "DMT": "DMT（Dimethyltryptamine）是一種色胺類強效致幻劑，短時間內引發強烈幻覺，但會產生極高的精神風險及不可預測的心理反應。",
            "BZP": "BZP（Benzylpiperazine）是一種哌嗪類合成毒品，具興奮與輕微致幻效果，常見於派對場合，但伴隨心悸、噁心及焦慮等副作用。",
            "依托咪酯": "依托咪酯（Etomidate）是一種一種短效靜脈麻醉劑，主要用於短時間的麻醉誘導，因具有較少的心血管抑制作用而被廣泛應用。雖能迅速引起意識喪失，但濫用可能引發肌肉抽搐、噁心和長期的腎上腺抑制風險。"

        };

        const drugImages = {
            "合成大麻素": "asset/合成大麻素.jpg",
            "喵喵": "asset/喵喵.jpg",
            "MDPV": "asset/MDPV.jpg",
            "搖頭丸": "asset/搖頭丸.jfif",
            "K他命": "asset/K他命.jpg",
            "PMA": "asset/PMA.jpg",
            "GHB": "asset/GHB.jpg",
            "FM2": "asset/FM2.jpg",
            "DMT": "asset/DMT.jpg",
            "BZP": "asset/BZP.jpg",
            "依托咪酯": "asset/依托咪酯.jpg"

        };
        

        // 更新 modal 的內容
        document.querySelector("#finalModal .modal-body img").setAttribute("src", `${drugImages[cardContent]}`); // 根據內容設置圖片
        document.querySelector("#finalModal .modal-body p").innerHTML = `你配對成功了：${cardContent}<br>介紹：${drugDescriptions[cardContent]}`; // 設置文字並換行

        matchedPairs++;
        setTimeout(() => {
            $('#finalModal').modal('show'); // 顯示配對成功的 modal
        }, 500);

        if (matchedPairs === 11) {
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
    if (matchedPairs === 11) { // 如果所有10組都配對成功
        setTimeout(() => {
            $('#finalModal').modal('show'); // 顯示遊戲完成的最終恭喜模態框

            launchFireworks(); // 啟動煙火效果
        }, 500);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const cardsData = [
        { cardId: 1, content: "合成大麻素", url: "asset/2.png"},
        { cardId: 1, content: "合成大麻素", url: "asset/2.png" },
        { cardId: 2, content: "喵喵", url: "asset/3.png" },
        { cardId: 2, content: "喵喵", url: "asset/3.png" },
        { cardId: 3, content: "MDPV", url: "asset/4.png" },
        { cardId: 3, content: "MDPV", url: "asset/4.png" },
        { cardId: 4, content: "搖頭丸", url: "asset/1.png" },
        { cardId: 4, content: "搖頭丸", url: "asset/1.png" },
        { cardId: 5, content: "K他命", url: "asset/5.png" },
        { cardId: 5, content: "K他命", url: "asset/5.png" },
        { cardId: 6, content: "PMA", url: "asset/6.png" },
        { cardId: 6, content: "PMA", url: "asset/6.png" },
        { cardId: 7, content: "GHB", url: "asset/7.png" },
        { cardId: 7, content: "GHB", url: "asset/7.png" },
        { cardId: 8, content: "FM2", url: "asset/8.png" },
        { cardId: 8, content: "FM2", url: "asset/8.png" },
        { cardId: 9, content: "DMT", url: "asset/9.png" },
        { cardId: 9, content: "DMT", url: "asset/9.png" },
        { cardId: 10, content: "BZP", url: "asset/10.png" },
        { cardId: 10, content: "BZP", url: "asset/10.png" },
        { cardId: 11, content: "依托咪酯", url: "asset/11.png" },
        { cardId: 11, content: "依托咪酯", url: "asset/11.png" },
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
                <div class="card-inner">
                    <div class="card-front"></div>
                    <div class="card-back" style="background-image: url('${cardData.url}');">${cardData.content}</div>
                </div>
            `;
            cardContainer.appendChild(cardElement);
        });
    }

    renderCards(); // 呼叫函數以隨機排列並顯示卡片
});






function restartGame() {
    location.reload(); // 重新載入頁面，重置遊戲
}