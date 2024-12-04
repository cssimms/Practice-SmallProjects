/*
refactoring my original with unit tests, better design, and more features!
for the original problem description see ./original-solution
*/


// started to think about classes, but what I'm really craving here are types. after this refactor I should think about getting typescript involved in my daily practice..
class Order {
    constructor(orderData) {
        this.items = orderData.items
        this.country = orderData.country
    }
}


export function calculateCost(itemData, quantity) {
    // iterate from 0 to quantity
    // check the costs ranges for i, and add that tier's cost to our total

    // keys that relate to the tier structure
    // values true | false depending on if we've applied that cost
    const fixedTierMap = {}
    let sum = 0
    const { costs: itemPriceTiers } = itemData

    for (let i = 1; i <= quantity; i++) {
        const currentPriceTier = itemPriceTiers.find((priceTier) => {
            const { maxQuantity, minQuantity } = priceTier
            const normalizedMax = maxQuantity ?? Infinity

            // Quantity is between min and max inclusive
            return minQuantity <= i && i <= normalizedMax
        })

        if (currentPriceTier.type === 'incremental') {
            sum += currentPriceTier.cost
        } else if (currentPriceTier.type === 'fixed') {
            // type should be 'fixed'
            const tierKey = `${currentPriceTier.minQuantity}${currentPriceTier.maxQuantity}`
            const thisTierCostApplied = fixedTierMap[tierKey]
            if (thisTierCostApplied) {
                // do nothing
                continue
            } else {
                sum += currentPriceTier.cost
                fixedTierMap[tierKey] = true
            }
        } else {
            // Do something with an invalid price tier type
            throw new Error('Invalid price tier type')
        }
    }

    return sum
}

export function calculateShippingCost(order, costMatrix) {
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
}
