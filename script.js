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

            document.getElementById("level-submit").addEventListener("click", () => {
                const level = parseInt(document.getElementById("level-input").value, 10);
                const filteredStratagems = filterStratagemsByLevel(stratagems, level);
                shuffleArray(filteredStratagems);

                const bingoGrid = document.getElementById("bingo-grid");
                bingoGrid.innerHTML = "";

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
            });
        });
});

function printBingoCard() {
    const stratagems = Array.from(document.querySelectorAll('.bingo-cell img')).map(img => img.alt);
    const stratagemImages = Array.from(document.querySelectorAll('.bingo-cell img')).map(img => img.src);

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

    stratagems.forEach((stratagem, index) => {
        printWindow.document.write(`<div class="bingo-cell"><img src="${stratagemImages[index]}" alt="${stratagem}"><span>${stratagem.replace(/_/g, ' ')}</span></div>`);
    });

    printWindow.document.write(`
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.print();
}

function printMiniBingoCard() {
    const stratagems = Array.from(document.querySelectorAll('.bingo-cell img')).map(img => img.alt);
    const stratagemImages = Array.from(document.querySelectorAll('.bingo-cell img')).map(img => img.src);

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

    stratagems.forEach((stratagem, index) => {
        printWindow.document.write(`<div class="bingo-cell"><img src="${stratagemImages[index]}" alt="${stratagem}"><span>${stratagem.replace(/_/g, ' ')}</span></div>`);
    });

    printWindow.document.write(`
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.print();
}
