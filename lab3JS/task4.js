array = ["apple", "banana", "fish", "bird"]
function filterOddStrings(arr) {
    return arr.filter(str => str.length % 2 !== 0);
}

console.log("Рядки з непарною довжиною:", filterOddStrings(array));