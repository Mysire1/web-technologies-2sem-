const array = [5,2,1,0]

function arrMaxMin (array) {
    let min = array[0];
    let max = array[0];

    for (let i = 0; i < array.length; i++){
        if (array[i] < min){
            min = array[i]
        }
        if (array[i] > max){
            max = array[i]
        }
    }

    return `Min: ${min}, Max: ${max}`;
}

console.log(arrMaxMin(array))
