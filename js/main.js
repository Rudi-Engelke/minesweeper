var xSize = 0;
var ySize = 0;
var numberOfMines = 0;
var numberOfFlaggedMines = 0;

function onNewGameClicked() {
    var x = document.getElementById("xSizeInput").value
    var y = document.getElementById("ySizeInput").value
    var mines = document.getElementById("mineCountInput").value
    newGame(x, y, mines);
};

function newGame(x, y, mines) {
    xSize = x;
    ySize = y;
    numberOfMines = mines;
    numberOfFlaggedMines = 0;
    var table = document.getElementById("gameBoard");
    if (!table) {
        table = document.createElement("table");
    } else {
        table.innerHTML = "";
    }
    table.id = "gameBoard";
    for (var i = 0; i < y; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < x; j++) {
            var td = document.createElement("td");
            var mineButton = document.createElement("button");
            mineButton.setAttribute("xCoord", j);
            mineButton.setAttribute("yCoord", i);
            mineButton.onclick = onMineButtonClicked;
            mineButton.innerText = " ";
            td.appendChild(mineButton);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.getElementById("minesLeft").innerText = mines;
    while (mines > 0) {
        
        var randX = Math.round(Math.random() * (x - 1));
        var randY = Math.round(Math.random() * (y - 1));
        var mineButton = getMineButton(randX, randY, table);
        if (!mineButton.getAttribute("isMine")) {
            mineButton.setAttribute("isMine", true);
            mines--;
        }
    }
    var gamePanel = document.getElementById("gamePanel");
    gamePanel.appendChild(table);
};

function onMineButtonClicked(e) {
    var mineButton = e.srcElement;
    if (e.ctrlKey) {
        mineButton.classList.toggle("flagged");
        document.getElementById("minesLeft").innerText = numberOfMines - (mineButton.classList.contains("flagged") ? ++numberOfFlaggedMines : --numberOfFlaggedMines);
        checkEndConditions();
        return;
    }

    if (mineButton.getAttribute("isMine")) {
        mineButton.classList.add("mine");
        endGame(true);
        window.alert("You lost! :(");
        return;
    }

    var x = parseInt(mineButton.getAttribute("xCoord"));
    var y = parseInt(mineButton.getAttribute("yCoord"));

    checkBounds(x, y);
    checkEndConditions();
};

/**
 * Counts the number of mines adjacent to the given coordinate in all 8 directions
 * @param {*} x The x coordinate for which to count adjacent mines
 * @param {*} y The y coordinate for which to count adjacent mines
 */
function getAdjacentMines(x, y) {
    var mineCounter = 0;
    //top left
    if (x > 0 && y > 0 && getMineButton(x - 1, y - 1).getAttribute("isMine")) {
        mineCounter++;
    }
    //top
    if (y > 0 && getMineButton(x, y - 1).getAttribute("isMine")) {
        mineCounter++;
    }
    //top right
    if (x < xSize - 1 && y > 0 && getMineButton(x + 1, y - 1).getAttribute("isMine")) {
        mineCounter++;
    }
    //left
    if (x > 0 && getMineButton(x - 1, y).getAttribute("isMine")) {
        mineCounter++;
    }
    //right
    if (x < xSize - 1 && getMineButton(x + 1, y).getAttribute("isMine")) {
        mineCounter++;
    }
    //bottom left
    if (x > 0 && y < ySize - 1 && getMineButton(x - 1, y + 1).getAttribute("isMine")) {
        mineCounter++;
    }
    //bottom
    if (y < ySize - 1 && getMineButton(x, y + 1).getAttribute("isMine")) {
        mineCounter++;
    }
    //bottom right
    if (x < xSize - 1 && y < ySize - 1 && getMineButton(x + 1, y + 1).getAttribute("isMine")) {
        mineCounter++;
    }
    return mineCounter;
}

/**
 * Checks a button for surrounding mines and either updates the mine count, or triggers a mine
 * @param {number} x The x coordinate of the button to check
 * @param {number} y The y coordinate of the button to check
 */
function checkBounds(x, y) {
    var mineCount = getAdjacentMines(x, y);
    var mineButton = getMineButton(x, y);
    if (mineButton.classList.contains("flagged")) {
        return;
    }
    mineButton.disabled = true;
    mineButton.innerText = mineCount;
    setAdjacentStyle(mineButton, mineCount);
    if (mineCount === 0) {
        //top left
        if (x > 0 && y > 0) {
            var buttonToCheck = getMineButton(x - 1, y - 1)
            if (!buttonToCheck.disabled) {
                checkBounds(x - 1, y - 1);
            }
        }
        //top
        if (y > 0) {
            var buttonToCheck = getMineButton(x, y - 1)
            if (!buttonToCheck.disabled) {
                checkBounds(x, y - 1);
            }
        }
        //top right
        if (x < xSize - 1 && y > 0) {
            var buttonToCheck = getMineButton(x + 1, y - 1)
            if (!buttonToCheck.disabled) {
                checkBounds(x + 1, y - 1);
            }
        }
        //left
        if (x > 0) {
            var buttonToCheck = getMineButton(x - 1, y);
            if (!buttonToCheck.disabled) {
                checkBounds(x - 1, y);
            }
        }
        //right
        if (x < xSize - 1) {
            var buttonToCheck = getMineButton(x + 1, y);
            if (!buttonToCheck.disabled) {
                checkBounds(x + 1, y);
            }
        }
        //bottom left
        if (x > 0 && y < ySize - 1) {
            var buttonToCheck = getMineButton(x - 1, y + 1);
            if (!buttonToCheck.disabled) {
                checkBounds(x - 1, y + 1);
            }
        }
        //bottom
        if (y < ySize - 1) {
            var buttonToCheck = getMineButton(x, y + 1);
            if (!buttonToCheck.disabled) {
                checkBounds(x, y + 1);
            }
        }
        //bottom right
        if (x < xSize - 1 && y < ySize - 1) {
            var buttonToCheck = getMineButton(x + 1, y + 1);
            if (!buttonToCheck.disabled) {
                checkBounds(x + 1, y + 1);
            }
        }
    }
};

function setAdjacentStyle(mineButton, mineCount) {
    switch (mineCount) {
        case 0:
            mineButton.classList.toggle("blank");
            mineButton.innerText = " ";
            break;
        case 1:
            mineButton.classList.toggle("one");
            break;
        case 2:
            mineButton.classList.toggle("two");
            break;
        case 3:
            mineButton.classList.toggle("three");
            break;
        case 4:
            mineButton.classList.toggle("four");
            break;
        case 5:
            mineButton.classList.toggle("five");
            break;
        case 6:
            mineButton.classList.toggle("six");
            break;
        case 7:
            mineButton.classList.toggle("seven");
            break;
        case 8:
            mineButton.classList.toggle("eight");
            break;
    }
}

function getMineButton(x, y, gameBoard) {
    if (!gameBoard) {
        gameBoard = document.getElementById("gameBoard");
    }
    return gameBoard.childNodes[y].childNodes[x].childNodes[0];
};

function checkEndConditions() {
    var numberOfFlaggedBlocks = 0;
    var numberOfEnabledBlocks = 0;
    for (var x = 0; x < xSize; x++) {
        for (var y = 0; y < ySize; y++) {
            var mineButton = getMineButton(x, y);
            if (mineButton.classList.contains("flagged")) {
                numberOfFlaggedBlocks++;
            }
            if (!mineButton.disabled) {
                numberOfEnabledBlocks++;
            }
        }
    }
    if (numberOfEnabledBlocks == numberOfMines) {
        endGame();
        window.alert("You won!");
    }
};

function endGame(hasLost) {
    for (var x = 0; x < xSize; x++) {
        for (var y = 0; y < ySize; y++) {
            var mineButton = getMineButton(x, y);
            if (mineButton.getAttribute("isMine")) {
                if (hasLost && !mineButton.classList.contains("mine")) {
                    mineButton.classList.add("losingMine");
                } else if (!mineButton.classList.contains("flagged")) {
                    mineButton.classList.add("winningFlagged");
                }
            }
            mineButton.disabled = true;
        }
    }
};