/**
 * Initializes the Add Task Board page by loading contacts.
 *
 * @returns {Promise<void>}
 */
async function initAddTaskBoardPage() {
    await loadContacts();
}


// Assigned to ON
let checkboxStates = {};

/**
 * Loads contacts from local storage.
 *
 * @returns {Promise<void>}
 */
async function loadContacts() {
    try {
        const saveContacts = JSON.parse(await getItem('saveContacts')) || [];
        loadCheckboxStates();
        dropdownContentList(saveContacts);
        updateSelectedContactsDisplay();
    } catch (e) {
        console.info('Could not load contacts');
    }
}

/**
 * Loads checkbox states from local storage.
 *
 * @returns {void}
 */
function loadCheckboxStates() {
    try {
        checkboxStates = JSON.parse(localStorage.getItem('checkboxStates')) || {};
    } catch (e) {
        console.info('Could not load checkbox states');
    }
}

/**
 * Saves checkbox states to local storage.
 *
 * @returns {void}
 */
function saveCheckboxStates() {
    localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
}

/**
 * Generates HTML content for the dropdown list based on saved contacts.
 *
 * @param {Array<Object>} saveContacts - The array of saved contacts.
 * @returns {void}
 */
function dropdownContentList(saveContacts) {
    const dropdownContainer = document.getElementById('dropdownContainer');
    let htmlContent = generateDefaultDropdownItem();
    if (saveContacts) {
        htmlContent += generateContactDropdownItems(saveContacts);
    }
    dropdownContainer.innerHTML = htmlContent;
    const dropdownObjects = document.querySelectorAll('.dropdown-object');
    dropdownObjects.forEach(obj => {
        const checkbox = obj.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.checked = checkboxStates[checkbox.value] || false;
            obj.addEventListener('click', () => {
                toggleCheckbox(checkbox);
            });
            checkbox.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }
    });
}

/**
 * Generates HTML markup for the default dropdown item.
 *
 * @returns {string} HTML string for the default dropdown item.
 */
function generateDefaultDropdownItem() {
    return `
        <div class="dropdown-object">
            <span>Join Guest</span>
            <input id="0" type="checkbox" value="Join Guest" data-id="0" ${checkboxStates['Join Guest'] ? 'checked' : ''}>
        </div>
    `;
}

/**
 * Generates HTML markup for dropdown items based on provided contacts.
 *
 * @param {Array<{name: string}>} contacts - Array of contact objects with names to be used in dropdown.
 * @returns {string} HTML string representing dropdown items for each contact.
 */
function generateContactDropdownItems(contacts) {
    return contacts.map(contact => `
        <div class="dropdown-object">
            <span>${contact.name}</span>
            <input type="checkbox" value="${contact.name}" ${checkboxStates[contact.name] ? 'checked' : ''}>
        </div>
    `).join('');
}

/**
 * Toggles the checked state of a checkbox and updates the global checkboxStates object.
 *
 * @param {HTMLInputElement} checkbox - The checkbox element to toggle.
 */
function toggleCheckbox(checkbox) {
    checkbox.checked = !checkbox.checked;
    checkboxStates[checkbox.value] = checkbox.checked;
    saveCheckboxStates();
    updateSelectedContactsDisplay();
}

/**
 * Updates the display of selected contacts' initials.
 */
function updateSelectedContactsDisplay() {
    const showClickC = document.getElementById('showClickC');
    showClickC.innerHTML = '';
    for (const [contact, isChecked] of Object.entries(checkboxStates)) {
        if (isChecked) {
            const initials = contact.split(' ').map(name => name.charAt(0)).join('');
            showClickC.innerHTML += `<div class="contact-initial">${initials}</div>`;
        }
    }
}

// Initial load
document.addEventListener('DOMContentLoaded', loadContacts);
// Assigned to OFF