import { fetchAvailableTimes } from "./apiService.js";

console.log(document.querySelector('.booking__searchButton'));
console.log(document.querySelector('.custom__date'));
/*Ronjas modal script*/ 
console.log("hello from modal 1"); //To see if it works

const modal = document.querySelector('.booking-modal');
const steps = document.querySelectorAll('.booking-modal__step')
const step1 = document.querySelector('#step1');
const step2 = document.querySelector('#step2');
const step3 = document.querySelector('#step3');

console.log(modal);

export const handleBookButtonClick = ()=>{
console.log('Hello from the book btn');
  
modal.style.display = 'block';
step2.style.display = 'none';
step3.style.display = 'none';
};

function showSteps(stepNumber){
    steps.forEach((step, index) => {
        step.style.display = index + 1 === stepNumber ? 'block' : 'none';
        step.classList.toggle('booking-modal__step--active', index + 1 === stepNumber);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    modal.style.display = 'none'; //Hidden modal in the start
    showSteps(1);
})

const searchButton = document.querySelector('.booking__search-btn');

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    showSteps(2); //Showing step 2 of modal
})



const dateInput = document.querySelector('.custom__date');

const displayAvailableTimes = (availableTimes) => {
    if(!Array.isArray(availableTimes.data)) {
        console.error('Invalid data format', availableTimes);
        return;
    }
    //Creating a list for the available times
    const timesContainer = document.createElement('ul');
    timesContainer.classList.add('available-times'); //Class 4 styling
    
    //Looping thru all the times to create a list for every available time
    availableTimes.data.forEach((time) => {
        const timeItem = document.createElement('li'); //Creating a li-element
        timeItem.textContent = time;
        timesContainer.appendChild(timeItem); //
    });

    const modalContent = document.querySelector('#step1 .modal__content');
    modalContent.appendChild(timesContainer);
    console.log('Available times are successfully displayed');
};

searchButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const selectedDate = dateInput.value;
    
    if (!selectedDate) {
        alert('Please, select a valid date!');
        dateInput.focus();
        return;
    }

    try {
        const availableTimes = await fetchAvailableTimes(3, selectedDate);

        if (availableTimes.success) {
            //Hide part 1 and continue to part 2 of modal
            showSteps(2);
            console.log('step2');
        } else{
            alert('Could not fetch. try again later.');
        }

    } catch (error) {
        alert('Could not fetch available times. Please try again later.');
    }
});

