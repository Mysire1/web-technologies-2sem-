console.log("Завдання 1");

class Lamp {
    constructor(type = 'звичайна') {
        this.type = type;
        this.isOn = false;
        this.brightness = 100;
    }

    toggle() {
        this.isOn = !this.isOn;
        console.log(`${this.type} лампочка ${this.isOn ? "увімкнена" : "вимкнена"}`);
    }

    setBrightness(value) {
        if (["світлодіодна", "енергозберігаюча"].includes(this.type)) {
            this.brightness = value;
            console.log(`Яскравість змінено на ${this.brightness}%`);
        } else {
            console.log("Яскравість змінювати не можна для цього типу лампочки.");
        }
    }

    autoOff(timeout = 300000) {
        console.log(`Автовимкнення через ${timeout / 60} секунд.`);
        setTimeout(() => {
            this.isOn = false;
            console.log(`Лампочка ${this.type} автоматично вимкнена через ${timeout / 60} секунд.`);
        }, timeout);
    }
}

const lamp = new Lamp("енергозберігаюча");
lamp.toggle();
const brightness = prompt("Введіть яскравість лампочки (0-100):");
lamp.setBrightness(Number(brightness));
lamp.autoOff(5000);
