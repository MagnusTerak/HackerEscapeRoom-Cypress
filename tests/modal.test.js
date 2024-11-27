const { openBookingModal } = require('../js/modal1.js');

document.body.innerHTML = `
  <div class="booking-modal" style="display: none;">
    <div class="booking-modal__step" id="step1">Step 1</div>
    <div class="booking-modal__step" id="step2">Step 2</div>
    <div class="booking-modal__step" id="step3">Step 3</div>
  </div>
`;

describe('Modal Open Functionality', () => {
    it ('Display should be displayed when openBookingModal function is called', () => {
        const modal = document.querySelector('.booking-modal');

        openBookingModal(); //Calling function

        expect(modal.style.display).toBe('block');


    });
});