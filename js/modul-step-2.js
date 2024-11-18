document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('openModalBtn').addEventListener('click', function() {
    console.log("Button clicked!");
    document.querySelector('.booking_modal_step_2').style.display = 'block'; 
  });
});

window.onclick = function(event) {
  if (event.target == step2) {
    modal.style.display = "none";
  }
}


var booking_modal_step_2 = document.getElementById("step2")