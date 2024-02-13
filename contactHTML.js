function savedContactsListHTML(foundContact, iconColor, short) {
    return `
    <div onclick="openDetailsContact(this, ${JSON.stringify(foundContact).replace(/"/g, "'")})" class="containerBoxList" id="containerBoxList${foundContact.id}">
    <!--<button class="btnDl" onclick="btnDList(${foundContact.id})">Löschen</button>-->    
        <div class="containerBox">
            <div class="colorSo" style="background-color: ${iconColor};">
                <p class="profile">${short}</p>
            </div>
            <div class="boxSep">
                <p class="centerPname">${foundContact.name}</p>
                <p class="emailContact">${foundContact.email}</p>
            </div>
        </div>
    </div>
    `;
}


function detailsContactsHTML(foundContact, initials) {
    return `
    <div class="detailsBoxBig">
    <img class="backImgNone" src="img/arrow-left.svg" onclick="backToC()">
        <div class="boxNeighbor"> 
            <div class="colorSoBig" style="background-color: ${foundContact.color};">
                <p class="profileBig">${initials}</p>
            </div>
            <p class="pDetails">${foundContact.name}</p>
        </div>
        <div class="editdeleteContainer">
            <div class="editContainer">
                <img onclick="editcontact(${JSON.stringify(foundContact).replace(/"/g, "'")})" src="img/edit-contact-black.svg" alt="delete">            
            </div>
        </div>
        <div class="boxInformation">
            <p class="pInfo">Contact Information</p> 
            <div class="emailBox">
                <p class="pEmail">Email:</p>
                <p class="textEmail">${foundContact.email}</p>
            </div>
            <div class="phoneBox">
                <p class="pPhone">Phone:</p>
                <p class="textPhone">${foundContact.phone}</p>
            </div>
        </div>
    </div>
    `;
}


function editcontactHTML(foundContact, editFirstLastName) {
    return `
    <div class="main-contact show-overlay" id="main-contact">
        <div id="header-addContact">
            <div class="img-div">
                <img src="img/add-contact-join.svg" alt="Join image" style="width: 80px; margin-bottom: 10px;">
                <img src="img/close-white.svg" onclick="closeEditContactMobile()" class="white-close"
                alt="close-img">
            </div>
            <p id="edit-contact-headline" class="header-headline">Edit contact</p>
            <div class="header-line"></div>
        </div>
        <div id="form-addContact">
            <div class="closeContact-Img" onclick="closeEditContacts()"></div>
            <div class="contactNew-center">
                <div class="colorSoBig" style="background-color: ${foundContact.color};">
                    <p class="profileBig">${editFirstLastName}</p>
                </div>
                <form onsubmit="return false" class="create-new-contact" id="add-form">
                    <div class="contact-inputs">
                        <input required type="text" name="name" id="inputEditName" placeholder="Name" class="contacts-input"
                            onkeyup=""
                            onblur="" 
                            value="${foundContact.name}">
                        <img src="img/user.svg" alt="img-user" style="padding-right: 21px;">
                    </div>
                    <div class="contact-inputs">
                        <input type="email" name="email" id="inputEditEmail" placeholder="Email" required class="contacts-input"
                            onblur=""
                            value="${foundContact.email}">
                        <img src="img/email.svg" alt="img-email" style="padding-right: 21px;">
                    </div>
                    <div class="contact-inputs">
                        <input type="tel" name="phone" id="inputEditPhone" placeholder="Phone" required class="contacts-input"
                            onkeyup=""
                            onblur=""
                            value="${foundContact.phone}">
                        <img src="img/user.svg" alt="img-user" style="padding-right: 21px;">
                    </div>
                    <div id="contact-btn-add">
                        <button onclick="closeEditContact(${foundContact.id})" id="addButtonsCancel">
                            <p>Delete</p>
                        </button>
                        <button type="submit" id="addButtonsCreate" onclick="editSaveContact(${foundContact.id})">
                            <p>Save</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `;
}


/**
 * Removes a contact from the list and updates storage.
 *
 * @async
 * @param {string} foundContact - ID of the contact to delete.
 */
async function closeEditContact(foundContact) {
    const indexToDelete = saveContacts.findIndex(contact => contact.id === foundContact);

    if (indexToDelete !== -1) {
        saveContacts.splice(indexToDelete, 1);
        await setItem('saveContacts', JSON.stringify(saveContacts));
        await savedContactsList(saveContacts);
        document.getElementById('editContact-container').classList.add('d-none');
        document.getElementById('detailsContacts').innerHTML = '';
    }
}


/**
 * Updates contact details and saves changes.
 *
 * @async
 * @param {string} foundContact - ID of the contact to update.
 */
async function editSaveContact(foundContact) {
    const indexToSave = saveContacts.findIndex(contact => contact.id === foundContact);

    if (indexToSave !== -1) {
        saveContacts[indexToSave].name = document.getElementById('inputEditName').value;
        saveContacts[indexToSave].email = document.getElementById('inputEditEmail').value;
        saveContacts[indexToSave].phone = document.getElementById('inputEditPhone').value;
        await setItem('saveContacts', JSON.stringify(saveContacts));
        await savedContactsList(saveContacts);
        document.getElementById('editContact-container').classList.add('d-none');
        document.getElementById('detailsContacts').innerHTML = '';
    }
}