import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { calculateCost, calculateShippingCost } from './original-solution-refactor.js'

/* Test data */
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

describe('calculateShippingCost()', () => {
    it('us order should work', () => {
        const result = calculateShippingCost(usOrder, costMatrix)
        assert.equal(result, 14700)
    });
    it('ca order should work', () => {
        const result = calculateShippingCost(caOrder, costMatrix)
        assert.equal(result, 19100)
    });
});

describe('calculateCost()', () => {
    it('should count 2 laptops with fixed price correctly', () => {
        const result = calculateCost(itemData, 2)
        assert.equal(result, 1000)
    })

    it('should count 3 laptops with fixed and incremental price correctly', () => {
        const result = calculateCost(itemData, 3)
        assert.equal(result, 1900)
    })
})
