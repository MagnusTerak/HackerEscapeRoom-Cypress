import { fetchAvailableTimes } from "./apiService.js";
//import' ../styles/layouts/scss/modal.scss';

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.booking-modal');
    modal.style.display = 'none';
    console.log('Modal is hidden when page is loaded');
});

console.log(document.querySelector('.booking__searchButton'));
console.log(document.querySelector('.custom__date'));
/*Ronjas modal script*/ 

const modal = document.querySelector('.booking-modal');
const steps = document.querySelectorAll('.booking-modal__step');
const step1 = document.querySelector('#step1');
const step2 = document.querySelector('#step2');
const step3 = document.querySelector('#step3');

export const openBookingModal = ()=>{
modal.style.display = 'block';
console.log('modal is now displayed');
showSteps(1);
};

function showSteps(stepNumber){
    modal.style.display='block';
    steps.forEach((step, index) => {
        step.style.display = index + 1 === stepNumber ? 'block' : 'none';
        step.classList.toggle('booking-modal__step--active', index + 1 === stepNumber);
    });
}

//Responsive text depending on input
const dateInput = document.querySelector('.custom__date');
dateInput.addEventListener('keydown', (event) => event.preventDefault());

const clearAvailableTimes = () => {
    const existingTimesContainer = document.querySelector('.available-times');
    if (existingTimesContainer) existingTimesContainer.remove();
    dateInput.value='';  //Clearing the datefield
};


const displayAvailableTimes = (availableTimes) => {
    clearAvailableTimes ();
    const timesContainer = document.createElement('div');
    timesContainer.classList.add('available-times');
    
    //Looping thru all the times to create a list for every available time
    availableTimes.data.forEach((time) => {
        const timeButton = document.createElement('button'); //Creating a li-element
        timeButton.classList.add('time-slot');
        timeButton.addEventListener('click', () => {
            showSteps(2);
            console.log(`Time selected: ${time}`);
        });
        timesContainer.appendChild(timeButton);
    });

    const modalContent = document.querySelector('#step1 .modal__content');
    modalContent.textContent = `Loading available times`;
    modalContent.appendChild(timesContainer);
    
    console.log('Available times are successfully displayed'); //Testing
};

const searchButton = document.querySelector('.booking__search-btn');
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
            displayAvailableTimes(availableTimes);
        } else {
            alert('Could not fetch. try again later.');
        }

    } catch (error) {
        alert('Could not fetch available times. Please try again later.');
    }
}); 

const finishBookingButton = document.querySelector('.booking__finish-btn');
finishBookingButton.addEventListener('click', (event) => {
    event.preventDefault();

    //Need logic here to finnish the booking. API stuff 
    modal.style.display = 'none';
    showSteps(3);
    console.log('Showing step 3');
});

const confirmationMessage = document.createElement('p');
confirmationMessage.textContent = 'thanks';
step3.appendChild(confirmationMessage);

