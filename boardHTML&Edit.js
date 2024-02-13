// HTML from create Card
async function createCardHTML(card, cardIndex, colorStyle, subtasksHtml, contactColorStyle) {
  const uniqueId = `cardContainer${cardIndex}`;

  return `
  <div draggable="true" data-card-id="${card.id}" ondragstart="startDragging(${card.id})" class="cardContainer" id="${uniqueId}">
    <div class="mobileN"> 
      <div class="firstBox" style="background-color: ${contactColorStyle};">
          <p>${card.categorys.spanText}</p>
      </div>
      <a class="dropdown-taskM" onclick="mobileDropDownTask('${uniqueId}')"><</a>
      <div class="mobile-droptaskList d-none" id="mobile-droptaskList-${uniqueId}">
        <div class="dropdown-taskS" onclick="mobileChangeS('toDo', '${uniqueId}')">To Do</div>
        <div class="dropdown-taskS" onclick="mobileChangeS('inProgress', '${uniqueId}')">In Progress</div>
        <div class="dropdown-taskS" onclick="mobileChangeS('feedback', '${uniqueId}')">Awaiting feedback</div>
        <div class="dropdown-taskS" onclick="mobileChangeS('done', '${uniqueId}')">Done</div>
      </div>
    </div>
    <div class="openBigCardS" onclick="openBigCard(${cardIndex})">  
      <div class="titleAnddescription">
          <h4>${card.titleDescription.title}</h4>
          <p class="description">${card.titleDescription.description}</p>
      </div>
      <div class="subtasksText">
          <p>${subtasksHtml}</p>
      </div>
      <div class="footer">
          <p class="selectedP">${card.selectedContacts}</p>
          <p class="colorP" style="color: ${colorStyle};">${card.color}</p>
      </div>
    </div>
  </div>
  `;
}


// HTML from the Big info Card
function bigCardHTMLinfo(contactColorStyle, selectedCard, reversedDueDate, priorityColorStyle, subtasksHtml, cardCount) {
  let contactsArray = Array.isArray(selectedCard.selectedContacts)
    ? selectedCard.selectedContacts
    : selectedCard.selectedContacts.split(', ');
  const contactsFormatted = contactsArray.map(contact => `• ${contact.trim()}`).join('<br>');

  return `
  <div class="containerAllBigCard">
      <div style="background-color:${contactColorStyle}" class="spanTextBig">${selectedCard.categorys.spanText}</div>
      <img id="imgCloseBig" class="imgCloseBig" alt="Close big Card" src="img/close.svg">
      <h5 style="font-size: 40px; font-weight: 600; margin-bottom: 10px;">${selectedCard.titleDescription.title}</h5>
      <p style="color: #A8A8A8; font-size: 23px;">${selectedCard.titleDescription.description}</p>
      <div class="containerBodyInfo">
          <p class="pSame">Due date: ${reversedDueDate}</p>
          <div class="priorityTwo">
              <p class="pSame">Priority: </p>
              <p class="pSame" style="margin-left: 10px; color:${priorityColorStyle};">${selectedCard.color}</p>
          </div>
          <div class="assignedTwo">
              <p class="pSame">Assigned To: </p>
              <p class="pSame" style="color: #29abe2; margin-left: 10px;">${contactsFormatted}</p>
          </div>
          <p class="pSame">${subtasksHtml}</p>
      </div>
      <div class="deletebtnEdit">
          <button class="btnDEclass" id="btnDeleteCard" onclick="btnDeleteCard(${cardCount})">Delete</button>
          <button class="btnDEclass" id="btnEditCard" onclick="btnEditCard(${cardCount})">Edit</button>
      </div>
  </div>
  `;
}


