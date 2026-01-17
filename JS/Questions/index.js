/**
 * calculateCartTotal
 * @param {Array} cartItems - array of { name, price, qty }
 * @param {number} taxRate - e.g. 0.18 for 18% GST
 * @returns {Object} summary with totalItems, subTotal, tax, grandTotal
 */
function calculateCartTotal(cartItems, taxRate = 0.18) {
  return cartItems.reduce(
    (acc, item) => {
      const itemTotal = item.price * item.qty;
      acc.totalItems += item.qty;
      acc.subTotal += itemTotal;
      return acc;
    },
    { totalItems: 0, subTotal: 0, tax: 0, grandTotal: 0 }
  );
}

// Usage example:
const cart = [
  { name: "Laptop", price: 50000, qty: 1 },
  { name: "Mouse", price: 1000, qty: 2 },
  { name: "Keyboard", price: 2000, qty: 1 }
];

const summary = calculateCartTotal(cart);
summary.tax = summary.subTotal * 0.18; // 18% tax
summary.grandTotal = summary.subTotal + summary.tax;

console.log("Cart Summary:", summary);
// Output should look like:
// Cart Summary: {
//   totalItems: 4,
//   subTotal: 54000,
//   tax: 9720,
//   grandTotal: 63720
// }

// Count Even Numbers in an Array

const numbers = [1, 2, 3, 4, 5, 6, 8];

function countEvenNumbersFilter(arr) {
  return arr.filter(num => num % 2 === 0).length;
}

function countEvenNumbersReduce(arr) {
  return arr.reduce((count, num) => {
    return num % 2 === 0 ? count + 1 : count;
  }, 0);
}

function countEvenNumbers(arr) {
  if (!Array.isArray(arr)) return 0;

  return arr.reduce((count, value) => {
    if (typeof value !== "number") return count;
    if (value % 2 === 0) return count + 1;
    return count;
  }, 0);
}

countEvenNumbers([]);                // 0
countEvenNumbers([1, 3, 5]);         // 0
countEvenNumbers([2, 4, 6]);         // 3
countEvenNumbers([-2, -3, -4]);      // 2
countEvenNumbers([0, "2", null]);    // 1
countEvenNumbers([1, 2, "3", 4]);    // 2

