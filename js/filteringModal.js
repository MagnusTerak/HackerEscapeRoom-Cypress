const filterBtn = document.querySelector(".filter__button");
filterBtn.addEventListener("click", openFilterModal);

function openFilterModal() {
    const filterSection = document.querySelector(".filter");
    filterBtn.classList.add("filter__hidden");

    // Div base for modal
    const modalBase = document.createElement("div");
    filterSection.appendChild(modalBase);
    modalBase.classList.add("filter__modal");

    // Header
    const header = document.createElement("header");
    modalBase.appendChild(header);
    header.classList.add("filter__modal__header");
    
    // Header title
    const title = document.createElement("h2");
    title.innerHTML = "Filter challenges";
    header.appendChild(title);
    title.classList.add("filter__modal__header__title");

    // Close button
    const btn = document.createElement("button");
    header.appendChild(btn);
    btn.classList.add("filter__modal__header__closeBtn");
    btn.innerHTML = "X";
    btn.addEventListener("click", closeFilterModal);
}

function closeFilterModal() {
    filterBtn.classList.remove("filter__hidden");
    destroyModal();
}

function destroyModal() {
    const parentNode = document.querySelector(".filter__modal");
    parentNode.remove();
}