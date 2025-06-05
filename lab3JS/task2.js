function simpleNum(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}
let simplenumbers = 0;
for (let i = 1; i <= 1000; i++) {
    if (simpleNum(i)) simplenumbers += i;
}

console.log("Сума всіх простих чисел:", simplenumbers);