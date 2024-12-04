const _ = require('lodash');


//// Today we’re going to build a basic spreadsheet application like Google sheets or 
// Excel but much simpler. 
// Our spreadsheet, let’s call it OpenSheet, will only support cells 
// which hold either integers or formulas that sum two cells. 
// We need you to implement the following:
// 1. A "setter" method to set the contents of a cell to a value OR a function
// 2. A "getter" method to get the contents of a cell
// Example of how your setter could look
// set_cell("C1", "45")
// set_cell("B1", "10")
// set_cell("A1", "=C1+B1")
// Example of how your getter could look
// get_cell("A1") # should return 55 in this case

// Assumptions:
// 1. Cell values must be a valid string representing an integer or a 
//    formula prefixed with "="
// 2. The addition ("+") operation is the only operation performed by formulas
// 3. An error should be thrown if an empty cell is referenced 

class OpenSheet {
    constructor() {
        this.sheetMap = new Map()
        this.seenKeys = new Map()
    }

    isFormula(key) {
        return key[0] === '='
    }

    // TODO - store as numbers
    set_cell(key, value) {
        this.sheetMap.set(key, value)
    }

    get_cell(key) {
        const result = this.get_cell_recurse(key)
        this.seenKeys = new Map()
        return result
    }

    get_cell_recurse(key) {
        const valueInSheet = this.sheetMap.get(key)

        if (!valueInSheet) {
            console.log(new Error('Empty cell found!'))
            return
        }
        let valueToReturn = valueInSheet

        if (this.isFormula(valueInSheet)) {

            this.seenKeys.set(key, true)

            const formulaByPlus = valueInSheet.slice(1, valueInSheet.length).split('+')

            // Check for formula cycles
            const firstLookupKey = formulaByPlus[0]
            const secondLookupKey = formulaByPlus[1]
            console.log('keys!', firstLookupKey, secondLookupKey, this.seenKeys)
            if (this.seenKeys.has(firstLookupKey) || this.seenKeys.has(secondLookupKey)) {
                console.log(new Error('Formula key cycle detected!'))
                return
            }

            this.seenKeys.set(firstLookupKey, true)
            this.seenKeys.set(secondLookupKey, true)

            const firstValue = this.get_cell(firstLookupKey)
            const secondValue = this.get_cell(secondLookupKey)
            const formulaResult = Number(firstValue) + Number(secondValue)
            // do the formula stuff
            valueToReturn = formulaResult
        }

        return valueToReturn
    }
}


const sheet = new OpenSheet()
// console.log(sheet.set_cell("A"))
console.log(sheet.set_cell("C1", "45"))
console.log(sheet.set_cell("B1", "5"))
console.log(sheet.get_cell("C1")) // 45
console.log('should detect a formula', sheet.isFormula("=C1+B1"))

console.log('should store a formula', sheet.set_cell("A1", "=C1+B1"))
console.log('should return value of the formula', sheet.get_cell("A1")) // 50

sheet.set_cell('P1', '1')
sheet.set_cell('L1', '2')
sheet.set_cell('M1', '=P1+L1')
sheet.set_cell('A2', '=C1+M1')
console.log('should handle nested formula', sheet.get_cell('A2')) // 3 + 45 = 48
sheet.set_cell('R1', '=P1+R2')
sheet.set_cell('R2', '=P1+R1')
console.log('should detect cycles', sheet.get_cell('R2')) // should expect to see this error
console.log('regular M1', sheet.set_cell('M1', '=P1+L1'))
// should show error
// sheet.get_cell('bbb')



