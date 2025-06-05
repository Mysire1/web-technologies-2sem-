function fibonacciNumbers () {
    let n1 = 0;
    let n2 = 1;
    let count = 0;
    do {
        console.log(n1)
        let next = n1 + n2;
        n1 = n2;
        n2 = next;
        count++;
    }while (count <= 10)
}

console.log("Числа Фібоначчі", fibonacciNumbers())