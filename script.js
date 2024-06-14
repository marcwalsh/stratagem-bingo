document.addEventListener("DOMContentLoaded", () => {
    const stratagems = [
        "Orbital Laser", "Arc Thrower", "Railgun", "Eagle Airstrike",
        "Eagle Cluster Bomb", "Auto Cannon", "Quasar Cannon", "Expendable Anti-Tank",
        "Patriot Exosuit", "Shield Generator Pack", "Grenade Launcher", "EMS Mortar Sentry",
        "Eagle 500KG Bomb", "Auto Cannon Sentry", "Anti Material Rifle", "Guard Dog Rover",
        "Railcannon Strike", "Recoilless Rifle", "Stalwart", "Jump Pack",
        "Laser Cannon", "Orbital Precision Strike", "Shield Generator", "Rocket Sentry",
        "Flamethrower", "Napalm Airstrike", "Orbital Walking Barrage", "Orbital 380MM HE Barrage",
        "Orbital Gas Strike", "Orbital EMS Strike", "Orbital Smoke Strike", "HMG Placement",
        "Shield Generator Relay", "Tesla Tower", "Anti-Personnel Minefield", "Supply Pack"
    ];

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
        cell.textContent = stratagems[i];
        bingoGrid.appendChild(cell);
    }
});
