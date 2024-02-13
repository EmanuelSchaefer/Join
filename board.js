/**
 * load Board
 */
async function loadBoard() {
    await loadAddTask();
    await updateHTML();
    await loadFromLocalStorage();
    await showCard();
}

//Drag and Drop ON
let toDo = [];
let inProgress = [];
let feedback = [];
let done = [];
let currentDraggedElement;

/**
 * Updates the HTML content for the to-do, in-progress, feedback, and done sections.
 * Filters tasks into their respective categories and renders the content accordingly.
 *
 * @async
 * @returns {Promise<void>}
 */
async function updateHTML() {
    filterTodos();
    renderTodoContent();
    renderInProgressContent();
    renderFeedbackContent();
    renderDoneContent();

    await setItem('toDo', JSON.stringify(toDo));
    await setItem('inProgress', JSON.stringify(inProgress));
    await setItem('feedback', JSON.stringify(feedback));
    await setItem('done', JSON.stringify(done));
}

/**
 * Loads task arrays from local storage and initializes global arrays.
 *
 * @async
 * @returns {Promise<void>}
 */
async function loadFromLocalStorage() {
    toDo = JSON.parse(await getItem('toDo')) || [];
    inProgress = JSON.parse(await getItem('inProgress')) || [];
    feedback = JSON.parse(await getItem('feedback')) || [];
    done = JSON.parse(await getItem('done')) || [];

    pushAddTask = [...toDo, ...inProgress, ...feedback, ...done];

    for (const card of pushAddTask) {
        card['lastDroppedCategory'] = card['lastDroppedCategory'] || card['status'];
    }
}

/**
 * Filters tasks into their respective categories (to-do, in-progress, feedback, done).
 */
function filterTodos() {
    toDo = pushAddTask.filter(t => t['status'] == 'toDo');
    inProgress = pushAddTask.filter(p => p['status'] == 'inProgress');
    feedback = pushAddTask.filter(f => f['status'] == 'feedback');
    done = pushAddTask.filter(d => d['status'] == 'done');
}

// render toDo
function renderTodoContent() {
    let statusArray = toDo;
    let array = 'toDo'
    renderStatusArray(statusArray, array);
}

// render inProgress
function renderInProgressContent() {
    let statusArray = inProgress
    let array = 'inProgress'
    renderStatusArray(statusArray, array);
}

// render feedback
function renderFeedbackContent() {
    let statusArray = feedback
    let array = 'feedback'
    renderStatusArray(statusArray, array);
}

// render done
function renderDoneContent() {
    let statusArray = done
    let array = 'done'
    renderStatusArray(statusArray, array);
}

/**
 * Renders tasks from a specific status array to the corresponding HTML container.
 *
 * @param {Array<Object>} statusArray - The array of tasks with a specific status.
 * @param {string} array - The identifier of the HTML container to render tasks.
 */
function renderStatusArray(statusArray, array) {
    let foundMatchingElement = false;
    const container = document.getElementById(array);
    container.innerHTML = '';

    if (statusArray.length !== 0) {
        const filteredArray = statusArray.filter(task => task['status'] === array);
        for (let i = 0; i < filteredArray.length; i++) {
            const task = filteredArray[i];
            task.innerHTML += showCard();
        }
        foundMatchingElement = true;
    }
    emptyCategory(foundMatchingElement, array)
}

/**
 * Checks if matching elements were found in a status array and renders an empty category message if not.
 *
 * @param {boolean} foundMatchingElement - Flag indicating whether matching elements were found.
 * @param {string} array - The identifier of the HTML container to check and render.
 */
function emptyCategory(foundMatchingElement, array) {
    if (!foundMatchingElement) {
        document.getElementById(array).innerHTML = renderEmptyCategory();
    }
}

// html
function renderEmptyCategory() {
    return `<div class="noTasks">No Tasks Card</div>`
}

/**
 * Initiates the dragging process for a card by setting the current dragged element.
 *
 * @param {string} cardCount - The unique identifier of the card being dragged.
 */
function startDragging(cardCount) {
    currentDraggedElement = cardCount;
}

