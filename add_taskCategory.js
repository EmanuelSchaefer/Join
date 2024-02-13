/*Add Task Category JS*/

/**
 * Toggles the visibility of the category dropdown.
 *
 * @returns {void}
 */
function toggleDropdownCategory() {
    const dropdownOne = document.getElementById("dropdownCategoryContent");

    if (dropdownOne.classList.contains("d-none")) {
        dropdownOne.classList.remove("d-none");
    } else {
        dropdownOne.classList.add("d-none");
    }
}

/**
 * Renders the new category field and hides the open/close button.
 *
 * @returns {void}
 */
function renderNewCategoryField() {
    document.getElementById('opencloseBtninput').classList.remove('d-none');
    document.getElementById('newCategory').classList.add('d-none');
}

/**
 * Hides the open/close button and displays the new category field.
 *
 * @returns {void}
 */
function btnNewCy() {
    document.getElementById('opencloseBtninput').classList.add('d-none');
    document.getElementById('newCategory').classList.remove('d-none');
}


/*New Category*/
/**
 * Handles the action when the "New Category" button is clicked.
 *
 * @returns {void}
 */
function btnNewCy() {
    let categoryInput = document.getElementById('newCategoryInput').value;
    document.getElementById('dropdownCategoryContent').classList.add('d-none');
    document.getElementById('spanText').style.display = 'none';
    addCategoryInput(categoryInput);
    document.getElementById('newCategoryInput').value = '';
}

/**
 * Adds a new category input to the UI with the provided text.
 *
 * @param {string} text - The text to be displayed in the new category.
 * @returns {void}
 */
function addCategoryInput(text) {
    document.getElementById('spantextTwo').innerHTML = '';
    document.getElementById('spantextTwo').innerHTML += `
    <span id="lerSpan">${text}</span>
    <div class="category-color" style="background-color: black;">
    </div>
    `;
}


/*Category ON*/
/**
 * Handles the action when the "Sales" category field is clicked.
 *
 * @returns {void}
 */
function salesCategoryField() {
    let flex = document.getElementById('newCategory').value;
    document.getElementById('dropdownCategoryContent').classList.add('d-none');
    document.getElementById('spanText').style.display = 'none';
    document.getElementById('spantextTwo').innerHTML = '';
    flex = document.getElementById('spantextTwo').innerHTML += `
    <span id="lerSpan">
        <div class="flex-row" id="flex-row">
            <div id="newCategory">Sales</div>
            <div class="category-color" style="background-color: green;">
            </div>
        </div>
    </span>
    `;
}

/**
 * Handles the action when the "Marketing" category field is clicked.
 *
 * @returns {void}
 */
function marketingCategoryField() {
    let flex = document.getElementById('newCategory').value;
    document.getElementById('dropdownCategoryContent').classList.add('d-none');
    document.getElementById('spanText').style.display = 'none';
    document.getElementById('spantextTwo').innerHTML = '';
    flex = document.getElementById('spantextTwo').innerHTML += `
    <span id="lerSpan">
        <div class="flex-row">
            <div id="newCategory">Marketing</div>
            <div class="category-color" style="background-color: gray;"></div>
        </div>
    </span>
    `;
}

/**
 * Handles the action when the "Design" category field is clicked.
 *
 * @returns {void}
 */
function designCategoryField() {
    let flex = document.getElementById('newCategory').value;
    document.getElementById('dropdownCategoryContent').classList.add('d-none');
    document.getElementById('spanText').style.display = 'none';
    document.getElementById('spantextTwo').innerHTML = '';
    flex = document.getElementById('spantextTwo').innerHTML += `
    <span id="lerSpan">
        <div class="flex-row">
            <div id="newCategory">Design</div>
            <div class="category-color" style="background-color: blue;"></div>
        </div>
    </span>
    `;
}

/**
 * Handles the action when the "Code" category field is clicked.
 *
 * @returns {void}
 */
function codeCategoryField() {
    let flex = document.getElementById('newCategory').value;
    document.getElementById('dropdownCategoryContent').classList.add('d-none');
    document.getElementById('spanText').style.display = 'none';
    document.getElementById('spantextTwo').innerHTML = '';
    flex = document.getElementById('spantextTwo').innerHTML += `
    <span id="lerSpan">
        <div class="flex-row">
            <div id="newCategory">code</div>
            <div class="category-color" style="background-color: red;"></div>
        </div>
    </span>
    `;
}
/*Category OFF*/


/*Assigned to*/
/**
 * Toggles the visibility of the dropdown content and updates the content dynamically.
 *
 * @async
 * @returns {Promise<void>}
 */
async function toggleDropdown() {
    const dropdownTwo = document.getElementById("dropdownContent");
    dropdownTwo.classList.toggle("d-none");

    if (!dropdownTwo.classList.contains("d-none")) {
        await dropdownContentList(saveContacts);
    }
}