/**
 * Represents the array to store contacts.
 * @type {Array}
 */
let saveContacts = [];

/**
 * Initializes the contact functionality by loading contacts and displaying the saved contacts list.
 *
 * @async
 */
async function initContact() {
    await loadContacts();
    await savedContactsList(saveContacts);
}

// Load Contacts
async function loadContacts() {
    try {
        saveContacts = JSON.parse(await getItem('saveContacts')) || [];
    } catch (e) {
        console.info('Could not load contacts');
    }
}

/**
 * Creates a new contact with provided details from input fields, saves it locally, and navigates to the contact page.
 *
 * @async
 */
async function createNewContact() {
    addButtonsCreate.disabled = true;
    try {
        const newContact = {
            name: inputName.value,
            email: inputEmail.value,
            phone: inputPhone.value,
            id: generateID(),
            color: generateRandomColor(),
        };

        await setItem(newContact.id, newContact);
        saveContacts.push(newContact);
        await setItem('saveContacts', JSON.stringify(saveContacts));

    } catch (error) {
        console.error('Fehler beim Speichern des Benutzers:', error);
    } finally {
        await savedContactsList(saveContacts);
        resetContactInput();
        window.location.href = 'contact.html?msg=Du hast dich erfolgreich registriert';
    }
}

/**
 * Clears the contact input fields and re-enables the create button.
 */
function resetContactInput() {
    inputName.value = '';
    inputEmail.value = '';
    inputPhone.value = '';
    addButtonsCreate.disabled = false;
}

/**
 * Clears input fields and closes the add contact modal or section.
 */
function closeAddContact() {
    resetContactInput();
    closeNewContacts();
}

// Contacts List ON
let containerIndex = 0;
let groupedContacts;

/**
 * Displays the saved contacts list in the specified container.
 *
 * @async
 * @param {Array} saveContacts - The array containing the saved contacts.
 */
async function savedContactsList(saveContacts) {
    let listContainer = document.getElementById('contacts-list');
    listContainer.innerHTML = '';

    if (saveContacts) {
        saveContacts.sort((a, b) => {
            const firstNameA = (a.name && typeof a.name === 'string') ? a.name.trim().split(' ')[0].toUpperCase() : '';
            const firstNameB = (b.name && typeof b.name === 'string') ? b.name.trim().split(' ')[0].toUpperCase() : '';
            return firstNameA.localeCompare(firstNameB);
        });

        groupedContacts = groupContactsByFirstLetter(saveContacts);
        Object.keys(groupedContacts).forEach((letter) => {
            listContainer.innerHTML += `
            <div class="lineContact"></div>
            <p class="pClass">${letter}</p>`;

            renderContactsByLetter(listContainer, groupedContacts[letter]);
        });
    }
}

/**
 * Puts contacts into a container, showing each with initials and color.
 *
 * @param {HTMLElement} listContainer - Where to place contacts.
 * @param {Array} contacts - Contacts to show.
 */
function renderContactsByLetter(listContainer, contacts) {
    contacts.forEach((foundContact) => {
        if (foundContact.name && typeof foundContact.name === 'string') {
            let firstName = foundContact.name.trim().split(' ')[0];
            let lastName = foundContact.name.trim().split(' ')[1];
            let short = (firstName ? firstName.charAt(0) : '') + (lastName ? lastName.charAt(0) : '');

            let iconColor = foundContact.color || generateRandomColor();
            containerIndex++;
            listContainer.innerHTML += savedContactsListHTML(foundContact, iconColor, short);
        }
    });
}

/**
 * Makes a simple ID for new contacts.
 *
 * @returns {number} A fresh ID.
 */
function generateID() {
    return containerIndex;
}

/**
 * Groups contacts by the first letter of their first name.
 *
 * @param {Array} contacts - The array containing the contacts to be grouped.
 * @returns {Object} An object where keys are first letters and values are arrays of contacts.
 */
function groupContactsByFirstLetter(contacts) {
    const groupedContacts = {};
    contacts.forEach((contact) => {
        let firstLetter = contact.name.trim().charAt(0).toUpperCase();
        if (!groupedContacts[firstLetter]) {
            groupedContacts[firstLetter] = [];
        }
        groupedContacts[firstLetter].push(contact);
    });
    return groupedContacts;
}

