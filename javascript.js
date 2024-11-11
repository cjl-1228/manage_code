let flippedCards = [];
let lockBoard = false;

function flipCard(cardElement) {
    if (lockBoard) return;
    if (cardElement.classList.contains('flipped')) return;

    cardElement.classList.add('flipped');
    flippedCards.push(cardElement);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    lockBoard = true;
    const [card1, card2] = flippedCards;

    if (card1.getAttribute('data-card') === card2.getAttribute('data-card')) {
        setTimeout(() => {
            $('#successModal').modal('show'); // 顯示配對成功的 modal
            resetBoard(true);
        }, 500);
    } else {
        setTimeout(() => {
            alert("配對失敗！");
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
