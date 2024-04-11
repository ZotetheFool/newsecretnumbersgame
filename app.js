let secretNumbersList = [];
let maxNum = 100;
startTxt();
let secretNum = randomNum();
let attempts = 1;

function randomNum() {
    let chosenNum = parseInt(Math.random() * maxNum + 1);
    let listLength = secretNumbersList.length;

    if (listLength == maxNum) {
        secretNumbersList = [];
    }

    if (secretNumbersList.includes(chosenNum)) {
        return randomNum();
    } else {
        secretNumbersList.push(chosenNum);
        return chosenNum;
    }
    
}

function showTxt(tag, txt) {
    let field = document.querySelector(tag);
    field.innerHTML = txt;
    responsiveVoice.speak(txt, 'US English Female', {rate:1.2});
}

function startTxt() {
    showTxt('h1', "Secret Number's Game");
    showTxt('p', `choose a number between 1 - ${maxNum}!`);
}

function checkShot() {
    let shot = document.querySelector('input').value;
    
    if (shot == secretNum) {
        showTxt ('h1', "Hell Yeah!");
        let wordAttempts = attempts > 1 ? "attempts" : "attempt";
        let finalTxt = `You made ${attempts} ${wordAttempts} to win!`;
        showTxt ('p', finalTxt);
        document.getElementById('restart').removeAttribute('disabled');
    } else {
        if (shot > secretNum) {
            showTxt ('p', `Smaller than ${shot}`);
        } else {
            showTxt ('p', `Greater than ${shot}`);
        }
     attempts++;
        cleanField();
    }
}

function cleanField() {
    shot = document.querySelector('input');
    shot.value = " ";
}

function restartGame() {
    secretNum = randomNum();
    cleanField();
    attempts = 1;
    startTxt();
    document.getElementById('restart').setAttribute('disabled', true);
}