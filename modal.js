/*Ronjas modal script*/

/* I think this has to be in Elenas main script. I am trying to get the main html as background for my modal, with iframe.
But I slipped into making a function for the book-btn and now I am confused and not sure what to do. 

const openModalButton = document.querySelector('#openModalButton');
const modalIframe = document.querySelector('#modalIframe');

document.querySelector('#room__btn').addEventListener('click', function(){
    modalIframe.style.display= 'block';

});

function closeModal(){
    modalIframe.style.display='none';
} */