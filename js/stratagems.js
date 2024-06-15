// stratagems.js

let stratagems = [];

const filterStratagemsByLevel = (stratagems, level) => {
    return stratagems.filter(stratagem => stratagem.level <= level);
};

const getStratagemById = id => {
    return stratagems.find(stratagem => stratagem.id === id);
};

const displayStratagemsWithAnimation = (player, stratagemsSelected) => {
    const bingoGrid = document.createElement("div");
    bingoGrid.className = "bingo-grid";
    player.stratagems.forEach((id, index) => {
        const stratagem = getStratagemById(id);
        const cell = document.createElement("div");
        cell.className = "bingo-cell";
        const img = document.createElement("img");
        img.src = stratagem.image;
        img.alt = stratagem.name;
        const text = document.createElement("span");
        text.textContent = stratagem.name.replace(/_/g, ' ');
        cell.appendChild(img);
        cell.appendChild(text);
        setTimeout(() => {
            bingoGrid.appendChild(cell);
        }, index * 200); // delay each cell's appearance
    });
    return bingoGrid;
};

const generateStratagemsForPlayers = players => {
    const bingoGrids = document.getElementById("bingo-grids");
    bingoGrids.innerHTML = "";

    players.forEach(player => {
        const playerDiv = document.createElement("div");
        playerDiv.className = "player-section";

        const playerTitle = document.createElement("h4");
        playerTitle.textContent = `${player.name}'s Stratagems:`;
        playerTitle.dataset.level = player.level;
        playerDiv.appendChild(playerTitle);

        playerDiv.appendChild(displayStratagemsWithAnimation(player, player.stratagems));
        bingoGrids.appendChild(playerDiv);
    });

    document.getElementById("bingo-card").style.display = "block";
    document.getElementById("setup").style.display = "none";
    document.getElementById("share-link").style.display = "inline-block";
    console.log("Stratagems generated and displayed.");
};