const filterBtn = document.querySelector(".filter__button");
filterBtn.addEventListener("click", openFilterModal);

function openFilterModal() {
    const filterSection = document.querySelector(".filter");
    filterBtn.classList.add("filter__hidden");

    // filterBox
    const filterBox = document.createElement("box");
    filterSection.appendChild(filterBox);
    filterBox.classList.add("filter__box");

    // topDiv
    const topDiv = document.createElement("div");
    filterBox.appendChild(topDiv);
    topDiv.classList.add("filter__box__topDiv");
    
    // topDiv title
    const title = document.createElement("h2");
    title.innerHTML = "Filter challenges";
    topDiv.appendChild(title);
    title.classList.add("filter__box__topDiv__title");

    // Close button
    const closeFilterButton = document.createElement("button");
    topDiv.appendChild(closeFilterButton);
    closeFilterButton.classList.add("filter__box__topDiv__closeFilterBtn");
    closeFilterButton.innerHTML = "X";
    closeFilterButton.addEventListener("click", closeFilterModal);
}

function closeFilterModal() {
    filterBtn.classList.remove("filter__hidden");
    destroyModal();
}

function destroyModal() {
    const filterBox = document.querySelector(".filter__box");
    filterBox.remove();
}