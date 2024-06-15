document.addEventListener("DOMContentLoaded", () => {
    fetch('stratagems.json')
        .then(response => response.json())
        .then(data => {
            const stratagems = data.stratagems;

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

            const generateStratagemsForPlayers = (players, stratagems) => {
                const bingoGrids = document.getElementById("bingo-grids");
                bingoGrids.innerHTML = "";

                players.forEach(player => {
                    const filteredStratagems = filterStratagemsByLevel(stratagems, player.level);
                    shuffleArray(filteredStratagems);
                    player.stratagems = filteredStratagems.slice(0, 4).map(stratagem => stratagem.id);

                    const playerDiv = document.createElement("div");
                    playerDiv.className = "player-section";

                    const playerTitle = document.createElement("h4");
                    playerTitle.textContent = `${player.name}'s Stratagems:`;
                    playerTitle.dataset.level = player.level;
                    playerDiv.appendChild(playerTitle);

                    const bingoGrid = document.createElement("div");
                    bingoGrid.className = "bingo-grid";

                    player.stratagems.forEach(id => {
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
                        bingoGrid.appendChild(cell);
                    });

                    playerDiv.appendChild(bingoGrid);
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

            document.getElementById("generate").addEventListener("click", () => {
                const players = [];
                for (let i = 1; i <= 4; i++) {
                    const name = document.getElementById(`player${i}-name`).value;
                    const level = parseInt(document.getElementById(`player${i}-level`).value, 10);
                    if (name && level) {
                        players.push({ name, level });
                    }
                }

                if (players.length > 0) {
                    generateStratagemsForPlayers(players, stratagems);
                } else {
                    console.error("No valid players found");
                }
            });

            document.getElementById("share-link").addEventListener("click", () => {
                const players = [];
                document.querySelectorAll('.player-section').forEach(section => {
                    const name = section.querySelector('h4').textContent.split("'s")[0];
                    const level = parseInt(section.querySelector('h4').dataset.level, 10);
                    const stratagemsArray = Array.from(section.querySelectorAll('.bingo-cell img')).map(img => {
                        const stratagem = stratagems.find(s => s.name === img.alt);
                        return stratagem ? stratagem.id : null;
                    }).filter(id => id !== null);
                    players.push({ name, level, stratagems: stratagemsArray });
                });

                const encodedData = btoa(JSON.stringify(players));
                const generatedUrl = `${window.location.origin}${window.location.pathname}#${encodedData}`;
                document.getElementById("generated-link").value = generatedUrl;
                copyToClipboard(generatedUrl);
            });

            const init = () => {
                const hash = window.location.hash.substr(1);
                if (hash) {
                    try {
                        const players = JSON.parse(atob(hash));
                        generateStratagemsForPlayers(players, stratagems);
                        document.getElementById("setup").style.display = "none";
                        document.getElementById("bingo-card").style.display = "block";
                        document.getElementById("title").textContent = players.length === 1 ? 'Helldiver, these are your assigned stratagems.' : 'Helldivers, these are your assigned stratagems.';
                        console.log("Stratagems loaded from URL.");
                    } catch (e) {
                        console.error("Error parsing hash parameters", e);
                    }
                }
            };

            init();
        });
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
