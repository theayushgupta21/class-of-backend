// Fundamentals of Javascript
// arrays and objects
// functions  return
// async js coding
// foreach map filter find indexof

/*array*/
/*1> forEach
2> map
3> filter
4> find
5> indexOf
*/

// var arr = [1, 2, 3, 4, 5];

/*1> arr.forEach(function (val) {
    console.log(val + " hello ");

}) */
/*2> var ans = arr.map(function (val) {
    return val * 12;


})

console.log(ans);*/

/*3> var ans = arr.filter(function (val) {
    if (val >= 2) { return true; }
    else { return false; }
})
console.log(ans);
*/

/*4> var ans = arr.find(function (val) {
    if (val == 2) { return val; }
})
console.log(ans);*/

// var obj = {
//     name: "sachin",
//     age: 21
// };


/*var blob = await fetch("https://jsonplaceholder.typicode.com/posts");
var res = await blob.json();

console.log(res); */

const fs = require('fs');

fs.writeFile('example.txt', 'Hello, World!', (err) => {
    if (err) throw err;
    console.log('File has been saved!');
});