let pushAddTask = [];

/**
 * Initializes the Add Task page by loading contacts and task data, and including HTML content.
 *
 * @async
 * @returns {Promise<void>}
 */
async function initAddTaskPage() {
    await loadContacts();
    await loadAddTask();
    includeLoad();
    includeLoad_mobile();
}

// load AddTask
async function loadAddTask() {
    try {
        pushAddTask = JSON.parse(await getItem('pushAddTask')) || [];
    } catch (e) {
        console.info('Could not load contacts');
    }
}



let nummerCoundCard = parseInt(localStorage.getItem('nummerCoundCard')) || 0;
/**
 * Adds a new task to the task list.
 *
 * @async
 * @returns {Promise<void>}
 */
async function addNewTask() {
    const taskData = {};

    taskData.numbCard = nummerCoundCard;
    nummerCoundCard++;

    taskData.titleDescription = await saveTitleDescription();
    taskData.categorys = await categoryClicked();
    const selectedContacts = Array.from(document.querySelectorAll('.dropdown-object input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.previousElementSibling.innerText);
    taskData.selectedContacts = selectedContacts;
    taskData.dueDate = await theDueDate();
    taskData.color = activePrio;
    taskData.subtasks = await collectSubtasks();
    taskData.status = localStorage.getItem('currentTaskStatus') || 'toDo';

    pushAddTask.push(taskData);
    await setItem('pushAddTask', JSON.stringify(pushAddTask));
    localStorage.setItem('nummerCoundCard', nummerCoundCard.toString());
    localStorage.setItem('currentTaskStatus', 'toDo');
    window.location.href = "board.html";
}



/**
 * Retrieves and validates the title and description values from the input fields.
 *
 * @returns {Promise<{title: string, description: string} | null>} A promise that resolves to an object containing the title and description,
 * or null if either of the fields is empty.
 */
async function saveTitleDescription() {
    const titleValue = document.getElementById('title').value;
    const descriptionValue = document.getElementById('description').value;

    if (titleValue && descriptionValue) {
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';

        return {
            title: titleValue,
            description: descriptionValue
        };
    } else {
        return null;
    }
}



/**
 * Retrieves information about the last clicked category element, including the text content.
 * 
 * @returns {Promise<{categoryText: string, spanText: string} | null>} A promise that resolves to an object containing information
 * about the last clicked category element. The object includes the text content of the category and span elements, or null
 * if the required elements are not found.
 */
async function categoryClicked() {
    const clickedCategoryElement = document.getElementById('newCategory');
    const lerSpanElement = document.getElementById('lerSpan');

    if (clickedCategoryElement) {
        const lastClickedText = clickedCategoryElement.innerText;
        if (lerSpanElement) {
            const lastClickedSpanText = lerSpanElement.innerText;
            return { spanText: lastClickedSpanText };
        } else {
            console.error('Kein Element mit der ID "lerSpan" gefunden.');
            return { categoryText: lastClickedText, spanText: null };
        }
    }
}



// Due Date
/**
 * Retrieves and validates the due date from the date picker input.
 * 
 * @returns {string | null} The valid due date in "YYYY-MM-DD" format, or null if the input is invalid.
 */
async function theDueDate() {
    const dateInput = document.getElementById('datePicker');
    const dateValue = dateInput.value;

    return new Promise((resolve, reject) => {
        if (dateValue) {
            const currentDate = new Date().toISOString().split('T')[0];
            const selectedDate = new Date(dateValue).toISOString().split('T')[0];

            if (selectedDate >= currentDate) {
                resolve(dateValue);
            } else {
                dateInput.value = '';
                alert('Bitte geben Sie ein Datum ab heute ein.');
                reject(new Error('Ungültiges Datum'));
            }
        } else {
            reject(new Error('Leeres Datum'));
        }
    });
}



/*Prio Btns ON*/
let activePrio = 'Medium';
/**
 * Changes the color priority and updates the visual representation.
 * 
 * @param {string} priority - The color priority to set.
 */
async function changeColor(priority) {
    if (activePrio !== null) {
        document.getElementById(`prio${activePrio}`).classList.remove('active');
        document.getElementById(`img${activePrio}`).classList.remove("d-none");
        document.getElementById(`img${activePrio}White`).classList.add("d-none");
    }
    document.getElementById(`prio${priority}`).classList.add('active');
    activePrio = priority;

    document.getElementById(`img${priority}`).classList.add("d-none");
    document.getElementById(`img${priority}White`).classList.remove("d-none");
}

try {
    document.getElementById('prioMedium').classList.add('active');
    document.getElementById('imgMedium').classList.add("d-none");
    document.getElementById('imgMediumWhite').classList.remove("d-none");
} catch (error) {
}
/*Prio Btns OFF*/



/*Subtasks On*/
/**
 * Collects and adds a subtask to the UI.
 * 
 * @async
 * @returns {Promise<void>}
 */
async function subtaskJson() {
    const subtaskInput = document.getElementById('subtask-input-content');
    const subtasks = subtaskInput.value.trim();

    if (subtasks) {
        addSubTask(subtasks);
        subtaskInput.value = '';
    }
}

/**
 * Adds a subtask to the UI.
 * 
 * @async
 * @param {string} text - The text of the subtask.
 * @returns {Promise<void>}
 */
async function addSubTask(text) {
    const subtaskContainer = document.getElementById('subtaskContent');
    const subtaskId = Date.now();
    subtaskContainer.innerHTML += `
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
 * Hides a subtask element by adding a 'd-none' class.
 *
 * @param {string} subtaskId - The ID of the subtask to hide.
 */
function deleteText(subtaskId) {
    const subtaskElement = document.getElementById(`subtasksList_${subtaskId}`);
    if (subtaskElement) {
        subtaskElement.classList.add("d-none");
    }
}

/**
 * Edits subtask text with an input field and updates global list on blur.
 *
 * @param {string} subtaskId - ID of the subtask to edit.
 */
function editPText(subtaskId) {
    const subtaskContainer = document.getElementById(`subtasksList_${subtaskId}`);
    const subtaskTextElement = subtaskContainer.querySelector('.pText');
    const subtaskText = subtaskTextElement.innerText;

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = subtaskText;
    subtaskTextElement.replaceWith(inputField);

    inputField.addEventListener('blur', function () {
        const editedText = inputField.value;
        subtaskTextElement.innerText = editedText;
        inputField.replaceWith(subtaskTextElement);
        const subtaskIndex = subtasksEditList.findIndex(subtask => subtask.id === subtaskId);
        if (subtaskIndex !== -1) {
            subtasksEditList[subtaskIndex].text = editedText;
        }
        subtaskContainer.querySelector('.editP').onclick = function () {
            editPText(subtaskId);
        };
    });
    inputField.focus();
    subtaskContainer.querySelector('.editP').onclick = null;
}

/**
 * Collects the checked subtasks from the UI.
 * 
 * @async
 * @returns {Promise<Object[]>} - An array of collected subtasks.
 */
async function collectSubtasks() {
    const subtasks = document.querySelectorAll('.subtasksList');
    const collectedSubtasks = [];

    subtasks.forEach(subtask => {
        const checkbox = subtask.querySelector('input[type="checkbox"]');
        const subtaskText = subtask.querySelector('.pText').innerText;

        if (checkbox.checked) {
            collectedSubtasks.push({ text: subtaskText });
        }
    });

    return collectedSubtasks;
}
/*Subtasks Off*/



/**
 * Resets form inputs, clears content, and updates UI elements to their default states.
 * This includes resetting checkboxes, input fields, dropdowns, priority indicators, and visibility of certain elements.
 */
function clearBtn() {
    Object.keys(checkboxStates).forEach(key => {
        checkboxStates[key] = false;
    });
    dropdownContentList();
    saveCheckboxStates();

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('datePicker').value = '';
    document.getElementById('subtask-input-content').value = '';

    document.getElementById('spantextTwo').innerHTML = '';
    document.getElementById('dropdownContainer').innerHTML = '';
    document.getElementById('subtaskContent').innerHTML = '';

    document.getElementById('spanText').style.display = 'flex';
    document.getElementById('dropdownCategoryContent').classList.add('d-none');
    document.getElementById('dropdownContent').classList.add('d-none');

    document.getElementById('prioUrgent').classList.remove('active');
    document.getElementById('imgUrgent').classList.remove('d-none');
    document.getElementById('imgUrgentWhite').classList.add('d-none');

    document.getElementById('prioLow').classList.remove('active');
    document.getElementById('imgLow').classList.remove('d-none');
    document.getElementById('imgLowWhite').classList.add('d-none');
}