function array(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        result[i] = arr[i] + 1;
    }
    return result;
}

console.log("Кожне число збільшено на 1:", array([1, 2, 3, 4]));
