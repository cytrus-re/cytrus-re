let rInt = NaN;
let gInt = 34;
let bInt = 9;

if (rInt || bInt || gInt > 255 || isNaN(rInt || gInt || bInt)) {
    return console.log("error")
}
