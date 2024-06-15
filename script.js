document.addEventListener("DOMContentLoaded", () => {
    let stratagems = [];

    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

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

    const copyToClipboard = text => {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("Link copied to clipboard!");
    };

    const generateNewSet = () => {
        const players = [];
        for (let i = 1; i <= 4; i++) {
            const name = document.getElementById(`player${i}-name`).value;
            const level = parseInt(document.getElementById(`player${i}-level`).value, 10);
            if (name && level) {
                const filteredStratagems = filterStratagemsByLevel(stratagems, level);
                shuffleArray(filteredStratagems);
                const stratagemsSelected = filteredStratagems.slice(0, 4).map(stratagem => stratagem.id);
                players.push({ name, level, stratagems: stratagemsSelected });
            }
        }

        if (players.length > 0) {
            generateStratagemsForPlayers(players);
            const encodedData = btoa(JSON.stringify(players));
            const generatedUrl = `${window.location.origin}${window.location.pathname}#${encodedData}`;
            document.getElementById("generated-link").value = generatedUrl;
            document.getElementById("share-link").style.display = "inline-block";
        } else {
            console.error("No valid players found");
        }
    };

    document.getElementById("generate").addEventListener("click", generateNewSet);

    document.getElementById("generate-new").addEventListener("click", generateNewSet);

    document.getElementById("share-link").addEventListener("click", () => {
        const generatedUrl = document.getElementById("generated-link").value;
        if (generatedUrl) {
            copyToClipboard(generatedUrl);
        } else {
            alert("No URL generated yet.");
        }
    });

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

    init();
});

function printBingoCard() {
    const printWindow = window.open('', '', 'width=320,height=800');
    printWindow.document.write(`
        <html>
        <head>
            <title>Print Bingo Card</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #fff;
                    margin: 0;
                    padding: 10px;
                    width: 80mm;
                }
                .bingo-cell {
                    border: 1px solid #000;
                    padding: 10px;
                    text-align: center;
                    margin-bottom: 5px;
                }
                .bingo-cell img {
                    max-width: 50px;
                    height: auto;
                    margin-right: 10px;
                }
                .bingo-cell span {
                    display: inline-block;
                    vertical-align: middle;
                }
            </style>
        </head>
        <body>
    `);

    const playerSections = Array.from(document.querySelectorAll('.player-section'));
    playerSections.forEach(section => {
        printWindow.document.write(section.innerHTML);
    });

    printWindow.document.write(`
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.print();
}

function printMiniBingoCard() {
    const printWindow = window.open('', '', 'width=320,height=400');
    printWindow.document.write(`
        <html>
        <head>
            <title>Print Mini Bingo Card</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #fff;
                    margin: 0;
                    padding: 10px;
                    width: 80mm;
                }
                .bingo-cell {
                    border: 1px solid #000;
                    padding: 5px;
                    text-align: center;
                    margin-bottom: 5px;
                }
                .bingo-cell img {
                    max-width: 50px;
                    height: auto;
                    margin-right: 10px;
                }
                .bingo-cell span {
                    display: inline-block;
                    vertical-align: middle;
                }
            </style>
        </head>
        <body>
    `);

    const playerSections = Array.from(document.querySelectorAll('.player-section'));
    playerSections.forEach(section => {
        printWindow.document.write(section.innerHTML);
    });

    printWindow.document.write(`
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.print();
}
