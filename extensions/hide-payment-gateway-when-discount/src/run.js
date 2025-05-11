// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
const NO_CHANGES = {
  operations: [],
};

function hasDiscount(cost) {
  const subtotal = parseFloat(cost.subtotalAmount.amount),
    total = parseFloat(cost.totalAmount.amount),
    tax = parseFloat(cost.totalTaxAmount?.amount || "0"),
    duty = parseFloat(cost.totalDutyAmount?.amount || "0");
  return subtotal > (total + tax + duty);
}

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */

export function run(input) {
  if (!hasDiscount(input.cart.cost)) return NO_CHANGES;

  // find the payment method to hide
  const hidePaymentMethod = input.paymentMethods.find(method => method.name.includes("Cash on Delivery"));
  if (!hidePaymentMethod) return NO_CHANGES;

  return {
    operations: [
      {
        hide: {
          paymentMethodId: hidePaymentMethod.id
        }
      }
    ]
  }
};