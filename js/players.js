// players.js

let currentPlayerIndex = 1;
const players = [];

const addPlayerInput = () => {
    if (currentPlayerIndex < 4) {
        currentPlayerIndex++;
        const playerInput = document.createElement('div');
        playerInput.className = 'player-input';
        playerInput.id = `player${currentPlayerIndex}-input`;
        playerInput.innerHTML = `
            <label for="player${currentPlayerIndex}-name">Player ${currentPlayerIndex}:</label>
            <input type="text" id="player${currentPlayerIndex}-name" placeholder="Name">
            <label for="player${currentPlayerIndex}-level">Level:</label>
            <input type="number" id="player${currentPlayerIndex}-level" min="1" max="20">
        `;
        document.getElementById('players').appendChild(playerInput);
        playerInput.style.opacity = 0;
        setTimeout(() => {
            playerInput.style.opacity = 1;
        }, 100);
    } else {
        alert("Maximum of 4 players reached.");
    }
};

const addPlayer = () => {
    const name = document.getElementById(`player${currentPlayerIndex}-name`).value;
    const level = parseInt(document.getElementById(`player${currentPlayerIndex}-level`).value, 10);
    if (name && level) {
        const filteredStratagems = filterStratagemsByLevel(stratagems, level);
        shuffleArray(filteredStratagems);
        const stratagemsSelected = filteredStratagems.slice(0, 4).map(stratagem => stratagem.id);
        players.push({ name, level, stratagems: stratagemsSelected });
        if (currentPlayerIndex < 4) {
            addPlayerInput();
        } else {
            generateStratagemsForPlayers(players);
            const encodedData = btoa(JSON.stringify(players));
            const generatedUrl = `${window.location.origin}${window.location.pathname}#${encodedData}`;
            document.getElementById("generated-link").value = generatedUrl;
            document.getElementById("share-link").style.display = "inline-block";
        }
    } else {
        alert("Please enter both name and level.");
    }
};

document.getElementById("add-player").addEventListener("click", addPlayerInput);
document.getElementById("generate").addEventListener("click", addPlayer);