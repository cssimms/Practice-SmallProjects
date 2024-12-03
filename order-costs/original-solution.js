// There are two different types of quantity based discounts: Fixed and incremental.



// Fixed: It doesn't matter how many items are in the range - the same amount is paid. So if there is a range from 0 - 5 with a cost of 500 it doesn't matter if there was one, two, three, four or five items ordered. The total cost for any number of units in that range would be 500.


// Incremental: Each unit in this range is charged an additional shipping cost per unit. This is what you implemented in part 2.



// The order remains unchanged and the shipping cost matrix has been updated like the following:



// Order:
// {
//   "country": "US", // or "CA" for the CA order
//   "items": [
//     {"product": "mouse", "quantity": 20},
//     {"product": "laptop", "quantity": 5}
//   ]
// }



// Shipping Cost:
// {
//   "US": [
//     {
//       "product": "mouse",
//       "costs": [
//         {
//           "type": "incremental",
//           "minQuantity": 0,
//           "maxQuantity": null,
//           "cost": 550
//         }
//       ]
//     },
//     {
//       "product": "laptop",
//       "costs": [

//         {
//           "type": "fixed",
//           "minQuantity": 0,
//           "maxQuantity": 2,
//           "cost": 1000
//         },
//         {
//           "type": "incremental",
//           "minQuantity": 3,
//           "maxQuantity": null,
//           "cost": 900
//         }
//       ]
//     }
//   ],
//   "CA": [
//     {
//       "product": "mouse",
//       "costs": [
//         {
//           "type": "incremental",
//           "minQuantity": 0,
//           "maxQuantity": null,
//           "cost": 750
//         }
//       ]
//     },
//     {
//       "product": "laptop",
//       "costs": [
//         {
//           "type": "fixed",
//           "minQuantity": 0,
//           "maxQuantity": 2,
//           "cost": 1100
//         },
//         {
//           "type": "incremental",
//           "minQuantity": 3,
//           "maxQuantity": null,
//           "cost": 1000
//         }
//       ]
//     }
//   ]
// }


// Update the function calculate_shipping_cost to now calculate shipping based upon the tiered discount.



// Examples:



// calculate_shipping_cost(order_us, shipping_cost) == 14700
// calculate_shipping_cost(order_ca, shipping_cost) == 19100
process.stdin.resume();
process.stdin.setEncoding("ascii");
var input = "";
process.stdin.on("data", function (chunk) {
    input += chunk;
});
process.stdin.on("end", function () {
    // now we can read/parse input
});



function calculateCost(itemData, quantity) {
    let sum = 0
    // iterate from 0 to quantity
    // check the costs ranges for i, and add that tier's cost to our total

    // keys that relate to the tier structure
    // values true | false depending on if we've applied that cost
    const fixedTierMap = {}

    for (let i = 1; i <= quantity; i++) {


        const tierCost = itemData.costs.find((data) => {
            const currentMax = data.maxQuantity ?? Infinity
            return data.minQuantity <= i && i <= currentMax
        })

        if (tierCost.type === 'incremental') {
            sum += tierCost.cost
        } else {
            // type should be 'fixed'
            const tierKey = `${tierCost.minQuantity}${tierCost.maxQuantity}`
            const thisTierCostApplied = fixedTierMap[tierKey]
            if (thisTierCostApplied) {
                // do nothing
            } else {
                sum += tierCost.cost
                fixedTierMap[tierKey] = true
            }
        }
    }

    return sum
}

function calculateShippingCost(order, costMatrix) {
    // find the country,
    const currentCountry = order.country

    // Array of products
    const costData = costMatrix[currentCountry]
    if (!costData) {
        return 0
    }

    // iterate through the products to add up the cost * quantity
    let sum = 0


    order.items.forEach((item) => {
        const itemData = costData.find((cost) => cost.product === item.product)

        const currentCost = calculateCost(itemData, item.quantity)

        sum += currentCost
    })

    return sum

    // error checking for when country doesn't exist,
    // order product doesn't exist in the costMatrix
}


const usOrder = {
    "country": "US", // or "CA" for the CA order
    "items": [
        { "product": "mouse", "quantity": 20 },
        { "product": "laptop", "quantity": 5 }
    ]
}
const caOrder = {
    "country": "CA", // or "CA" for the CA order
    "items": [
        { "product": "mouse", "quantity": 20 },
        { "product": "laptop", "quantity": 5 }
    ]
}

const costMatrix = {
    "US": [
        {
            "product": "mouse",
            "costs": [
                {
                    "type": "incremental",
                    "minQuantity": 0,
                    "maxQuantity": null,
                    "cost": 550
                }
            ]
        },
        {
            "product": "laptop",
            "costs": [
                {
                    "type": "fixed",
                    "minQuantity": 0,
                    "maxQuantity": 2,
                    "cost": 1000
                },
                {
                    "type": "incremental",
                    "minQuantity": 3,
                    "maxQuantity": null,
                    "cost": 900
                }
            ]
        }
    ],
    "CA": [
        {
            "product": "mouse",
            "costs": [
                {
                    "type": "incremental",
                    "minQuantity": 0,
                    "maxQuantity": null,
                    "cost": 750
                }
            ]
        },
        {
            "product": "laptop",
            "costs": [
                {
                    "type": "fixed",
                    "minQuantity": 0,
                    "maxQuantity": 2,
                    "cost": 1100
                },
                {
                    "type": "incremental",
                    "minQuantity": 3,
                    "maxQuantity": null,
                    "cost": 1000
                }
            ]
        }
    ]
}
const itemData = {
    "product": "laptop",
    "costs": [
        {
            "type": "fixed",
            "minQuantity": 0,
            "maxQuantity": 2,
            "cost": 1000
        },
        {
            "type": "incremental",
            "minQuantity": 3,
            "maxQuantity": null,
            "cost": 900
        }
    ]
}

console.log('2 laptops should be: 1000', calculateCost(itemData, 2))
console.log('3 laptops should be: 1900', calculateCost(itemData, 3))

console.log('us order should be 14700', calculateShippingCost(usOrder, costMatrix))
console.log('ca order should be 19100', calculateShippingCost(caOrder, costMatrix))