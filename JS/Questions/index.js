// /**
//  * calculateCartTotal
//  * @param {Array} cartItems - array of { name, price, qty }
//  * @param {number} taxRate - e.g. 0.18 for 18% GST
//  * @returns {Object} summary with totalItems, subTotal, tax, grandTotal
//  */
// function calculateCartTotal(cartItems, taxRate = 0.18) {
//   return cartItems.reduce(
//     (acc, item) => {
//       const itemTotal = item.price * item.qty;
//       acc.totalItems += item.qty;
//       acc.subTotal += itemTotal;
//       return acc;
//     },
//     { totalItems: 0, subTotal: 0, tax: 0, grandTotal: 0 }
//   );
// }

// // Usage example:
// const cart = [
//   { name: "Laptop", price: 50000, qty: 1 },
//   { name: "Mouse", price: 1000, qty: 2 },
//   { name: "Keyboard", price: 2000, qty: 1 }
// ];

// const summary = calculateCartTotal(cart);
// summary.tax = summary.subTotal * 0.18; // 18% tax
// summary.grandTotal = summary.subTotal + summary.tax;

// console.log("Cart Summary:", summary);
// // Output should look like:
// // Cart Summary: {
// //   totalItems: 4,
// //   subTotal: 54000,
// //   tax: 9720,
// //   grandTotal: 63720
// // }

// // Count Even Numbers in an Array

const numbers = [1, 2, 3, 4, 5, 6, 8];

// function countEvenNumbersFilter(arr) {
//   return arr.filter(num => num % 2 === 0).length;
// }

// function countEvenNumbersReduce(arr) {
//   return arr.reduce((count, num) => {
//     return num % 2 === 0 ? count + 1 : count;
//   }, 0);
// }

// function countEvenNumbers(arr) {
//   if (!Array.isArray(arr)) return 0;

//   return arr.reduce((count, value) => {
//     if (typeof value !== "number") return count;
//     if (value % 2 === 0) return count + 1;
//     return count;
//   }, 0);
// }

// countEvenNumbers([]);                // 0
// countEvenNumbers([1, 3, 5]);         // 0
// countEvenNumbers([2, 4, 6]);         // 3
// countEvenNumbers([-2, -3, -4]);      // 2
// countEvenNumbers([0, "2", null]);    // 1
// countEvenNumbers([1, 2, "3", 4]);    // 2

// write a function to calculate the sum of all numbers in an array
function sumArray(arr) {
  return arr.reduce((sum, num) => sum + num, 0);
}

console.log(sumArray([1, 2, 3, 4, 5])); 

function sumArray1(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }   
  return sum;
}

// console.log(sumArray1([1, 2, 3, 4, 5])); 

// write a function to find the factorial of a number
function factorial(n) {
  if (n < 0) return null;
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

// console.log(factorial(5)); 
// console.log(factorial(0));


// for loop, break, continue,  can we write for loop without the initialization and conditions.
// while loop -
// do while loop - feature/fault : the first iteration is guranteed as no condition is checked. At-least run one time.
// strings -  sequence of chars
// template string - ``
// difference btw creating string as a variable and as new String("Hello");
// 

// print numbers from 1 to 50 using for loop

// for (let i = 1; i <= 50; i++) {
//   console.log(i);
// }

// print even numbers from 1 to 100 using for loop

// for (let i = 2; i <= 100; i += 2) {
//   console.log(i);
// }

// print numbers from 100 to 1 in reverse order using for loop

// for (let i = 100; i >= 1; i--) {
//   console.log(i);
// }

// print multiplication table of a given number using for loop

// const num = 5;
// for (let i = 1; i <= 10; i++) {
//   console.log(`${num} x ${i} = ${num * i}`);
// }

// print the odd numbers from an array using for loop

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// for (let i = 0; i < arr.length; i++) {
//   if (arr[i] % 2 !== 0) {
//     console.log(arr[i]);
//   }
// }

// calculate the sum of all numbers in an array using for loop

let sum = 0;     
for (let i = 0; i < arr.length; i++) {
  sum += arr[i];
}
// console.log("Sum:", sum);

// Print the squares of numbers from 1 to 10.

for (let i = 1; i <= 10; i++) {
  console.log(`Square of ${i} is ${i * i}`);
} 

