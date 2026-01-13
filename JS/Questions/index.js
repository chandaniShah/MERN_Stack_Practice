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