/**
 * Handles the "drop" event by preventing the default behavior.
 *
 * @param {Event} ev - The drop event.
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Moves a card to the specified category and updates the HTML accordingly.
 *
 * @async
 * @param {string} category - The target category for the card.
 */
async function moveTo(category) {
    const movedCard = pushAddTask.find(card => card.id === currentDraggedElement);

    if (movedCard) {
        movedCard['lastDroppedCategory'] = movedCard['status'];
        movedCard['status'] = category;

        await setItem('pushAddTask', JSON.stringify(pushAddTask));
        updateHTML();
    }
}

/**
 * Adds a CSS class to highlight a specified element.
 *
 * @param {string} id - The ID of the element to be highlighted.
 */
function highlight(id) {
    document.getElementById(id).classList.add('drop-area-highlight');
}

/**
 * Removes a CSS class to remove the highlight from a specified element.
 *
 * @param {string} id - The ID of the element to remove the highlight from.
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drop-area-highlight');
}
// Drag and Drop OFF



// openAddTask...Popup ON
// Place the card in the correct section.
function openAddTaskPopupWithStatus(status) {
    localStorage.setItem('currentTaskStatus', status);
    openAddTaskPopup();
}

function openAddTaskToDoPopup() {
    openAddTaskPopupWithStatus('toDo');
}

function openAddTaskInProgressPopup() {
    openAddTaskPopupWithStatus('inProgress');
}

function openAddTaskFeedbackPopup() {
    openAddTaskPopupWithStatus('feedback');
}

function openAddTaskDonePopup() {
    openAddTaskPopupWithStatus('done');
}
// openAddTask...Popup OFF



// Card ON
let cardIdCounter = 0;
let cardCountArray = [];
/**
 * Renders and displays cards on the board based on their status.
 *
 * @async
 * @returns {Promise<void>}
 */
async function showCard() {
    const boardSections = ['toDo', 'inProgress', 'feedback', 'done'];

    for (const section of boardSections) {
        const dropBoardCard = document.getElementById(section);
        let htmlBoard = "";
        const sectionTasks = pushAddTask.filter(task => task['status'] === section);

        for (let i = 0; i < sectionTasks.length; i++) {
            const card = sectionTasks[i];
            const cardIndex = pushAddTask.indexOf(card);

            if (!card.id) {
                card.id = generateUniqueId();
            }

            let subtasksHtml = generateSubtasksHtml(card);
            let colorStyle = getColorStyle(card.color);
            let contactColorStyle = getContactColorStyle(card.categorys.spanText);
            htmlBoard += await createCardHTML(card, cardIndex, colorStyle, subtasksHtml, contactColorStyle);
        }

        if (sectionTasks.length === 0) {
            htmlBoard = renderEmptyCategory();
        }

        dropBoardCard.innerHTML = htmlBoard;
    }
}

/**
 * Generates HTML for displaying subtasks progress based on the completion status.
 *
 * @param {object} card - The card object containing subtask information.
 * @returns {string} The HTML representation of subtasks progress.
 */
function generateSubtasksHtml(card) {
    if (card.subtasks && card.subtasks.length > 0) {
        let completedSubtasks = 0;

        for (const subtask of card.subtasks) {
            if (subtask.completed) {
                completedSubtasks++;
            }
        }

        const progress = (completedSubtasks / card.subtasks.length) * 100;
        return `
            <div class="subtasksDiv" onclick="updateSubtaskStatus(${card.numbCard})">
                <progress value="${completedSubtasks}" max="${card.subtasks.length}"></progress>
                <p style="margin-left: 10px;">${completedSubtasks}/${card.subtasks.length}</p>
            </div>
        `;
    }
    return "";
}

// Generating a unique ID with numbers
function generateUniqueId() {
    return pushAddTask.length;
}

// Text is finished at max two lines
var meinDiv = document.getElementById('description');
(meinDiv, 2);

// colors for btnColor
function getColorStyle(color) {
    switch (color) {
        case "Urgent":
            return "#FF3D00";
        case "Medium":
            return "#FFA800";
        case "Low":
            return "#7AE229";
        default:
            return "black";
    }
}

// colors for firstBox
function getContactColorStyle(category) {
    switch (category) {
        case "Sales":
            return "green";
        case "Marketing":
            return "gray";
        case "Design":
            return "blue";
        case "code":
            return "red";
        default:
            return "black";
    }
}
// Card OFF



