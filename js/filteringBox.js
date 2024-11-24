import { getChallengesArray } from "./displayAllChallenges.js";
import TCard from "./temporary.js";

const filterBtn = document.querySelector(".filter__button");
filterBtn.addEventListener("click", openFilterModal);

// Debounce delay for smoother operation
let searchDebounceTimer;
const searchDebounceDelay = 400;
let searchField;

// Variable for toggletracing
let activeTag = null;

// Array for the dynamic tags
let dynamicTagButtons = [];

function openFilterModal() {
    const filterSection = document.querySelector(".filter");
    filterBtn.classList.add("filter__hidden");

    // filterBox
    const filterBox = document.createElement("box");
    filterSection.appendChild(filterBox);
    filterBox.classList.add("filter__box");

    // topDiv
    const topDiv = document.createElement("div");
    filterBox.appendChild(topDiv);
    topDiv.classList.add("filter__box__topDiv");
    
    // topDiv title
    const title = document.createElement("h2");
    title.innerHTML = "Filter challenges";
    topDiv.appendChild(title);
    title.classList.add("filter__box__topDiv__title");

    // Close button
    const closeFilterButton = document.createElement("button");
    topDiv.appendChild(closeFilterButton);
    closeFilterButton.classList.add("filter__box__topDiv__closeFilterBtn");
    closeFilterButton.innerHTML = "X";
    closeFilterButton.addEventListener("click", closeFilterModal);

    // Checkbox divs
    const checkDivMain = document.createElement("div");
    filterBox.appendChild(checkDivMain);
    checkDivMain.classList.add("filter__box__checkDivMain");

    const checkDiv2 = document.createElement("div");
    checkDivMain.appendChild(checkDiv2);
    checkDiv2.classList.add("filter__box__checkDivMain__checkDiv2");

    const checkDiv3 = document.createElement("div");
    checkDivMain.appendChild(checkDiv3);
    checkDiv3.classList.add("filter__box__checkDivMain__checkDiv3");

    const checkDiv4 = document.createElement("div");
    checkDivMain.appendChild(checkDiv4);
    checkDiv4.classList.add("filter__box__checkDivMain__checkDiv4");

    // Checkboxes
    const checkBoxTitle = document.createElement("h4");
    checkBoxTitle.textContent = "By type";
    checkDiv2.appendChild(checkBoxTitle);
    checkBoxTitle.classList.add("filter__box__checkDiv__title");

    const checkBox1 = document.createElement("input");
    checkBox1.type = ("checkbox");
    checkBox1.id = "DOM__checkBox1";
    checkBox1.checked = true;
    checkDiv3.appendChild(checkBox1);
    checkBox1.classList.add("filter__box__checkDiv__checkbox1");
    checkBox1.addEventListener("change", () => executeSearch(searchField.value));

    const checkBoxLabel1 = document.createElement("label");
    checkBoxLabel1.htmlFor = "DOM__checkBox1";
    checkBoxLabel1.appendChild(document.createTextNode("Include online challenges"));
    checkDiv3.appendChild(checkBoxLabel1);
     
    const checkBox2 = document.createElement("input");
    checkBox2.type = ("checkbox");
    checkBox2.id = ("DOM__checkBox2")
    checkBox2.checked = true;
    checkDiv4.appendChild(checkBox2);
    checkBox2.classList.add("filter__box__checkDiv__checkbox2");
    checkBox2.addEventListener("change", () => executeSearch(searchField.value));

    const checkBoxLabel2 = document.createElement("label");
    checkBoxLabel2.htmlFor = "DOM__checkBox2";
    checkBoxLabel2.appendChild(document.createTextNode("Include on-site challenges"));
    checkDiv4.appendChild(checkBoxLabel2);

    // Div-structure for dynamic tags
    const dynamicDivMain = document.createElement("div");
    filterBox.appendChild(dynamicDivMain);
    dynamicDivMain.classList.add("filter__box__dynamicDivMain")

    const dynamicDivTitle = document.createElement("div");
    dynamicDivMain.appendChild(dynamicDivTitle);
    dynamicDivTitle.classList.add("filter__box__dynamicDivMain__dynamicDivTitle")

    const dynamicDivTagContainer = document.createElement("div");
    dynamicDivMain.appendChild(dynamicDivTagContainer);
    dynamicDivTagContainer.classList.add("filter__box__dynamicDivMain__dynamicDivTagContainer");

    // Dynamic tags title
    const dynamicTagTitle = document.createElement("h4");
    dynamicTagTitle.textContent = "By tags";
    dynamicDivTitle.appendChild(dynamicTagTitle);
    dynamicTagTitle.classList.add("filter__box__dynamicDivMain__title");

    // Populate dynamic tags
    const challengesArray = getChallengesArray();
    updateDynamicTags(challengesArray);

    // Search field divs
    const searchDivMain = document.createElement("div");
    filterBox.appendChild(searchDivMain);
    searchDivMain.classList.add("filter__box__searchDivMain");

    const searchDiv2 = document.createElement("div");
    searchDivMain.appendChild(searchDiv2);
    searchDiv2.classList.add("filter__box__searchDivMain__searchDiv2");

    const searchDiv3 = document.createElement("div");
    searchDivMain.appendChild(searchDiv3);
    searchDiv3.classList.add("filter__box__searchDivMain__searchDiv3");

    // Search field
    const searchFieldTitle = document.createElement("h4");
    searchFieldTitle.textContent = "Or type to search for keywords";
    searchDiv2.appendChild(searchFieldTitle);
    searchFieldTitle.classList.add("filter__box__searchDiv__title");

    searchField = document.createElement("input");
    searchField.type = "search";
    searchField.id = "searchField-input";
    searchField.placeholder = "Start typing to filter";
    searchDiv3.appendChild(searchField);
    searchField.classList.add("filter__box__searchDiv__searchfield");
    searchField.addEventListener("input", debounceSearch);

}