// Edit Card by Board
function editCardHTMLTask(subtasksHtml) {
  return `
  <form class="column-containerEdit" id="columnContainerEdit">
    <div class="column-leftEdit">
      <div class="titelDescriptionD">
        <div class="titleEdit">
          <p class="überAll">Title</p>
          <input class="titleInputE" id="titleInputEdit" type="text" placeholder="Enter a title..." required>
        </div>
        <div class="descriptionEdit">
          <p class="überAll">Description</p>
          <textarea class="descriptionInputE" id="descriptionEditI" placeholder="Enter a description..."></textarea>
        </div>
      </div>
      <div class="categoryAssignedToEdit" style="width: 280px;">
        <label>Category</label>
        <div id="notification" class="notification"></div>
        <label id="toggleDrop" for="dropdown">
          <div class="dropdown-min-cat" id="dropdownMinCategory">
            <div class="select-cat">
              <span id="spantextTwoEdit"></span>
              <img src="img/arrow_down_black.svg" alt="" />
            </div>
          </div>
          <div id="dropdownCategoryContent" class="dropdown-content">
            <div class="dropdown-content show" id="dropdownCategoryContent">
              <div class="dropdown-object" onclick="salesCategoryFieldEdit()">
                <div class="flex-row" id="flex-row">
                  <div id="newCategoryEdit">Sales</div>
                  <div class="category-color" style="background-color: green;"></div>
                </div>
              </div>
            </div>
            <div class="dropdown-content show" id="dropdownCategoryContent">
              <div class="dropdown-object" onclick="marketingCategoryFieldEdit()">
                <div class="flex-row">
                  <div id="newCategoryEdit">Marketing</div>
                  <div class="category-color" style="background-color: gray;"></div>
                </div>
              </div>
            </div>
            <div class="dropdown-content show" id="dropdownCategoryContent">
              <div class="dropdown-object" onclick="designCategoryFieldEdit()">
                <div class="flex-row">
                  <div id="newCategoryEdit">Design</div>
                  <div class="category-color" style="background-color: blue;"></div>
                </div>
              </div>
            </div>
            <div class="dropdown-content show" id="dropdownCategoryContent">
              <div class="dropdown-object" onclick="codeCategoryFieldEdit()">
                <div class="flex-row">
                  <div id="newCategoryEdit">code</div>
                  <div class="category-color" style="background-color: red;"></div>
                </div>
              </div>
            </div>
          </div>
        </label>
      </div>
      <div class="duedateEdit">
        <p class="überAll">Due Date</p>
        <input class="duedateInputE" id="duedateE" type="date" placeholder="Enter a description" name="input-dateE">
      </div>
    </div>

    <div class="column-rightEdit">
      <div class="centerREdit">
        <div class="assignedE" style="margin-bottom: 25px;">
          <label>Assigned to</label>
          <label for="dropdown">
            <div class="dropdown-min" id="dropdownMin">
              <span id="categoryTextField"> Select contacts to assign</span>
              <img src="img/arrow_down_black.svg" alt="" />
            </div>
          </label>
          <div id="dropdownContent" class="dropdown-content">
            <div id="dropdownContainerEdit" style="overflow-y: auto; height: 10vh;">
             
            </div>
          </div>
        </div>
        <label>Prio</label>

        <div id="prio" class="prio">
          <div class="prio-btn" id="prioUrgentEdit" onclick="changeColorEdit('UrgentEdit')">
            Urgent
            <img id="imgUrgentEdit" class="imgUrgentNormal" src="img/up-prio.svg">
            <img id="imgUrgentWhiteEdit" class="imgUrgentWhite d-none" src="img/PrioUrgentWhite.svg">
          </div>
          <div class="prio-btn" id="prioMediumEdit" onclick="changeColorEdit('MediumEdit')">
            Medium
            <img id="imgMediumEdit" class="imgMediumNormal" src="img/medium-prio.svg">
            <img id="imgMediumWhiteEdit" class="imgMediumWhite d-none" src="img/PrioMediumWhite.svg">
          </div>
          <div class="prio-btn" id="prioLowEdit" onclick="changeColorEdit('LowEdit')">
            Low
            <img id="imgLowEdit" class="imgLowNormal" src="img/low-prio.svg">
            <img id="imgLowWhiteEdit" class="imgLowWhite d-none" src="img/PrioLowWhite.svg">
          </div>
        </div>
      <label>Subtasks</label>
      <div class="subtask-containerEdit">
        <input style="border: none;" type="text" id="subtask-input-contentEdit" placeholder="Enter Subtask..." />

        <div id="subtaskOninput" style="display: flex">
          <div class="border-subtask"></div>
          <img class="hinzuImg" onclick="subtaskJsonEdit()" src="img/plusAddTask.svg" alt="hinzufügen">
        </div>
      </div>

      <div id="subtaskContentEdit" class="srollEditSubtask">${subtasksHtml}</div>

      <div class="action-button-container">
        <div style="font-size: 20px" id="clearTask" onclick="clearEditPage()" class="clear-task-btn">
          Close
          <img src="img/close.svg" />
        </div>
        <div class="add-task-btn" onclick="saveEditTask()">
          Ok
          <img src="img/check-white.svg" />
        </div>
      </div>
    </div>
  </form>
  `;
}



