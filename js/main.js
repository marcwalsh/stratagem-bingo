// main.js

const init = () => {
    fetch('stratagems.json')
        .then(response => response.json())
        .then(data => {
            stratagems = data.stratagems;

            const hash = window.location.hash.substr(1);
            if (hash) {
                try {
                    const players = JSON.parse(atob(hash));
                    generateStratagemsForPlayers(players);
                    document.getElementById("setup").style.display = "none";
                    document.getElementById("bingo-card").style.display = "block";
                    document.getElementById("title").textContent = players.length === 1 ? 'Helldiver, these are your assigned stratagems.' : 'Helldivers, these are your assigned stratagems.';
                    console.log("Stratagems loaded from URL.");
                } catch (e) {
                    console.error("Error parsing hash parameters", e);
                }
            }
        });
};

document.getElementById("generate-new").addEventListener("click", () => {
    currentPlayerIndex = 1;
    players.length = 0;
    document.getElementById("players").innerHTML = `
        <div class="player-input" id="player1-input" style="display: block; opacity: 1;">
            <label for="player1-name">Player 1:</label>
            <input type="text" id="player1-name" placeholder="Name">
            <label for="player1-level">Level:</label>
            <input type="number" id="player1-level" min="1" max="20">
        </div>
    `;
    document.getElementById("setup").style.display = "block";
    document.getElementById("bingo-card").style.display = "none";
});

document.getElementById("share-link").addEventListener("click", () => {
    const generatedUrl = document.getElementById("generated-link").value;
    if (generatedUrl) {
        copyToClipboard(generatedUrl);
    } else {
        alert("No URL generated yet.");
    }
});

init();