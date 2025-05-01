function digitalClock() {
    setInterval(() => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");

        document.getElementById("digitalClock").textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);
}

function countdownTimer(targetDate) {
    const countdownDisplay = document.getElementById("countdownDisplay");
    const interval = setInterval(() => {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            clearInterval(interval);
            countdownDisplay.textContent = "Таймер завершено";
            return;
        }

        const seconds = Math.floor((diff / 1000) % 60);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        countdownDisplay.textContent = `Залишилось: ${days}д ${hours}г ${minutes}хв ${seconds}с`;
    }, 1000);
}

// Відлік до дня народження
function birthdayCountdown(birthdayStr) {
    const birthdayDisplay = document.getElementById("birthdayDisplay");
    const now = new Date();
    let birthday = new Date(birthdayStr);
    birthday.setFullYear(now.getFullYear());

    if (birthday < now) {
        birthday.setFullYear(now.getFullYear() + 1);
    }

    const diff = birthday - now;
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diff / (1000 * 60 * 60 * 24)) % 30);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    birthdayDisplay.textContent = `До ДН залишилось: ${months}міс ${days}д ${hours}г ${minutes}хв ${seconds}с`;
}

document.addEventListener("DOMContentLoaded", () => {
    digitalClock();

    document.getElementById("startCountdown").addEventListener("click", () => {
        const targetDate = new Date(document.getElementById("countdownInput").value);
        countdownTimer(targetDate);
    });

    document.getElementById("startBirthdayCountdown").addEventListener("click", () => {
        const birthday = document.getElementById("birthdayInput").value;
        birthdayCountdown(birthday);
    });
});
