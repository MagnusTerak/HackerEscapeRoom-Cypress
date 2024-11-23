import { fetchAvailableTimes,fetchChallengeDetails, createReservation } from "./apiService.js";

const roomTitle = document.querySelector(".room-title");
const timeDropdown = document.querySelector("#booking-time");
const participantsDropdown = document.querySelector("#booking-participants");
const step2Modal = document.querySelector('#step2');
const form = document.querySelector("#user-booking");

let challengeId = 1;
const selectedDate = '2024-12-12';  // to make sure that we are getting the correct data as the apiTest


// helper functions: General function to update dropdown options
const updateDropdown = (dropdown, options) => {
  // Clear dropdown, keep only the placeholder
  while (dropdown.options.length > 1) {
    dropdown.remove(1);
  }

  // Populate dropdown with new options
  options.forEach(({ value, label }) => {
    const option = document.createElement("option");
    option.value = value; // Use start time (HH:mm) as the value
    option.textContent = label; // Use full range as the display text
    dropdown.appendChild(option);
  });
};

//********************************************************************* */
// we need to check with Ronja to pass the selected date from step1 
// add logic to fetch the date from step1 
//********************************************************************* */
console.log('challengeDetail From',fetchChallengeDetails(challengeId,selectedDate))
const loadRoomTitle = async (challengeId) => {
  try {
    // Fetch challenge details
    const { success, data, error } = await fetchChallengeDetails(challengeId);
    if (success) {
      const { title } = data;
      if (title) {
        roomTitle.textContent = title; 
      } else {
        roomTitle.textContent = "Room Title Not Found";
      }
    } else {
      console.error("Failed to load room title:", error);
      roomTitle.textContent = "Error Loading Room Title";
    }
  } catch (err) {
    console.error("Error loading room title:", err);
    roomTitle.textContent = "Error Loading Room Title";
  }
};



// Load participants dropdown based on challenge details
const loadParticipants = async (challengeId) => {
  try {
    const { success, data, error } = await fetchChallengeDetails(challengeId);
    if (success) {
      const { minParticipants, maxParticipants } = data;
      console.log('minParticipants:', minParticipants, 'maxParticipants:', maxParticipants); // Debug log
      populateParticipantsDropdown(minParticipants, maxParticipants);
    } else {
      console.error("Failed to load participants:", error);
    }
  } catch (err) {
    console.error("Error loading participants:", err);
  }
};

// Populate participants dropdown
const populateParticipantsDropdown = (minParticipants, maxParticipants) => {
  if (!minParticipants || !maxParticipants) {
    console.error("Invalid participant range");
    return;
  }
  for (let i = minParticipants; i <= maxParticipants; i++) {
    const option = document.createElement("option");
    option.value = i.toString();
    option.textContent = `${i} participant${i > 1 ? "s" : ""}`;
    participantsDropdown.appendChild(option);
  }
};

const loadAvailableTimes = async (challengeId, selectedDate) => {
  try {
    const { success, data: slots, error } = await fetchAvailableTimes(challengeId, selectedDate);
    if (success) {
      const timeRanges = slots.map((slot) => {
        // Parse start time into hours and minutes
        const [hours, minutes] = slot.split(':').map(Number);

        // Calculate end time (90 minutes later)
        const endTime = new Date();
        endTime.setHours(hours);
        endTime.setMinutes(minutes + 90);

        // Format end time as HH:mm
        const endHours = String(endTime.getHours()).padStart(2, '0');
        const endMinutes = String(endTime.getMinutes()).padStart(2, '0');
        const formattedEndTime = `${endHours}:${endMinutes}`;

        // Return an object with start time and range
        return {
          value: slot, // Start time (HH:mm)
          label: `${slot} - ${formattedEndTime}`, // Full time range
        };
      });

      // Update dropdown with the new time ranges
      updateDropdown(timeDropdown, timeRanges);
    } else {
      console.error("Failed to load available times:", error);
    }
  } catch (err) {
    console.error("Error loading available times:", err);
  }
};


// // Validate email
// const emailInput = document.querySelector('#booking-email');
// emailInput.addEventListener('input', function (event) {
//   if (!isValidEmail(event.target.value)) {
//       emailInput.setCustomValidity('Please enter a valid email address');
//   } else {
//       emailInput.setCustomValidity('');
//   }
// });

// function isValidEmail(email) {
//   const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   return regex.test(email);
// }


// // Close modal when clicking outside
// window.onclick = function (event) {
//   if (event.target === step2Modal) {
//       step2Modal.style.display = 'none';
//   }
// };


// fetchBookingDetails(challengeId, selectedDate);
// timeSelect.innerHTML = '';

// document.addEventListener('DOMContentLoaded', function() {
//   document.querySelector('#openModalBtn').addEventListener('click', function() {
//     console.log("Button clicked!");
//     document.querySelector('.booking_modal_step_2').style.display = 'block'; 
  
//   });
// });
// Load participants and available times on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  loadRoomTitle(challengeId);
  loadParticipants(challengeId);
  loadAvailableTimes(challengeId, selectedDate);
});