// Board Card JS ON
/**
 * Ändert den Status einer mobilen Karte und aktualisiert die Anzeige.
 *
 * @param {string} status - Der neue Status der Karte.
 * @param {string} uniqueId - Die eindeutige ID der Karte.
 * @returns {Promise<void>} - Ein Promise, das nach dem Aktualisieren der Karte aufgelöst wird.
 */
async function mobileChangeS(status, uniqueId) {
  const mobileDroptaskList = document.getElementById(`mobile-droptaskList-${uniqueId}`);
  const numbCard = extractNumbCardFromUniqueId(uniqueId);
  const selectedCard = pushAddTask.find(card => card.numbCard === numbCard);

  if (selectedCard) {
    selectedCard.status = status;
    const previousSection = selectedCard.status;
    const previousSectionCardCount = cardCountArray.find(entry => entry.section === previousSection);
    if (previousSectionCardCount) {
      previousSectionCardCount.cardCount--;
    }
    const newSectionCardCount = cardCountArray.find(entry => entry.section === status);
    if (newSectionCardCount) {
      newSectionCardCount.cardCount++;
    }
    await setItem('pushAddTask', JSON.stringify(pushAddTask));
    updateHTML();
  }
  mobileDroptaskList.classList.add('d-none');
}

/**
 * Extrahiert die Kartennummer aus der eindeutigen ID.
 *
 * @param {string} uniqueId - Die eindeutige ID der Karte.
 * @returns {number} - Die extrahierte Kartennummer.
 */
function extractNumbCardFromUniqueId(uniqueId) {
  return parseInt(uniqueId.replace('cardContainer', ''), 10);
}

/**
 * Zeigt oder versteckt die Dropdown-Liste für mobile Aufgaben.
 *
 * @param {string} uniqueId - Die eindeutige ID der Karte.
 */
function mobileDropDownTask(uniqueId) {
  const mobileDroptaskList = document.getElementById(`mobile-droptaskList-${uniqueId}`);
  if (mobileDroptaskList.classList.contains('d-none')) {
    mobileDroptaskList.classList.remove('d-none');
  } else {
    mobileDroptaskList.classList.add('d-none');
  }
  document.getElementById('backgroundAll').classList.add('d-none');
}
// Board Card JS OFF


// Edit JS ON
let categorySelected = false;

/**
 * Saves the modifications made to a task if a category is selected. Updates the task in the local storage and navigates back to the board view.
 *
 * @async
 */
async function saveEditTask() {
  if (!categorySelected) {
    showNotification('Bitte eine Category bestätigen.');
    return;
  }
  let editTitle = document.getElementById('titleInputEdit').value;
  let editDescription = document.getElementById('descriptionEditI').value;
  let editDueDate = document.getElementById('duedateE').value;
  let colorEdit = activePrioEdit.replace("Edit", "");
  let editContacts = Array.from(document.querySelectorAll('.dropdown-object input[type="checkbox"]:checked'))
  .map(checkbox => checkbox.previousElementSibling.innerText);

  if (currentEditIndex !== null && pushAddTask[currentEditIndex]) {
    let taskToUpdate = pushAddTask[currentEditIndex];
    taskToUpdate.titleDescription.title = editTitle;
    taskToUpdate.titleDescription.description = editDescription;
    taskToUpdate.categorys = await categoryClickedEdit();
    taskToUpdate.dueDate = editDueDate;
    taskToUpdate.selectedContacts = editContacts;
    taskToUpdate.color = colorEdit;
    taskToUpdate.subtasks = subtasksEditList;
  }
  await setItem('pushAddTask', JSON.stringify(pushAddTask));
  await updateHTML();
  window.location.href = "board.html";
}

/**
 * Displays a temporary notification message to the user.
 *
 * @param {string} message - The message to display in the notification.
 */
function showNotification(message) {
  let notificationElement = document.getElementById('notification');
  notificationElement.textContent = message;
  notificationElement.style.display = 'block';
  setTimeout(() => {
    notificationElement.style.display = 'none';
  }, 3500);
}


/**
 * Edits a subtask. Retrieves and trims input from 'subtask-input-contentEdit', updates the list if not empty, 
 * then clears the field.
 *
 * @async
 * @returns {void}
 */
