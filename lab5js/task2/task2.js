document.addEventListener("DOMContentLoaded", () => {
    const redLight = document.getElementById("red");
    const yellowLight = document.getElementById("yellow");
    const greenLight = document.getElementById("green");
    const status = document.getElementById("status");
    const nextStateBtn = document.getElementById("nextStateBtn");

    let redDuration = Number(prompt("ЧЕРВОНИЙ в секундах:"));
    let yellowDuration = Number(prompt("ЖОВТИЙ в секундах:"));
    let greenDuration = Number(prompt("ЗЕЛЕНИЙ в секундах:"));

    let durations = {
        red: redDuration * 1000,
        yellow: yellowDuration * 1000,
        green: greenDuration * 1000
    };

    let state = "red";
    let blinkCount = 0;
    let timeoutId;

    function updateStatus(message) {
        status.textContent = message;
        console.log(message);
    }

    function resetAutoOff() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            switch (state) {
                case "green":
                    state = "yellow";
                    break;
                case "yellow":
                    state = "red";
                    break;
            }
            next();
        }, durations[state]);
    }

    function next() {
        switch (state) {
            case "red":
                updateStatus("ЧЕРВОНИЙ");
                redLight.classList.add("active");
                yellowLight.classList.remove("active");
                greenLight.classList.remove("active");
                state = "yellow";
                resetAutoOff();
                break;
            case "yellow":
                updateStatus("ЖОВТИЙ");
                redLight.classList.remove("active");
                yellowLight.classList.add("active");
                greenLight.classList.remove("active");
                state = "green";
                resetAutoOff();
                break;
            case "green":
                updateStatus("ЗЕЛЕНИЙ");
                redLight.classList.remove("active");
                yellowLight.classList.remove("active");
                greenLight.classList.add("active");
                state = "blinkingYellow";
                resetAutoOff();
                break;
            case "blinkingYellow":
                if (blinkCount < 3) {
                    updateStatus(`ЖОВТИЙ МИГАЄ (${blinkCount + 1})`);
                    yellowLight.classList.toggle("active");
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

    function toggleNextState() {
        switch (state) {
            case "red":
                state = "yellow";
                break;
            case "yellow":
                state = "green";
                break;
            case "green":
                state = "blinkingYellow";
                break;
            case "blinkingYellow":
                state = "red";
                break;
        }
        next();
    }
    next();

    nextStateBtn.addEventListener("click", toggleNextState);
});
