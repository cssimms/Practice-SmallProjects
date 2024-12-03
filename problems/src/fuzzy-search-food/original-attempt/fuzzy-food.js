/**
 PART 1: implement a fuzzy search for matching foods to their synonyms, and whether they are
 compostable

  ex: tomatoes: yes, beef: no, cow: no, avocado: yes





PART 2: once we get that working we'll try to add in parts of each food
*/

/* Mock data to be fetched on load, this is initial call that would return our list of foods to match input against. Note that this is a basic list of simple data so the user can search on foods very quickly. We want to supply the data to our user quickly so they don't need to wait around for additional data to load.

In practice I would put this data behind a simple GET - the exact endpoint woudld depend on what existing endpoints there are available to us. For example a GET to /foodlist or /foodsearch/list would be appropriate.
*/
const foodData = {
  meat: false,
  beef: false,
  pork: false,
  tomato: true,
  lettuce: true,
  avocado: true,
  onion: true,
  corn: true,
};
const fetchBasicFoodList = async () => {
  // In practice this would be our axios or fetch call to our endpoint. Simulating this with an async function.
  console.log("Fetching food list from API...");
  return foodData;
};

/* Result data to be rendered */
let searchResults = [];
/* List of food to search against, populated on load */
let basicFoodList = [];

/* On Load Logic */
/* We are appending default 'none-found' result here in js, rather than the html for two reasons. First of all, if something breaks the js, there is an easy visual indicator for our developers but might not be immediately obvious to our users. The list will show - 'could not search' instead of 'no result found', making it slightly faster to debug. Secondly, we want to be able to show the same 'no result found' message if the user types something that doesn't find a match, and having that message test come from the js makes it easy to keep messaging consisten across the user experience.*/
const defaultNoResultsMessage = "No Result Found";
const noFoodFoundResult = document.createElement("li");
noFoodFoundResult.appendChild(document.createTextNode(defaultNoResultsMessage));

const foodResultListId = "food-results";
const foodResultList = document.getElementById(foodResultListId);
foodResultList.replaceChildren(noFoodFoundResult);

/* Render Functions */
const reRenderResults = () => {
  if (searchResults.length < 1) {
    foodResultList.replaceChildren(noFoodFoundResult);
  } else {
    const newList = searchResults.map((result) => {
      const resultListItem = document.createElement("li");
      resultListItem.appendChild(document.createTextNode(result));
      return resultListItem;
    });

    foodResultList.replaceChildren(...newList);
  }
};

/* Event Handlers */
const handlePageLoaded = async () => {
  // fetches the food data and populates our local 'cache'
  fetchBasicFoodList().then((foodData) => {
    basicFoodList = Object.keys(foodData);
  });
};

const handleInputChange = (event) => {
  const searchTerm = event.target.value;
  console.log("searching for:", searchTerm);
  const filteredFoods = basicFoodList.filter((food) => {
    return food.match(searchTerm);
  });
  searchResults = filteredFoods;
  reRenderResults();
};

/* Setup our listeners to interact with the page */
document.addEventListener("DOMContentLoaded", handlePageLoaded);

const foodInputId = "food-input";
document
  .getElementById(foodInputId)
  .addEventListener("input", handleInputChange);
