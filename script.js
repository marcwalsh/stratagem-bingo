document.addEventListener("DOMContentLoaded", () => {
    const stratagems = [
        "Orbital_EMS_Strike", "Tesla_Tower", "HMG_Emplacement", "Orbital_Smoke_Strike",
        "Orbital_Gas_Strike", "Shield_Generator_Relay", "Orbital_Precision_Strike",
        "Eagle_500KG_Bomb", "Eagle_Cluster_Bomb", "Jump_Pack", "Eagle_Strafing_Run",
        "Eagle_110MM_Rocket_Pods", "Eagle_Airstrike", "Eagle_Smoke_Strike",
        "Eagle_Napalm_Airstrike", "Arc_Thrower", "Anti-Tank_Mines", "Grenade_Launcher",
        "Incendiary_Mines", "Ballistic_Shield_Backpack", "Quasar_Cannon", "Guard_Dog_Rover",
        "Laser_Cannon", "Shield_Generator_Pack", "Anti-Personnel_Minefield", "Supply_Pack",
        "Expendable_Anti-Tank", "Airburst_Rocket_Launcher", "Machine_Gun", "Autocannon",
        "Heavy_Machine_Gun", "Anti-Materiel_Rifle", "Spear", "Flamethrower", "Stalwart",
        "Recoilless_Rifle", "Railgun", "Orbital_Airburst_Strike", "Orbital_Railcannon_Strike",
        "Orbital_120MM_HE_Barrage", "Orbital_Walking_Barrage", "Orbital_Gatling_Barrage",
        "Orbital_380MM_HE_Barrage", "Orbital_Laser", "Emancipator_Exosuit",
        "Machine_Gun_Sentry", "Guard_Dog", "Gatling_Sentry", "Rocket_Sentry",
        "Patriot_Exosuit", "Autocannon_Sentry", "Mortar_Sentry", "EMS_Mortar_Sentry"
    ];

    const stratagemImages = {
        "Orbital_EMS_Strike": "./images/Bridge/Orbital_EMS_Strike.svg",
        "Tesla_Tower": "./images/Bridge/Tesla_Tower.svg",
        "HMG_Emplacement": "./images/Bridge/HMG_Emplacement.svg",
        "Orbital_Smoke_Strike": "./images/Bridge/Orbital_Smoke_Strike.svg",
        "Orbital_Gas_Strike": "./images/Bridge/Orbital_Gas_Strike.svg",
        "Shield_Generator_Relay": "./images/Bridge/Shield_Generator_Relay.svg",
        "Orbital_Precision_Strike": "./images/Bridge/Orbital_Precision_Strike.svg",
        "Eagle_500KG_Bomb": "./images/Hangar/Eagle_500KG_Bomb.svg",
        "Eagle_Cluster_Bomb": "./images/Hangar/Eagle_Cluster_Bomb.svg",
        "Jump_Pack": "./images/Hangar/Jump_Pack.svg",
        "Eagle_Strafing_Run": "./images/Hangar/Eagle_Strafing_Run.svg",
        "Eagle_110MM_Rocket_Pods": "./images/Hangar/Eagle_110MM_Rocket_Pods.svg",
        "Eagle_Airstrike": "./images/Hangar/Eagle_Airstrike.svg",
        "Eagle_Smoke_Strike": "./images/Hangar/Eagle_Smoke_Strike.svg",
        "Eagle_Napalm_Airstrike": "./images/Hangar/Eagle_Napalm_Airstrike.svg",
        "Arc_Thrower": "./images/Engineering_Bay/Arc_Thrower.svg",
        "Anti-Tank_Mines": "./images/Engineering_Bay/Anti-Tank_Mines.svg",
        "Grenade_Launcher": "./images/Engineering_Bay/Grenade_Launcher.svg",
        "Incendiary_Mines": "./images/Engineering_Bay/Incendiary_Mines.svg",
        "Ballistic_Shield_Backpack": "./images/Engineering_Bay/Ballistic_Shield_Backpack.svg",
        "Quasar_Cannon": "./images/Engineering_Bay/Quasar_Cannon.svg",
        "Guard_Dog_Rover": "./images/Engineering_Bay/Guard_Dog_Rover.svg",
        "Laser_Cannon": "./images/Engineering_Bay/Laser_Cannon.svg",
        "Shield_Generator_Pack": "./images/Engineering_Bay/Shield_Generator_Pack.svg",
        "Anti-Personnel_Minefield": "./images/Engineering_Bay/Anti-Personnel_Minefield.svg",
        "Supply_Pack": "./images/Engineering_Bay/Supply_Pack.svg",
        "Expendable_Anti-Tank": "./images/Patriotic_Administration_Center/Expendable_Anti-Tank.svg",
        "Airburst_Rocket_Launcher": "./images/Patriotic_Administration_Center/Airburst_Rocket_Launcher.svg",
        "Machine_Gun": "./images/Patriotic_Administration_Center/Machine_Gun.svg",
        "Autocannon": "./images/Patriotic_Administration_Center/Autocannon.svg",
        "Heavy_Machine_Gun": "./images/Patriotic_Administration_Center/Heavy_Machine_Gun.svg",
        "Anti-Materiel_Rifle": "./images/Patriotic_Administration_Center/Anti-Materiel_Rifle.svg",
        "Spear": "./images/Patriotic_Administration_Center/Spear.svg",
        "Flamethrower": "./images/Patriotic_Administration_Center/Flamethrower.svg",
        "Stalwart": "./images/Patriotic_Administration_Center/Stalwart.svg",
        "Recoilless_Rifle": "./images/Patriotic_Administration_Center/Recoilless_Rifle.svg",
        "Railgun": "./images/Patriotic_Administration_Center/Railgun.svg",
        "Orbital_Airburst_Strike": "./images/Orbital_Cannons/Orbital_Airburst_Strike.svg",
        "Orbital_Railcannon_Strike": "./images/Orbital_Cannons/Orbital_Railcannon_Strike.svg",
        "Orbital_120MM_HE_Barrage": "./images/Orbital_Cannons/Orbital_120MM_HE_Barrage.svg",
        "Orbital_Walking_Barrage": "./images/Orbital_Cannons/Orbital_Walking_Barrage.svg",
        "Orbital_Gatling_Barrage": "./images/Orbital_Cannons/Orbital_Gatling_Barrage.svg",
        "Orbital_380MM_HE_Barrage": "./images/Orbital_Cannons/Orbital_380MM_HE_Barrage.svg",
        "Orbital_Laser": "./images/Orbital_Cannons/Orbital_Laser.svg",
        "Emancipator_Exosuit": "./images/Robotics_Workshop/Emancipator_Exosuit.svg",
        "Machine_Gun_Sentry": "./images/Robotics_Workshop/Machine_Gun_Sentry.svg",
        "Guard_Dog": "./images/Robotics_Workshop/Guard_Dog.svg",
        "Gatling_Sentry": "./images/Robotics_Workshop/Gatling_Sentry.svg",
        "Rocket_Sentry": "./images/Robotics_Workshop/Rocket_Sentry.svg",
        "Patriot_Exosuit": "./images/Robotics_Workshop/Patriot_Exosuit.svg",
        "Autocannon_Sentry": "./images/Robotics_Workshop/Autocannon_Sentry.svg",
        "Mortar_Sentry": "./images/Robotics_Workshop/Mortar_Sentry.svg",
        "EMS_Mortar_Sentry": "./images/Robotics_Workshop/EMS_Mortar_Sentry.svg"
    };

    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    shuffleArray(stratagems);

    const bingoGrid = document.getElementById("bingo-grid");

    for (let i = 0; i < 4; i++) {
        const cell = document.createElement("div");
        cell.className = "bingo-cell";
        const img = document.createElement("img");
        img.src = stratagemImages[stratagems[i]];
        img.alt = stratagems[i];
        const text = document.createElement("span");
        text.textContent = stratagems[i].replace(/_/g, ' ');
        cell.appendChild(img);
        cell.appendChild(text);
        bingoGrid.appendChild(cell);
    }
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
