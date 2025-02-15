'use strict';

const numPairs = 13;
let isGameStarted = false;
let isPaused = true; // ゲームが一時停止されているかどうかを示すフラグ

const imageUrls = [
    './トランプデータ/s01.png', './トランプデータ/s02.png', './トランプデータ/s03.png',
    './トランプデータ/s04.png', './トランプデータ/s05.png', './トランプデータ/s06.png',
    './トランプデータ/s07.png', './トランプデータ/s08.png', './トランプデータ/s09.png',
    './トランプデータ/s10.png', './トランプデータ/s11.png', './トランプデータ/s12.png',
    './トランプデータ/s13.png',
].concat([
    './トランプデータ/s01.png', './トランプデータ/s02.png', './トランプデータ/s03.png',
    './トランプデータ/s04.png', './トランプデータ/s05.png', './トランプデータ/s06.png',
    './トランプデータ/s07.png', './トランプデータ/s08.png', './トランプデータ/s09.png',
    './トランプデータ/s10.png', './トランプデータ/s11.png', './トランプデータ/s12.png',
    './トランプデータ/s13.png',

]);

const gameBoard = document.getElementById('gameBoard');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let pairsFound = 0;

function generateBoard() {
    gameBoard.innerHTML = '';
    imageUrls.sort(() => Math.random() - 0.5);

    imageUrls.forEach((url, index) => {
        if (index % 9 === 0) {
            const row = document.createElement('div');
            row.classList.add('row');
            gameBoard.appendChild(row);
        };

        const card = document.createElement('div');
        card.classList.add('card', 'hidden');
        card.dataset.url = url;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);

        const currentRow = gameBoard.lastElementChild;
        currentRow.appendChild(card);
    });
};

function flipCard() {
    if (lockBoard || isPaused || this === firstCard) return; // 一時停止中はカードをめくれないようにする
    this.classList.remove('hidden');
    this.style.backgroundImage = `url(${this.dataset.url})`;

    if (!firstCard) {
        firstCard = this;
        return;
    };

    secondCard = this;
    lockBoard = true;

    if (firstCard.dataset.url === secondCard.dataset.url) {
        disableCards();
        pairsFound += 1;
        if (pairsFound === numPairs) {
            pauseUpTimer();
            alert('ゲームクリア！');
            document.getElementById('startUp').disabled = true;

        }
    } else {
        unflipCards();
    };
};

function disableCards() {
    firstCard.classList.add('disabled');
    secondCard.classList.add('disabled');
    resetBoard();
};

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.add('hidden');
        secondCard.classList.add('hidden');
        firstCard.style.backgroundImage = '';
        secondCard.style.backgroundImage = '';
        resetBoard();
    }, 1000);
};

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
};

let upTimerInterval;
let upTimerSeconds = 0;
let isUpRunning = false;

function startUpTimer() {
    if (isUpRunning) return;
    isUpRunning = true;
    isPaused = false;
    document.getElementById('startUp').disabled = true;
    document.getElementById('pauseUp').disabled = false;
    // カードの薄くなった状態を解除
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('paused');
        card.classList.add('started');
    });
    isGameStarted = true;

    upTimerInterval = setInterval(function () {
        upTimerSeconds++;
        displayUpTimer();
    }, 1000);
};

function pauseUpTimer() {
    clearInterval(upTimerInterval);
    isUpRunning = false;
    isPaused = true; // 一時停止フラグを立てる
    document.getElementById('startUp').disabled = false;
    document.getElementById('pauseUp').disabled = true;
    // カードを薄くする処理を追加
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('started');
        card.classList.add('paused');
    });
};

function resetUpTimer() {
    clearInterval(upTimerInterval);
    upTimerSeconds = 0;
    isUpRunning = false;
    isPaused = true;
    document.getElementById('startUp').disabled = false;
    document.getElementById('pauseUp').disabled = true;
    displayUpTimer();
    isGameStarted = false;
    pairsFound = 0;
    resetBoard();
    generateBoard();
    // カードの薄くなった状態を解除
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('paused');
        card.classList.add('started');
    });
};

function displayUpTimer() {
    const minutes = Math.floor(upTimerSeconds / 60);
    const seconds = upTimerSeconds % 60;
    document.getElementById('upTimer').textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};

document.getElementById('startUp').addEventListener('click', startUpTimer);
document.getElementById('pauseUp').addEventListener('click', pauseUpTimer);
document.getElementById('resetUp').addEventListener('click', resetUpTimer);

generateBoard();

const returnTop = document.getElementById('return');
document.getElementById('return').addEventListener('click', function(){
    let ans = window.confirm('トップページに戻りますか？');
    if (ans){
        window.location.href = './index.html';
    };
});