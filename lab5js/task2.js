console.log("Завдання 2");

const red = Number(prompt("ЧЕРВОНИЙ в секундах:"));
const yellow = Number(prompt("ЖОВТИЙ в секундах:"));
const green = Number(prompt("ЗЕЛЕНИЙ в секундах:"));

let durations = {
    red: red * 1000,
    yellow: yellow * 1000,
    green: green * 1000
};

function startTrafficLight() {
    let state = "red";
    let blinkCount = 0;

    function next() {
        switch (state) {
            case "red":
                console.log("ЧЕРВОНИЙ");
                setTimeout(() => {
                    state = "yellow";
                    next();
                }, durations.red);
                break;
            case "yellow":
                console.log("ЖОВТИЙ");
                setTimeout(() => {
                    state = "green";
                    next();
                }, durations.yellow);
                break;
            case "green":
                console.log("ЗЕЛЕНИЙ");
                setTimeout(() => {
                    state = "blinkingYellow";
                    next();
                }, durations.green);
                break;
            case "blinkingYellow":
                if (blinkCount < 3) {
                    console.log(`ЖОВТИЙ МИГАЄ (${blinkCount + 1})`);
                    blinkCount++;
                    setTimeout(next, 500);
                } else {
                    state = "red";
                    blinkCount = 0;
                    next();
                }
                break;
        }
    }

    next();
}

startTrafficLight();
