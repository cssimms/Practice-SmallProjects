/**
 * 
 * Practice attempt 11/ 11 ~ about an hour 
PART 1: implement a fuzzy search for matching foods to their synonyms, and whether they are
 compostable
  ex: tomatoes: yes, beef: no, cow: no, avocado: yes

  Search field should have the following requirements: 
    search button and input field should be touching in the middle
    rounded corners on the outside, but not where they are touching
    input should be taller than default
    input should be 2x wide as button
    button should be light blue

PART 2: once we get that working we'll try to add in parts of each food
  ex: avocado -> pit: no, fruit: yes, skin: yes
      peach -> pit: no, fruit: yes, skin: yes
      
*/

const foodDatabase = [
    'beet',
    'beef',
    'cow',
    'tomato',
    'avocado',
    'peach',
    'pear',
    'cucumber'
]

const foodDetails = {
    beet: {
        compostable: true
    },
    beef: {
        compostable: false,
    },
    cow: {
        synonym: 'beef'
    },
    tomato: {
        compostable: true
    },
    avocado: {
        compostable: true
    },
    peach: {
        compostable: true
    },
    pear: {
        compostable: true
    },
    cucumber: {
        compostable: true
    },
}

let currentResultFoods = []

const searchFoods = (searchTerm) => {
    if (searchTerm === '') {
        return []
    }
    return foodDatabase.filter((food) => food.includes(searchTerm))
}

const buildFoodDisplay = (food) => {
    const newFoodDiv = document.createElement('div')
    newFoodDiv.className = 'food-item'
    newFoodDiv.textContent = food
    return newFoodDiv
}

const renderEmptyResults = (resultsField) => {
    const emptyResultElement = document.createElement('div')
    emptyResultElement.textContent = 'No Results found'
    emptyResultElement.className = 'empty-results'
    emptyResultElement.id = 'empty-results'
    resultsField.replaceChildren(emptyResultElement)
}

const renderFoods = () => {
    const resultsField = document.getElementById('results')

    if (currentResultFoods.length < 1) {
        renderEmptyResults(resultsField)
    } else {
        const currentFoodList = currentResultFoods.map((food) => buildFoodDisplay(food))
        resultsField.replaceChildren(...currentFoodList)
    }
}

const updateSearch = (event) => {
    const searchInput = event?.target?.value
    console.log(searchInput)
    const searchResults = searchFoods(searchInput)
    console.log(searchInput, searchResults, currentResultFoods)
    currentResultFoods = searchResults
    renderFoods()
}

document.addEventListener('DOMContentLoaded', (event) => {
    renderFoods()
    const inputElement = document.getElementById('search-field')
    inputElement.addEventListener('input', updateSearch)
})