/**
 * Picks a random color from a predefined list.
 *
 * @returns {string} A hex color code.
 */
function generateRandomColor() {
    const colors = ['#ff7f50', '#40e0d0', '#ff69b4', '#1e90ff', '#ffd700', '#7cfc00', '#dda0dd', '#ff4500', '#87cefa'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

/**
 * Hides the details container.
 */
function backToC() {
    let detailsContainer = document.getElementById('detailsContacts');
    detailsContainer.classList.add('d-none');
}
// Contacts List OFF


/**
 * Opens the details view for a specific contact.
 *
 * @param {Object} foundContact - The contact object for which to display details.
 */
function openDetailsContact(clickedElement, foundContact) {
    let detailsContainers = document.querySelectorAll('.containerBoxList');
    detailsContainers.forEach(container => container.classList.remove('selected-container'));

    let detailsContainer = document.getElementById('detailsContacts');
    let firstName = foundContact.name.trim().split(' ')[0];
    let lastName = foundContact.name.trim().split(' ')[1];
    let initials = (firstName ? firstName.charAt(0) : '') + (lastName ? lastName.charAt(0) : '');

    detailsContainer.innerHTML = detailsContactsHTML(foundContact, initials);
    detailsContainer.classList.remove('d-none');

    clickedElement.classList.add('selected-container');
}

/**
 * Opens the edit view for a specific contact.
 *
 * @param {Object} foundContact - The contact object to edit.
 */
function editcontact(foundContact) {
    let editContactContainer = document.getElementById('editContact-container');
    let firstName = foundContact.name.trim().split(' ')[0];
    let lastName = foundContact.name.trim().split(' ')[1];
    let editFirstLastName = (firstName ? firstName.charAt(0) : '') + (lastName ? lastName.charAt(0) : '');

    editContactContainer.innerHTML = editcontactHTML(foundContact, editFirstLastName);
    editContactContainer.classList.remove('d-none');
    editContactContainer.removeEventListener('click', closeEditContactOnClick);
    editContactContainer.addEventListener('click', closeEditContactOnClick);
}


/*Open && Close, NewContact && MobileAddContact*/
/**
 * Opens the contact form by making it visible.
 * Removes and adds a click event listener to close the form when the background is clicked.
 */
function openNewContact() {
    const contactContainer = document.getElementById('contact-container');
    contactContainer.classList.remove('d-none');
    contactContainer.removeEventListener('click', closeContactContainerOnClick);
    contactContainer.addEventListener('click', closeContactContainerOnClick);
}

/**
 * Closes the contact form by hiding it.
 * This is achieved by adding the 'd-none' class.
 */
function closeNewContacts() {
    document.getElementById('contact-container').classList.add('d-none');
}

/**
 * Closes the mobile contact form.
 * Removes the click event listener that closes the form when the background is clicked.
 */
function closeAddContactMobile() {
    const contactContainer = document.getElementById('contact-container');
    contactContainer.classList.add('d-none');
    contactContainer.removeEventListener('click', closeContactContainerOnClick);
}

/**
 * Handles contact form closing when background is clicked.
 * Compares the target of the click event with the current target to determine if the background was clicked.
 * @param {Event} event - The click event that was fired.
 */
function closeContactContainerOnClick(event) {
    if (event.target === event.currentTarget) {
        closeAddContactMobile();
    }
}

/**
 * Close Edit contact
 */
function closeEditContacts() {
    document.getElementById('editContact-container').classList.add('d-none');
}

/**
 * closes Edit Contact Mobile
 */
function closeEditContactMobile() {
    let editContactContainer = document.getElementById('editContact-container');
    editContactContainer.classList.add('d-none');
    editContactContainer.removeEventListener('click', closeEditContactOnClick);
}

/**
 * Defines the function that will be called when the editContact container is clicked directly.
 */
function closeEditContactOnClick(event) {
    let editContactContainer = document.getElementById('editContact-container');
    if (event.target === editContactContainer) {
        closeEditContactMobile();
    }
}

/**
 * confirm input name. 
 */
function validateNameInput(input) {
    input.value = input.value.replace(/[^A-Za-zÄäÖöÜüß\s]/g, '');
}

/**
 *confirm input phone.
 */
function validatePhoneInput(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
}