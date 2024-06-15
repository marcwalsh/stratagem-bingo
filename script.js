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
                    document.getElementById("setup").style.display = "none";
                    document.getElementById("bingo-card").style.display = "block";
                    document.getElementById("title").textContent = players.length === 1 ? 'Helldiver, these are your assigned stratagems.' : 'Helldivers, these are your assigned stratagems.';

                    const bingoGrids = document.getElementById("bingo-grids");
                    bingoGrids.innerHTML = "";

                    players.forEach(player => {
                        const filteredStratagems = filterStratagemsByLevel(stratagems, player.level);
                        shuffleArray(filteredStratagems);

                        const playerDiv = document.createElement("div");
                        playerDiv.className = "player-section";

                        const playerTitle = document.createElement("h4");
                        playerTitle.textContent = `${player.name}'s Stratagems:`;
                        playerDiv.appendChild(playerTitle);

                        const bingoGrid = document.createElement("div");
                        bingoGrid.className = "bingo-grid";

                        for (let i = 0; i < 4; i++) {
                            const cell = document.createElement("div");
                            cell.className = "bingo-cell";
                            const img = document.createElement("img");
                            img.src = filteredStratagems[i].image;
                            img.alt = filteredStratagems[i].name;
                            const text = document.createElement("span");
                            text.textContent = filteredStratagems[i].name.replace(/_/g, ' ');
                            cell.appendChild(img);
                            cell.appendChild(text);
                            bingoGrid.appendChild(cell);
                        }

                        playerDiv.appendChild(bingoGrid);
                        bingoGrids.appendChild(playerDiv);
                    });
                }
            });
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