/**
 * Searches for tasks based on the input value and displays or hides cards accordingly.
 *
 * @returns {void}
 */
function searchForTaskByInput() {
    const searchInput = document.getElementById('searchInput');
    const searchText = searchInput.value;
    const cards = document.getElementsByClassName('cardContainer');

    for (const card of cards) {
        const cardText = card.innerText.toLowerCase();
        if (cardText.includes(searchText.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    }
}



// big card info ON
/**
 * Opens a detailed view of a card with additional information.
 *
 * @async
 * @param {number} cardCount - The index of the card to be displayed.
 * @returns {Promise<void>}
 */
async function openBigCard(cardCount) {
    const bigInfoContainer = document.getElementById('bigInfoCard');
    const backgroundAll = document.getElementById('backgroundAll');

    if (pushAddTask.length > 0) {
        cardCount = Math.min(cardCount, pushAddTask.length - 1);
        const selectedCard = pushAddTask[cardCount];

        if (selectedCard) {
            if (selectedCard.dueDate instanceof Promise) {
                selectedCard.dueDate = await selectedCard.dueDate;
            }

            const bigCardHTML = await generateBigCardHTML(selectedCard, cardCount);
            bigInfoContainer.innerHTML = bigCardHTML;
            backgroundAll.classList.remove('d-none');
            const imgCloseBig = document.getElementById('imgCloseBig');
            imgCloseBig.addEventListener('click', function () {
                closeBigCard();
            });
        }
    }
    backgroundAll.removeEventListener('click', backgroundClickListener);
    backgroundAll.addEventListener('click', backgroundClickListener);
}

/**
 * Generates HTML string for subtasks of a selected card.
 *
 * @async
 * @param {Object} selectedCard - Card object with subtasks.
 * @param {number} cardCount - Index of the card.
 * @returns {string} - HTML string of subtasks.
 */
async function generateSubtasksHTMLBig(selectedCard, cardCount) {
    let subtasksHtml = "";
    if (selectedCard.subtasks && selectedCard.subtasks.length > 0) {
        subtasksHtml = `
        <div class="pSameText">Subtasks:</div>
            <ul class="pSameText">
                ${selectedCard.subtasks.map((subtask, index) => `
                <li>
                    <input type="checkbox" id="subtaskCheckbox${index}" class="subtask-checkbox" ${subtask.completed ? 'checked' : ''} onchange="updateCheckboxStatus(${cardCount}, ${index})">
                    ${subtask.text}
                </li>
                `).join('')}
            </ul>
        `;
    }
    return subtasksHtml;
}

/**
 * Generates HTML for a 'big card' view of a selected card.
 *
 * @async
 * @param {Object} selectedCard - Card object with details to display.
 * @param {number} cardCount - Index of the card.
 * @returns {string} - HTML string for the big card view.
 */
async function generateBigCardHTML(selectedCard, cardCount) {
    const reversedDueDate = await reverseDate(selectedCard.dueDate);
    const subtasksHtml = await generateSubtasksHTMLBig(selectedCard, cardCount);

    const contactColorStyle = getContactColorStyle(selectedCard.categorys.spanText);
    const priorityColorStyle = getColorStyle(selectedCard.color);

    return bigCardHTMLinfo(contactColorStyle, selectedCard, reversedDueDate, priorityColorStyle, subtasksHtml, cardCount);
}

/**
 * Updates the status of a subtask checkbox and saves the changes to local storage.
 *
 * @async
 * @param {number} cardCount - The index of the card containing the subtask.
 * @param {number} subtaskIndex - The index of the subtask within the card.
 * @returns {Promise<void>}
 */
async function updateCheckboxStatus(cardCount, subtaskIndex) {
    const checkboxId = `subtaskCheckbox${subtaskIndex}`;
    const checkbox = document.getElementById(checkboxId);

    if (checkbox) {
        const selectedCard = pushAddTask[cardCount];
        if (selectedCard && selectedCard.subtasks && selectedCard.subtasks[subtaskIndex]) {
            selectedCard.subtasks[subtaskIndex].completed = checkbox.checked;
            pushAddTask[cardCount].subtasks[subtaskIndex].completed = checkbox.checked;
            showCard();
            await savePushAddTaskToLocalStorage();
        }
    }
}

/**
 * Saves the pushAddTask array to local storage as a JSON string.
 *
 * @async
 * @returns {Promise<void>}
 */
async function savePushAddTaskToLocalStorage() {
    await setItem('pushAddTask', JSON.stringify(pushAddTask));
}

/**
 * Displays the edit card interface with the details of the selected card.
 *
 * @param {number} cardCount - The index of the card to be edited.
 * @returns {void}
 */
let currentEditIndex = null;

async function btnEditCard(cardCount) {
    currentEditIndex = cardCount;
    document.getElementById('editCardAlldiv').classList.remove('d-none');
    const editCardAll = document.getElementById('editCardAlldiv');
    subtasksEditList = [];
    if (cardCount >= 0 && cardCount < pushAddTask.length) {
        const selectedCard = pushAddTask[cardCount];

        let subtasksHtml = "";
        if (selectedCard.subtasks && selectedCard.subtasks.length > 0) {
            subtasksEditList = [...selectedCard.subtasks];
            subtasksHtml = `
            <div class="pSameText">Subtasks:</div>
                <ul class="pSameText">
                    ${selectedCard.subtasks.map((subtask, index) => `
                    <li>
                        <input type="checkbox" id="subtaskCheckbox${index}" class="subtask-checkbox" ${subtask.completed ? 'checked' : ''} onchange="updateCheckboxStatus(${cardCount}, ${index})">
                        ${subtask.text}
                    </li>
                    `).join('')}
                </ul>
            `;
        }
        
    // Task HTML for editing the card.
        const htmlContent = editCardHTMLTask(`
        <ul class="pSameText">    
            ${selectedCard.subtasks.map((subtask, index) => `
            <li class="liRightDiv">
                <div class="nePunkt">
                    •
                    <span id="subtaskText${index}">${subtask.text}</span>
                </div> 
                <div class="dRight">
                    <p class="editP" onclick="editSubtaskText(${cardCount}, ${index})">Edit</p>
                    <p class="deleteP" onclick="deleteTextAy(${cardCount}, ${index})">Delete</p>
                </div>
            </li>
            `).join('')}
        </ul>`);
        editCardAll.innerHTML = htmlContent;
        setEditCardFormValues(selectedCard);
        changeColorEdit(selectedCard.color);
    }
    dropdownContentListEdit();
}

/**
 * Deletes a subtask from a specified card.
 *
 * @param {number} cardCount - Index of the card in the 'pushAddTask' array.
 * @param {number} index - Index of the subtask to delete.
 * @returns {void}
 */
function deleteTextAy(cardCount, index) {
    if (cardCount >= 0 && cardCount < pushAddTask.length) {
        const selectedCard = pushAddTask[cardCount];
        if (index >= 0 && index < selectedCard.subtasks.length) {
            selectedCard.subtasks.splice(index, 1);
            btnEditCard(cardCount);
        }
    }
}

/**
 * Enables editing of a subtask text. Converts the subtask text into an editable input field.
 *
 * @param {number} cardCount - Index of the card containing the subtask.
 * @param {number} index - Index of the subtask to edit.
 * @returns {void}
 */
function editSubtaskText(cardCount, index) {
    const subtaskTextElement = document.getElementById(`subtaskText${index}`);
    if (subtaskTextElement.querySelector('input')) {
        return;
    }

    const subtaskText = subtaskTextElement.innerText;
    const inputHtml = `<input type="text" id="editInput${index}" class="edit-input" value="${subtaskText}">`;
    subtaskTextElement.innerHTML = inputHtml;
    const inputElement = document.getElementById(`editInput${index}`);
    inputElement.focus();
    inputElement.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            saveEditedSubtask(cardCount, index);
        }
    });

    function handleClickOutside(event) {
        if (!inputElement.contains(event.target)) {
            saveEditedSubtask(cardCount, index);
            document.removeEventListener('click', handleClickOutside);
        }
    }

    setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
    }, 10);
}

