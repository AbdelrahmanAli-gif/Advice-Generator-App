const divider = document.querySelector('.divider');
const adviceBtn = document.querySelector('.advice-btn');
const diceImg = document.querySelector('.dice-img');
const advice = document.querySelector('.advice-text');
const adviceNum = document.querySelector('.advice-num');
const writingSpeed = 30;
var text = '"It is easy to sit up and take notice, what\'s difficult is getting up and taking action."';
var index = 0;
var rotation = 0;

const getWindowSize = () => {
    let windowSize = window.innerWidth;
    if (windowSize < 600) {
        divider.src = './images/pattern-divider-mobile.svg';
    } else {
        divider.src = './images/pattern-divider-desktop.svg';
    }
}

const updateAdvice = (advice) => {
    text = advice;
    index = 0;
    writeText();
}

const updateId = (id) => {
    adviceNum.innerText = `Advice #${id}`;
}

const writeText = () => {
    advice.innerHTML = text.slice(0, index);
    index++;
    if (index < text.length){
        setTimeout(writeText, writingSpeed);
    }
}

const rollDice = () => {
    rotation += 360;
    diceImg.style.transform = `rotate(${rotation}deg)`;
}

const getAdvice = async () => {
    rollDice();
    const url = "https://api.adviceslip.com/advice";
    try {
        const response = await fetch(url);
        const json = await response.json();
        updateAdvice(json.slip.advice);
        updateId(json.slip.id);
    } catch (error) {
        console.error(error.message);
        updateAdvice("Sorry, advice could not be fetched. Please try again.");
        updateId("N/A");
    }
}

writeText();

window.addEventListener('load', getWindowSize);
window.addEventListener('resize', getWindowSize);
adviceBtn.addEventListener('click', getAdvice);