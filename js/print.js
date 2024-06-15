// print.js

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