/**
 * Saves the edited subtask text and updates the corresponding element in the UI.
 *
 * @param {number} cardCount - Index of the card containing the subtask.
 * @param {number} index - Index of the edited subtask.
 * @returns {void}
 */
function saveEditedSubtask(cardCount, index) {
    const editedText = document.getElementById(`editInput${index}`).value;
    subtasksEditList[index].text = editedText;
    pushAddTask[cardCount].subtasks[index].text = editedText;
    const subtaskTextElement = document.getElementById(`subtaskText${index}`);
    subtaskTextElement.innerText = editedText;
}

/**
 * Sets the values of the edit card form based on the selected card's details.
 *
 * @param {Object} selectedCard - The card object with details to populate the form.
 * @returns {void}
 */
function setEditCardFormValues(selectedCard) {
    document.getElementById('titleInputEdit').value = selectedCard.titleDescription.title;
    document.getElementById('descriptionEditI').value = selectedCard.titleDescription.description;
    document.getElementById('spantextTwoEdit').textContent = selectedCard.categorys.spanText;
    const selectedContactsArray = Array.isArray(selectedCard.selectedContacts) ? selectedCard.selectedContacts : [];
    setTimeout(() => {
        dropdownContentListEdit(selectedContactsArray);
    }, 500);
    document.getElementById('duedateE').value = selectedCard.dueDate;
}

