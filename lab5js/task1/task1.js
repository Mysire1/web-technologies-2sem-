document.addEventListener("DOMContentLoaded", () => {
    const lamp = document.getElementById("lamp");
    const toggleButton = document.getElementById("toggleLamp");
    const lampTypeSelect = document.getElementById("lampType");
    const brightnessButton = document.getElementById("setBrightness");
    const status = document.getElementById("status");
    let timeoutId;

    function turnOn() {
        lamp.classList.add("on");
        lamp.style.backgroundColor = "yellow";
        updateStatus("Лампочка увімкнена");
        resetAutoOff();
    }

    function turnOff() {
        lamp.classList.remove("on");
        lamp.style.backgroundColor = "grey";
        updateStatus("Лампочка вимкнена");
    }

    function toggleLamp() {
        if (lamp.classList.contains("on")) {
            turnOff();
        } else {
            turnOn();
        }
    }

    function changeLampType() {
        const selectedType = lampTypeSelect.value;
        lamp.className = `lamp ${selectedType}`;
        if (lamp.classList.contains("on")) lamp.classList.add("on");
        updateStatus(`Тип лампочки: ${selectedType}`);
        resetAutoOff();
    }

    function setBrightness() {
        const brightness = prompt("Введіть рівень яскравості (0-100):");
        const numericValue = Number(brightness);
        if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
            lamp.style.opacity = numericValue / 100;
            updateStatus(`Яскравість встановлено на ${numericValue}%`);
            resetAutoOff();
        } else {
            alert("Некоректне значення!");
        }
    }

    function resetAutoOff() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            turnOff();
            updateStatus("Автоматичне вимкнення через 5 хвилин бездіяльності");
        }, 5 * 60 * 1000);
    }

    function updateStatus(message) {
        status.textContent = message;
        console.log(message);
    }

    toggleButton.addEventListener("click", toggleLamp);
    lampTypeSelect.addEventListener("change", changeLampType);
    brightnessButton.addEventListener("click", setBrightness);
});
