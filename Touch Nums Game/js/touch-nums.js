var gCurrNum = 1
var gNums = [];
var BoardSize = 0;
var c = 0;
var t;
var timer_is_on = false;

function timedCount() {
    document.getElementById("timer").value = c;
    c = c + 1;
    t = setTimeout(timedCount, 1000);
}

function startCount() {
    if (!timer_is_on) {
        timer_is_on = true;
        timedCount();
    }
}

function stopCount() {
    clearTimeout(t);
    timer_is_on = false;
}

function initGame(boardSize) {
    BoardSize = boardSize
    getArray(BoardSize)
    shuffle(gNums);
    renderBoard(gNums)
}

// function resetGame() {
//     var res = getArray(16)
//     shuffle(gNums);
//     renderBoard(gNums)

// }

function getArray(length) {
    for (var i = 1; i <= length; i++) {
        gNums.push(i)
    }
}

function shuffle(items) {
    var randIdx
    var keep
    for (var i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length - 1); //3
        keep = items[i]; //5
        items[i] = items[randIdx];
        items[randIdx] = keep;
        // console.log('gNums before drawNum ',gNums);
    }
    gNums = items;
}

function renderBoard(board) {
    console.table(board);
    var strHTML = '';
    for (var i = 0; i < Math.sqrt(BoardSize); i++) {
        strHTML += '<tr>'
        for (var j = 0; j < Math.sqrt(BoardSize); j++) {
            var num = drawNum(gNums)
            strHTML += `<td class="td1" onclick="cellClicked(this,${num})">${num}</td>`
        }
        strHTML += '</tr>'
    }
    // console.log(strHTML);
    var elBoard = document.querySelector('table')
    elBoard.innerHTML = strHTML
}

function drawNum(array) {
    return array.pop();
}

function changeLevel(elBtn) {
    var levelToSize = {
        "easy": 16,
        "medium": 25,
        "hard": 36
    }

    initGame(levelToSize[elBtn.innerText.toLowerCase()])

    // if (elBtn.innerText.toLowerCase() == "easy") {
    //     gNumsLength = 16
    //     getArray(gNumsLength)
    //     shuffle(gNums)
    //     renderBoard()
    // } else if (elBtn.innerText.toLowerCase() == "medium") {
    //     gNumsLength = 25
    //     getArray(gNumsLength)
    //     shuffle(gNums)
    //     renderBoard()
    // } else if (elBtn.innerText.toLowerCase() == "hard") {
    //     gNumsLength = 36
    //     getArray(gNumsLength)
    //     shuffle(gNums)
    //     renderBoard()
    // }
}

function cellClicked(elTd, num) {
    if (num === gCurrNum) {
        if (gCurrNum == 1) {
            startCount()
        } else if (num == BoardSize) {
            stopCount()
        }
        gCurrNum++
        if (elTd.classList.contains('td1')) {
            elTd.classList.add('td2')
            elTd.classList.remove('td1')
        }

    } else {
        alert('wrong number')
    }
    // console.log(`num: ${num} gNumsLengs: ${BoardSize}`);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is inclusive and the minimum is inclusive
}