/**
 * Deletes a card from the `pushAddTask` array and updates local storage, then reloads the board.
 *
 * @async
 * @param {number} cardCount - Index of the card to delete.
 */
async function btnDeleteCard(cardCount) {
    if (cardCount >= 0 && cardCount < pushAddTask.length) {
        pushAddTask.splice(cardCount, 1);
        await setItem('pushAddTask', JSON.stringify(pushAddTask));

        nummerCoundCard = 0;
        localStorage.setItem('nummerCoundCard', nummerCoundCard.toString());

        location.reload();
        closeBigCard();
        await loadBoard();
    } else {
        alert('Ungültige Kartennummer.');
    }
}

/**
 * Reverses the format of a given date string from 'YYYY-MM-DD' to 'DD-MM-YYYY' or vice versa.
 *
 * @param {string} date - The date string to reverse.
 * @returns {string} The reversed date string.
 */
function reverseDate(date) {
    if (typeof date === 'string') {
        return date.split('-').reverse().join('-');
    } else {
        console.error("Ungültige Eingabe für reverseDate:", date);
        return date;
    }
}

/**
 * Closes the detailed card view by hiding the background and clearing its content.
 */
function closeBigCard() {
    const backgroundAll = document.getElementById('backgroundAll');
    const bigInfoContainer = document.getElementById('bigInfoCard');
    backgroundAll.classList.add('d-none');
    bigInfoContainer.innerHTML = "";
    backgroundAll.removeEventListener('click', backgroundClickListener);
}

/**
 * checks whether you click on the background.
 */
function backgroundClickListener(event) {
    const bigInfoContainer = document.getElementById('bigInfoCard');
    const editCardDiv = document.getElementById('editCardAlldiv');
    if (!bigInfoContainer.contains(event.target) && !editCardDiv.contains(event.target)) {
        closeBigCard();
        clearEditPage();
    }
}
// big card info OFF


/**
 * open AddTask Popup
 */
function openAddTaskPopup() {
    document.getElementById('task-card').classList.remove('d-none');
    document.getElementById('backgroundTasksCard').classList.remove('d-none');
    document.getElementById('backgroundTasksCard').removeEventListener('click', backgroundTasksCardClickListener);
    document.getElementById('backgroundTasksCard').addEventListener('click', backgroundTasksCardClickListener);
}

/**
 * close AddTask Popup
 */
function closeBoardAddTasks() {
    document.getElementById('task-card').classList.add('d-none');
    document.getElementById('backgroundTasksCard').classList.add('d-none');
    document.getElementById('backgroundTasksCard').removeEventListener('click', backgroundTasksCardClickListener);
}

/**
 * Checks whether the background is clicked.
 */
function backgroundTasksCardClickListener(event) {
    const taskCard = document.getElementById('task-card');
    if (!taskCard.contains(event.target)) {
        closeBoardAddTasks();
    }
}