async function subtaskJsonEdit() {
  const subtaskInputEdit = document.getElementById('subtask-input-contentEdit');
  const subtasksEdit = subtaskInputEdit.value.trim();

  if (subtasksEdit) {
    addSubTaskEdit(subtasksEdit);
    subtaskInputEdit.value = '';
  }
}

/**
 * Adds a new subtask to the list and UI.
 *
 * @async
 * @param {string} text - Subtask text.
 * @returns {void}
 */
let subtasksEditList = [];
async function addSubTaskEdit(text) {
  const subtaskContainerEdit = document.getElementById('subtaskContentEdit');
  const subtaskId = Date.now();
  const subtask = {
    id: subtaskId,
    text: text,
  };
  subtasksEditList.push(subtask);
  subtaskContainerEdit.innerHTML += `
  <div class="subtasksList" id="subtasksList_${subtaskId}">
      <div class="dLeft">
          <input style="cursor: pointer;" type="checkbox" id="checkboxInput_${subtaskId}">
          <p class="pText">${text}</p>
      </div>
      <div class="dRight">
          <p class="editP" onclick="editPText(${subtaskId})">Edit</p>
          <p class="deleteP" onclick="deleteText(${subtaskId})">Delete</p>
      </div>
  </div>
  `;
}


/**
 * Handles click events on categories. Retrieves text from clicked category and span elements.
 *
 * @async
 * @returns {{categoryText: string | null, spanText: string | null}} - Texts from the category and span elements.
 */
async function categoryClickedEdit() {
  const clickedCategoryElementEdit = document.getElementById('newCategoryEdit');
  const lerSpanElementEdit = document.getElementById('lerSpanEdit');

  if (clickedCategoryElementEdit) {
    const lastClickedTextEdit = clickedCategoryElementEdit.innerText;
    if (lerSpanElementEdit) {
      const lastClickedSpanTextEdit = lerSpanElementEdit.innerText;
      return { spanText: lastClickedSpanTextEdit };
    } else {
      return { categoryText: lastClickedTextEdit, spanText: null };
    }
  }
  return { spanText: null };
}


let activePrioEdit = 'Medium';
/**
 * Changes the color and style of priority elements based on the selected priority.
 *
 * @async
 * @param {string} priorityEditDaten - The selected priority.
 * @returns {void}
 */
async function changeColorEdit(priorityEditDaten) {
  let priorityEdit = priorityEditDaten + "Edit";

  if (priorityEdit === "UrgentEditEdit" || priorityEdit === "MediumEditEdit" || priorityEdit === "LowEditEdit") {
    priorityEdit = priorityEdit.slice(0, -4);
  }

  if (activePrioEdit !== null) {
    document.getElementById(`prio${activePrioEdit}`).classList.remove('active');
    document.getElementById(`img${activePrioEdit}`).classList.remove("d-none");
    document.getElementById(`prio${activePrioEdit}`).style.backgroundColor = "";
    document.getElementById(`prio${activePrioEdit}`).style.color = "";
  }
  document.getElementById(`prio${priorityEdit}`).classList.add('active');
  document.getElementById(`img${priorityEdit}`).classList.add("d-none");
  document.getElementById(`prio${priorityEdit}`).style.backgroundColor = getColorStyleEdit(priorityEdit);
  document.getElementById(`prio${priorityEdit}`).style.color = "white";
  activePrioEdit = priorityEdit;
} try {
  document.getElementById('prioMediumEdit').classList.add('active');
  document.getElementById('imgMediumEdit').classList.add("d-none");
  document.getElementById('prioMediumEdit').style.backgroundColor = getColorStyleEdit('MediumEdit');
  document.getElementById('prioMediumEdit').style.color = "white";
} catch (error) {
}

// Color for each button
function getColorStyleEdit(color) {
  switch (color) {
    case "UrgentEdit":
      return "#FF3D00";
    case "MediumEdit":
      return "#FFA800";
    case "LowEdit":
      return "#7AE229";
    default:
      return "black";
  }
}


/**
 * Generates HTML content for a dropdown list based on selected contacts.
 *
 * @param {string[]} selectedContacts - Array of selected contact names.
 * @returns {void}
 */
