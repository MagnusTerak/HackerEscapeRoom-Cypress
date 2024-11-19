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

    // Checkbox divs
    const checkDivMain = document.createElement("div");
    filterBox.appendChild(checkDivMain);
    checkDivMain.classList.add("filter__box__checkDivMain");

    const checkDiv2 = document.createElement("div");
    checkDivMain.appendChild(checkDiv2);
    checkDiv2.classList.add("filter__box__checkDivMain__checkDiv2");

    const checkDiv3 = document.createElement("div");
    checkDivMain.appendChild(checkDiv3);
    checkDiv3.classList.add("filter__box__checkDivMain__checkDiv3");

    const checkDiv4 = document.createElement("div");
    checkDivMain.appendChild(checkDiv4);
    checkDiv4.classList.add("filter__box__checkDivMain__checkDiv4");

    // Checkboxes
    const checkBoxTitle = document.createElement("h4");
    checkBoxTitle.innerHTML = "By type";
    checkDiv2.appendChild(checkBoxTitle);
    checkBoxTitle.classList.add("filter__box__checkDiv__title");

    const checkBox1 = document.createElement("input");
    checkBox1.type = ("checkbox");
    checkBox1.id = "DOM__checkBox1";
    checkDiv3.appendChild(checkBox1);
    checkBox1.classList.add("filter__box__checkDiv__checkbox1");

    const checkBoxLabel1 = document.createElement("label");
    checkBoxLabel1.htmlFor = "DOM__checkBox1";
    checkBoxLabel1.appendChild(document.createTextNode("Include online challenges"));
    checkDiv3.appendChild(checkBoxLabel1);
     
    const checkBox2 = document.createElement("input");
    checkBox2.type = ("checkbox");
    checkBox2.id = ("DOM__checkBox2")
    checkDiv4.appendChild(checkBox2);
    checkBox2.classList.add("filter__box__checkDiv__checkbox2");

    const checkBoxLabel2 = document.createElement("label");
    checkBoxLabel2.htmlFor = "DOM__checkBox1";
    checkBoxLabel2.appendChild(document.createTextNode("Include on-site challenges"));
    checkDiv4.appendChild(checkBoxLabel2);

}

function closeFilterModal() {
    filterBtn.classList.remove("filter__hidden");
    destroyFilterBox();
}

function destroyFilterBox() {
    const filterBox = document.querySelector(".filter__box");
    filterBox.remove();
}