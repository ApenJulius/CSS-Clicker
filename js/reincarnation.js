let reincarnationPointsDiv = document.getElementById("reincarnationPoints");
localStorage.setItem("firstUpgX", "6");
localStorage.setItem("firstUpgY", "6");
let occupiedUpgCoords = [[6, 6]];
let allDirections = ["Y", "X", "-Y", "-X"];
let gridColumn = 0;
let gridRow = 0;
let direction;

window.addEventListener("load", () => reincarnateOpen());

function reincarnateOpen() {
    reincarnationPointsDiv.innerHTML = localStorage.getItem("reincarnationPoints") + " Reinkarnasjons-poeng.";
}

setupUpgTree({
    title: "testUpg1",
    name: "testUpg1",
    direction: "X",
    infoBoxContent: "Dette er en test.",
    previousUpg: "firstUpg",
});

setupUpgTree({
    title: "testUpg2",
    name: "testUpg2",
    direction: "X",
    infoBoxContent: "Dette er en test.",
    previousUpg: "testUpg1",
});

setupUpgTree({
    title: "testUpg3",
    name: "testUpg3",
    direction: "X",
    infoBoxContent: "Dette er en test.",
    previousUpg: "testUpg2",
});

setupUpgTree({
    title: "testUpg4",
    name: "testUpg4",
    direction: "X",
    infoBoxContent: "Dette er en test.",
    previousUpg: "testUpg3",
});

setupUpgTree({
    title: "testUpg5",
    name: "testUpg5",
    direction: "X",
    infoBoxContent: "Dette er en test.",
    previousUpg: "testUpg4",
});

setupUpgTree({
    title: "testUpg6",
    name: "testUpg6",
    direction: "Y",
    infoBoxContent: "Dette er en test.",
    previousUpg: "firstUpg",
});

function setupUpgTree(options) {
    options = Object.assign(
        {},
        {
            title: "",
            name: "",
            direction: "",
            infoBoxContent: "",
            previousUpg: "",
        },
        options
    );

    let X = parseInt(localStorage.getItem(options.previousUpg + "X"));
    let Y = parseInt(localStorage.getItem(options.previousUpg + "Y"));

    direction = checkCoords(options.direction, X, Y, 2);

    if (gridColumn < 1 || gridRow < 1 || gridColumn > 11 || gridRow > 11) {
        console.log("Woopsie UwU, ikke pwass til " + options.name + " OwO");
        return;
    }

    let upgPlacement = "grid-column: " + gridColumn + "; grid-row: " + gridRow + ";";

    let upgTree = document.getElementById("upgTree");
    let upgTreeHTML = `
        <div class="upgTreeBox infoBox" onclick="kjøpeReincarnationUpg(${options.name})" style="${upgPlacement}">           
            <p>
                ${options.title}<span class="tooltip">${options.infoBoxContent}</span>
            </p>     
        </div>  
    `;

    upgTreeHTML += placeLine(X, Y, direction);

    upgTree.innerHTML += upgTreeHTML;

    localStorage.setItem(options.name + "X", gridColumn);
    localStorage.setItem(options.name + "Y", gridRow); 
    occupiedUpgCoords.push([gridColumn, gridRow]);
}

function placeLine(X, Y, direction) {
    let linjeX = X;
    let linjeY = Y;

    if (direction == "Y") { 
        linjeY = Y - 1;
    } else if (direction == "X") {
        linjeX = X + 1;      
    } else if (direction == "-Y") {
        linjeY = Y + 1;
    } else if (direction == "-X") {
        linjeX = X - 1;        
    }

    let linjeClass = "linje" + direction.split("-").pop();

    let linePlacement = "grid-column: " + linjeX + "; grid-row: " + linjeY + ";";

    return `<div class="${linjeClass}" style="${linePlacement}"></div>`;
}

function checkCoords(direction, X, Y) {
    gridColumn = X;
    gridRow = Y;

    if (direction == "Y") { 
        gridRow = Y - 2;
    } else if (direction == "X") {
        gridColumn = X + 2;     
    } else if (direction == "-Y") {
        gridRow = Y + 2; 
    } else if (direction == "-X") {
        gridColumn = X - 2;        
    }

    for (let i = 0; i < occupiedUpgCoords.length; i++) {
        if (occupiedUpgCoords[i] == ([gridColumn, gridRow].toString())) {
            direction = allDirections[allDirections.indexOf(direction) + 1];
            if (direction == undefined) {
                direction = allDirections[0];
            }
            return checkCoords(direction, X, Y, 2);
        }
    }

    return direction;
}