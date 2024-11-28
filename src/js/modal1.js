import { fetchAvailableTimes, fetchChallengeDetails } from "./apiService.js";
import '@/styles/layouts/modal.scss';

// variable declaration: 
const modal = document.querySelector('.booking-modal');
const steps = document.querySelectorAll('.booking-modal__step');
const step1 = document.querySelector('#step1');
const step2 = document.querySelector('#step2');
const step3 = document.querySelector('#step3');
const dateInput = document.querySelector('.custom__date');
const roomTitle = document.querySelector('.modal__content-loading');
const searchAvailableTimesBTN = document.querySelector('.booking__search-btn');

// let challengeId= 1;

function showSteps(stepNumber){
    modal.style.display='block';
    steps.forEach((step, index) => {
        step.style.display = index + 1 === stepNumber ? 'block' : 'none';
        step.classList.toggle('booking-modal__step--active', index + 1 === stepNumber);
    });
}

// document.addEventListener('DOMContentLoaded', () => {
//     // Responsive text depending on input
//     const dateInput = document.querySelector('.custom__date');
//     if (dateInput) {
//       dateInput.addEventListener('keydown', (event) => event.preventDefault());
//     } else {
//       console.warn('.custom__date element is not found in the DOM.');
//     }

//   });
  const loadRoomTitle = async (challengeId) => {
    try {
      // Fetch challenge details
      const { success, data, error } = await fetchChallengeDetails(challengeId);
      if (success) {
        const { title } = data;
        if (title) {
          roomTitle.textContent = title;
        } else {
          roomTitle.textContent = 'Room Title Not Found';
        }
      } else {
        console.error('Failed to load room title:', error);
        roomTitle.textContent = 'Error Loading Room Title';
      }
    } catch (err) {
      console.error('Error loading room title:', err);
      roomTitle.textContent = 'Error Loading Room Title';
    }
  };
  


// console.log(document.querySelector('.booking__searchAvailableTimesBTN'));
console.log(document.querySelector('.custom__date'));
/*Ronjas modal script*/ 


export const openBookingModal = (challengeId) => {
    if (!challengeId) {
        console.error('No challengeId provided to openBookingModal');
        return;
    }
    
    modal.style.display = 'block';
    console.log(`Modal is now displayed for challengeId: ${challengeId}`);
    loadRoomTitle(challengeId); 
    showSteps(1);
};



//Responsive text depending on input
dateInput.addEventListener('keydown', (event) => event.preventDefault());

const clearAvailableTimes = () => {
    const existingTimesContainer = document.querySelector('.available-times');
    if (existingTimesContainer) existingTimesContainer.remove();
    dateInput.value='';  //Clearing the datefield
};

const displayAvailableTimes = async (challengeId, selectedDate) => {
    try {
        const { success, data, error } = await fetchAvailableTimes(challengeId, selectedDate);
        if (success) {
            const timesContainer = document.querySelector('#step2 .user_booking_time #booking-time');
            // Clear existing options
            while (timesContainer.options.length > 1) {
                timesContainer.remove(1);
            }
            // Populate new time options
            data.forEach((time) => {
                const option = document.createElement('option');
                option.value = time;
                option.textContent = time;
                timesContainer.appendChild(option);
            });
            console.log('Available times updated in Step 2.');
        } else {
            console.error('Error fetching available times:', error);
        }
    } catch (err) {
        console.error('Error fetching available times:', err);
    }
};

searchAvailableTimesBTN.addEventListener('click', async (event) => {
    event.preventDefault();

    const selectedDate = dateInput.value;
    if (!selectedDate) {
        alert('Please select a valid date.');
        dateInput.focus();
        return;
    }
    await displayAvailableTimes(challengeId, selectedDate);
    showSteps(2);
});
// const displayAvailableTimes = (availableTimes) => {
//     clearAvailableTimes ();
//     const timesContainer = document.createElement('div');
//     timesContainer.classList.add('available-times');
    
//     //Looping thru all the times to create a list for every available time
//     availableTimes.data.forEach((time) => {
//         const timeButton = document.createElement('button'); //Creating a li-element
//         timeButton.classList.add('time-slot');
//         timeButton.addEventListener('click', () => {
//             showSteps(2);
//             console.log(`Time selected: ${time}`);
//         });
//         timesContainer.appendChild(timeButton);
//     });

//     const modalContent = document.querySelector('#step1 .modal__content');
//     modalContent.textContent = `Loading available times`;
//     modalContent.appendChild(timesContainer);
    
//     console.log('Available times are successfully displayed'); //Testing
// };

searchAvailableTimesBTN.addEventListener('click', async (event) => {
    event.preventDefault();

    const selectedDate = dateInput.value;
    if (!selectedDate) {
        alert('Please select a valid date.');
        dateInput.focus();
        return;
    }

    if (!challengeId) {
        console.error('Error: challengeId is undefined.');
        return;
    }

    await displayAvailableTimes(challengeId, selectedDate);
    showSteps(2);
});


// const finishBookingButton = document.querySelector('.booking__finish-btn');
// finishBookingButton.addEventListener('click', (event) => {
//     event.preventDefault();

//     //Need logic here to finnish the booking. API stuff 
//     modal.style.display = 'none';
//     showSteps(3);
//     console.log('Showing step 3');
// });

// const confirmationMessage = document.createElement('p');
// confirmationMessage.textContent = 'thanks';
// step3.appendChild(confirmationMessage);


document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.booking-modal');
    modal.style.display = 'none';
    console.log('Modal is hidden when page is loaded');
});