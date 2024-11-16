document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('openModalBtn').addEventListener('click', function() {
    console.log("Button clicked!");
    document.querySelector('.booking_modal_step_2').style.display = 'block'; // Show the modal
  });
});

// Optional: Close the modal when clicking outside the modal
document.querySelector('.booking_modal_step_2').addEventListener('click', function(e) {
  if (e.target === this) {
    this.style.display = 'none';  // Hide the modal if clicked outside
  }
});
