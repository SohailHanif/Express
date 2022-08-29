function logger(value) {
  console.log(value);
}

function calculate(num1, num2) {
  let sum = num1 + num2;
  // Call second function inside first
  //   Can't control if logger is called
  logger(sum);
  return sum;
}

function calculateWithCallback(num1, num2, callback) {
  let sum = num1 + num2;
  // Call second function inside first
  callback(sum);
  return sum;
}

// calculate(5, 5);
// // Send logger as callback
// calculateWithCallback(5, 5, logger);
// // Send empty function as callback to not log
// calculateWithCallback(5, 5, () => {});

// Callback Hell
// firstFunction(args, function() {
//     secondFunction(args, function() {
//       thirdFunction(args, function() {
//         fourthFunction(args, function() {
//             fifthFunction(args, function() {
//                 // And so on…
//               });
//           });
//         });
//     });
//   });

// Promise Structure
// const myPromise = new Promise((resolve, reject) => {
//     resolve("Success")
//     // reject("Failed")
// })
// // Promise resolve callback called
// .then(value => {
//     console.log(value)
// })
// // Promise reject callback called
// .catch(err => {
//     console.log(err)
// })

// Alternate promise Structure
// Promise.resolve(null)
// // Promise resolve callback called
// .then(value => {
//     return 1
// })
// // Flow to run after each other
// .then(value => {
//     console.log(value)
//     return 2
// })
// .then(value => {
//     console.log(value)
//     return 3
// })
// .then(value => {
//     // Errors will glow to first catch
//     throw "Error Occured"
//     console.log(value)
//     return 4
// })
// .then(value => {
//     console.log(value)
//     return 5
// })
// // Promise reject callback called
// .catch(err => {
//     console.log(err)
// })

// Import fs module
let fs = require("fs");

// // Promise with async code to get file data
// new Promise((resolve, reject) => {
//   fs.readFile("package.json", (err, data) => {
//     if (err) {
//       reject(err);
//     } else {
//       resolve(data);
//     }
//   });
// })
//   // Promise resolve callback called
//   .then((data) => {
//     console.log(data.toString());
//   })
//   // Promise reject callback called
//   .catch((err) => {
//     console.log(err);
//   });

const util = require("util");
// // Convert readFile into a promise
let read = util.promisify(fs.readFile);
// // Call promise and create resolve function
// read("package.json")
// .then(data => {
//     console.log(data.toString())
// })

// // Create and resolve multiple promises to avoid callback hell
// Promise.all([
//   read("package.json"),
//   read("package-lock.json"),
//   read("index.js"),
// ]).then((data) => {
//   // Deconstruct data to individual promise responses
//   const [data1, data2, data3] = data;

//   console.log(data1.toString());
//   console.log(data2.toString());
//   console.log(data3.toString());
// });

// function a(){
//     return Promise.resolve("a")
// }

// async function b(){
//     return "b"
// }

// // Functions a and b both return a promise
// console.log(a())
// console.log(b())

// var run = async () => {
//   // Promise version
//   read("package.json").then((data) => {
//     console.log(data.toString());
//   });

//   // Async await result
//   const data = await(read("package.json"))
//   console.log(data.toString())
// };
// // Run async function
// run()

// var run_all = async () => {
//   // Promise version
//   Promise.all([
//     read("package.json"),
//     read("package-lock.json"),
//     read("index.js"),
//   ]).then((data) => {
//     // Deconstruct data to individual promise responses
//     const [data1, data2, data3] = data;

//     console.log(data1.toString());
//     console.log(data2.toString());
//     console.log(data3.toString());
//   });

//   // Async await result
//   const [data1, data2, data3] = await Promise.all([
//     read("package.json"),
//     read("package-lock.json"),
//     read("index.js"),
//   ]);
//   console.log(data1.toString());
//   console.log(data2.toString());
//   console.log(data3.toString());
// };
// // Run async function
// run_all();

// Generator
function* range(start, end){
    while(start < end){
        // Return value and wait until next execution
        yield start;
        start += 1
    }
}

for (i of range(1, 10)){
    console.log(i)
}
