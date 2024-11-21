document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('openModalBtn').addEventListener('click', function() {
    console.log("Button clicked!");
    document.querySelector('.booking_modal_step_2').style.display = 'block'; 
  });
});

async function fetchBookingDetails(challengeId, date) {
  try {
    const availableTimesResponse = await fetchAvailableTimes(challengeId, date);
    if (availableTimesResponse.success) {
        populateTimes(availableTimesResponse.data); 
    } else {
        console.error('Error fetching available times:', availableTimesResponse.error);
    }

    const participantsResponse = await fetchParticipants(challengeId);
    if (participantsResponse.success) {
        populateParticipants(participantsResponse.data); 
    } else {
        console.error('Error fetching participants:', participantsResponse.error);
    }
} catch (error) {
    console.error('Error fetching booking details:', error);
}
}

function populateTimes(times) {
  const timeSelect = document.getElementById('booking-time');
  timeSelect.innerHTML = ''; 

  if (times.length === 0) {
      const option = document.createElement('option');
      option.value = '';
      option.textContent = 'No available times';
      timeSelect.appendChild(option);
  } else {
      times.forEach(time => {
          const option = document.createElement('option');
          option.value = time; 
          option.textContent = time;
          timeSelect.appendChild(option);
      });
  }
}



function populateParticipants(participants) {
  const participantsSelect = document.getElementById('booking-participants');
  participantsSelect.innerHTML = ''; 

  if (participants.length === 0) {
      const option = document.createElement('option');
      option.value = '';
      option.textContent = 'No participants available';
      participantsSelect.appendChild(option);
  } else {
      participants.forEach(participant => {
          const option = document.createElement('option');
          option.value = participant; 
          option.textContent = `${participant} participants`;
          participantsSelect.appendChild(option);
      });
  }
}

async function fetchParticipants(challengeId) {
  try {
      const participants = [2, 3, 4, 5, 6]; 
      return { success: true, data: participants };
  } catch (error) {
      console.error('Error fetching participants:', error);
      return { success: false, error: error.message };
  }
}
// Validate email
const emailInput = document.getElementById('booking-email');
emailInput.addEventListener('input', function (event) {
  if (!isValidEmail(event.target.value)) {
      emailInput.setCustomValidity('Please enter a valid email address');
  } else {
      emailInput.setCustomValidity('');
  }
});

function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

// Close modal when clicking outside
window.onclick = function (event) {
  const step2Modal = document.getElementById('step2');
  if (event.target === step2Modal) {
      step2Modal.style.display = 'none';
  }
};


const challengeId = 3; 
const selectedDate = '2024-11-22'; 

fetchBookingDetails(challengeId, selectedDate);
    timeSelect.innerHTML = '';