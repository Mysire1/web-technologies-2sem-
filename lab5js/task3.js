console.log("Завдання 3");

function digitalClock() {
    setInterval(() => {
        const now = new Date();
        console.log(
            `Годинник: ${now.getHours().toString().padStart(2, "0")}:` +
            `${now.getMinutes().toString().padStart(2, "0")}:` +
            `${now.getSeconds().toString().padStart(2, "0")}`
        );
    }, 1000);
}

function countdownTimer(targetDate) {
    const interval = setInterval(() => {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            clearInterval(interval);
            console.log("Таймер завершено");
            return;
        }

        const seconds = Math.floor((diff / 1000) % 60);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        console.log(`Залишилось: ${days}д ${hours}г ${minutes}хв ${seconds}с`);
    }, 1000);
}

function birthdayCountdown(birthdayStr) {
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

    console.log(`До ДН залишилось: ${months}міс ${days}д ${hours}г ${minutes}хв ${seconds}с`);
}

digitalClock();
countdownTimer(new Date("2025-04-25T11:30"))
birthdayCountdown("2005-12-10")