function filterByTag(tag) {
    const challengesArray = getChallengesArray();
    const filteredResults = challengesArray.filter( challenge =>
        challenge.labels.some(label =>
            label.toLowerCase() === tag.toLowerCase())
        );   
    displaySearchResults(filteredResults);
}

function updateTagButtons() {
    dynamicTagButtons.forEach(button => {
        const buttonActive = button.textContent === activeTag;
        button.classList.toggle("active-tag", buttonActive);
    });
}

function toggleTagFilter(tag) {
    if (activeTag === tag) {
        activeTag = null;
    }
    else {
        activeTag = tag;
    }

    updateTagButtons();
    executeSearch(searchField ? searchField.value : "");
}

// Update the dynamic tags based on tags present in the filteredResults
function updateDynamicTags(filteredResults) {
    const dynamicDivTagContainer = document.querySelector(".filter__box__dynamicDivMain__dynamicDivTagContainer");
    dynamicDivTagContainer.textContent = "";
    const tags = getUniqueTags(filteredResults);
    dynamicTagButtons = [];
    console.log(dynamicTagButtons);

    tags.forEach(tag => {
        const tagButton = document.createElement("button");
        tagButton.classList.add("filter__box__dynamicDivMain__dynamicTag1");
        tagButton.textContent = tag;
        tagButton.addEventListener("click", () => toggleTagFilter(tag));
        dynamicDivTagContainer.appendChild(tagButton);
        dynamicTagButtons.push(tagButton);
    });
}

// Get unique tags from filteredResults
function getUniqueTags(filteredResults) {
    const tagSet = new Set();
    filteredResults.forEach(challenge => {
        challenge.labels.forEach(label => {
            tagSet.add(label);
        });
    });

    // Sort the tags in alohabetic order
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b)); 
}

// Delayed search from input event
function debounceSearch(event) {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => 
        executeSearch(event.target.value), searchDebounceDelay);

}

//Perform search on challenges array from case-insensitive userinput 
function executeSearch(query) {
    const challengesArray = getChallengesArray();
    console.log("All challenges:", challengesArray); 
    const onlineChecked = document.getElementById("DOM__checkBox1").checked;
    const onsiteChecked = document.getElementById("DOM__checkBox2").checked;
    const filteredResults = challengesArray.filter(challenge => {
        const matchesQuery =
            challenge.title.toLowerCase().includes(query.toLowerCase()) || 
            challenge.description.toLowerCase().includes(query.toLowerCase()) ||
            challenge.labels.some(label =>
                label.toLowerCase().includes(query.toLowerCase()));

        const matchesType = 
            (onlineChecked && challenge.type.toLowerCase() === "online") ||
            (onsiteChecked && challenge.type.toLowerCase() === "onsite");
            const matchesTag = !activeTag ||
            challenge.labels.some(label => label.toLowerCase() === activeTag.toLowerCase())
                return matchesQuery && matchesType && matchesTag;
            });

            updateDynamicTags(filteredResults);

            displaySearchResults(filteredResults);

}
 
// Prints filteredResults in DOM-element
function displaySearchResults(filteredResults) {
    const challengesListElement = document.querySelector (".challenges__list");
   
    // Clear list
    challengesListElement.textContent = ""; 

    // Errorhandling
    if (filteredResults.length === 0) {
        challengesListElement.textContent = "No matching challenges";
        return;
    }

    // Loop challenges and present in cards
    filteredResults.forEach((challengeData) => {
        const tCard = new TCard(
            challengeData.id,
            challengeData.title,
            challengeData.description,
            challengeData.type,
            challengeData.minParticipants,
            challengeData.maxParticipants,
            challengeData.rating,
            challengeData.image,
            challengeData.labels
        );

        const challengeElement = tCard.createTCard(tCard);

        challengesListElement.appendChild(challengeElement);
    });

}

function closeFilterModal() {
    filterBtn.classList.remove("filter__hidden");
    destroyFilterBox();
    
    // Reset filtering to show all challenges when filterbox is closed 
    const challengesArray = getChallengesArray();
    displaySearchResults(challengesArray);

}

function destroyFilterBox() {
    const filterBox = document.querySelector(".filter__box");
    filterBox.remove();
}