function dropdownContentListEdit(selectedContacts) {
  const dropdownContainerEdit = document.getElementById('dropdownContainerEdit');
  selectedContacts = Array.isArray(selectedContacts) ? selectedContacts : [];
  const isJoinGuestChecked = selectedContacts.includes("Join Guest");

  let htmlContentEdit = `
  <div class="dropdown-object" onclick="toggleCheckboxEdit('joinGuestCheckbox')">
      <span>Join Guest</span>
      <input type="checkbox" id="joinGuestCheckbox" class="inputEd" ${isJoinGuestChecked ? 'checked' : ''} onclick="event.stopPropagation();">
  </div>
  `;

  saveContacts.forEach((contact, index) => {
    const isChecked = selectedContacts.includes(contact.name);
    const checkboxId = `contactCheckbox${index}`;
    htmlContentEdit += `
          <div class="dropdown-object" onclick="toggleCheckboxEdit('${checkboxId}')">
              <span>${contact.name}</span>
              <input type="checkbox" id="${checkboxId}" class="inputEd" ${isChecked ? 'checked' : ''} onclick="event.stopPropagation();">
          </div>
      `;
  });
  dropdownContainerEdit.innerHTML = htmlContentEdit;
}

/**
 * Toggles the checked state of a checkbox and updates the list of selected contacts for editing.
 *
 * @param {string} checkboxId - The ID of the checkbox to toggle.
 */
function toggleCheckboxEdit(checkboxId) {
  const checkbox = document.getElementById(checkboxId);
  if (checkbox) {
    checkbox.checked = !checkbox.checked;
    updateSelectedContactsEdit(checkboxId);
  }
}

/**
 * Updates the console log based on the checked status of a contact checkbox.
 *
 * @async
 * @param {string} contactId - ID of the contact checkbox element.
 * @returns {void}
 */
async function updateSelectedContactsEdit(contactId) {
  const checkbox = document.getElementById(contactId);
  if (checkbox) {
    if (checkbox.checked) {
      console.log('Ausgewählt:', checkbox.nextElementSibling.innerText);
    } else {
      console.log('Nicht ausgewählt:', checkbox.nextElementSibling.innerText);
    }
  } else {
    console.error('Checkbox-Element nicht gefunden:', contactId);
  }
}


/*Category Edit ON*/
/**
 * Handles the action when the "Sales" category field is clicked.
 *
 * @returns {void}
 */
function salesCategoryFieldEdit() {
  categorySelected = true;
  let flex = document.getElementById('newCategory').value;
  document.getElementById('dropdownCategoryContent').classList.add('d-none');
  document.getElementById('spanText').style.display = 'none';
  document.getElementById('spantextTwoEdit').innerHTML = '';
  flex = document.getElementById('spantextTwoEdit').innerHTML += `
  <span id="lerSpanEdit">
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
function marketingCategoryFieldEdit() {
  categorySelected = true;
  let flex = document.getElementById('newCategory').value;
  document.getElementById('dropdownCategoryContent').classList.add('d-none');
  document.getElementById('spanText').style.display = 'none';
  document.getElementById('spantextTwoEdit').innerHTML = '';
  flex = document.getElementById('spantextTwoEdit').innerHTML += `
  <span id="lerSpanEdit">
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
function designCategoryFieldEdit() {
  categorySelected = true;
  let flex = document.getElementById('newCategory').value;
  document.getElementById('dropdownCategoryContent').classList.add('d-none');
  document.getElementById('spanText').style.display = 'none';
  document.getElementById('spantextTwoEdit').innerHTML = '';
  flex = document.getElementById('spantextTwoEdit').innerHTML += `
  <span id="lerSpanEdit">
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
function codeCategoryFieldEdit() {
  categorySelected = true;
  let flex = document.getElementById('newCategory').value;
  document.getElementById('dropdownCategoryContent').classList.add('d-none');
  document.getElementById('spanText').style.display = 'none';
  document.getElementById('spantextTwoEdit').innerHTML = '';
  flex = document.getElementById('spantextTwoEdit').innerHTML += `
  <span id="lerSpanEdit">
      <div class="flex-row">
          <div id="newCategory">code</div>
          <div class="category-color" style="background-color: red;"></div>
      </div>
  </span>
  `;
}
/*Category Edit OFF*/
// Edit JS OFF


// close Edit Card Page
function clearEditPage() {
  document.getElementById('columnContainerEdit').classList.add('d-none');
  document.getElementById('editCardAlldiv').classList.add('d-none');
}