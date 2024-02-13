/**
 * Loads various components of the application asynchronously.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves when all components are loaded.
 */
async function load() {
  await loadAddTask();
  await greetingDay();
  await activeUser();
  await getTotalCardCount();
  await getAllCardCound();
}



// greeting day ON
/**
 * Displays a greeting message based on the time of day.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves after setting the greeting message.
 */
async function greetingDay() {
  document.getElementById("dayGreeting").innerText = await alldayGreeting();
}

/**
 * Determines the appropriate greeting based on the current hour.
 *
 * @async
 * @returns {Promise<string>} A promise that resolves with the greeting message.
 */
async function alldayGreeting() {
  let hour = new Date().getHours();
  if (4 <= hour && hour <= 11) {
    return "Good morning,";
  }
  if (11 < hour && hour <= 19) {
    return "Good afternoon,";
  }
  if (19 < hour || hour < 4) {
    return "Good evening,";
  }
}

/**
 * Formats a date string into a localized date format.
 * @param {string} dateString - The date string to format.
 * @returns {string} The months.
 */
function formatDate(dateString) {
  const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  const date = new Date(dateString);
  const monthIndex = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${months[monthIndex]} ${day}, ${year}`;
  const dateContainer = document.getElementById("dateContainer");
  if (dateContainer) {
    dateContainer.innerHTML = `<strong>${formattedDate}</strong>`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const inputDate = new Date();
  formatDate(inputDate);
});
// greeting day OFF


// greet name ON
/**
 * Handles the activation of the user by invoking the usersName function.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves after handling the active user.
 */
async function activeUser() {
  await usersName();
}

/**
 * Updates greeting elements with the user's name from local storage.
 */
async function usersName() {
  const greetNameElement = document.getElementById("mobileNamegreeting");
  const greetUserElement = document.getElementById("greet-name");
  const guestData = localStorage.getItem("guestData");
  const foundUserName = localStorage.getItem("foundUserName");

  if (guestData) {
    handleGuestData(guestData, greetUserElement, greetNameElement);
  } else if (foundUserName) {
    handleFoundUserName(foundUserName, greetUserElement, greetNameElement);
  }
}

/**
 * Updates greeting elements with guest user data.
 *
 * @param {string} guestData - Guest user data in JSON format.
 * @param {HTMLElement} greetUserElement - Element to display the greeting.
 * @param {HTMLElement} greetNameElement - Element to display the user's name.
 */
function handleGuestData(guestData, greetUserElement, greetNameElement) {
  const guestDaten = JSON.parse(guestData);
  greetUserElement.innerHTML = guestDaten.name;
  greetNameElement.innerHTML = guestDaten.name;
}

/**
 * Updates greeting elements with a found user's name.
 *
 * @param {string} foundUserName - The name of the found user.
 * @param {HTMLElement} greetUserElement - Element to display the greeting.
 * @param {HTMLElement} greetNameElement - Element to display the user's name.
 */
function handleFoundUserName(foundUserName, greetUserElement, greetNameElement) {
  greetUserElement.innerHTML = foundUserName;
  greetNameElement.innerHTML = foundUserName;
}
// greet name OFF



// Tasks Nummer in Summary ON
/**
 * Calculates the total count of cards that have a defined 'numbCard' property.
 *
 * @async
 * @returns {Promise<number>} The total count of cards.
 */
async function getTotalCardCount() {
  const totalCardCount = pushAddTask.reduce((total, task) => {
    if (task.numbCard !== undefined) {
      return total + 1;
    }
    return total;
  }, 0);

  const tasksBoardElement = document.getElementById('tasks-board');
  if (tasksBoardElement) {
    tasksBoardElement.innerHTML = `${totalCardCount}`;
  }
  return totalCardCount;
}

/**
 * Retrieves the counts for different card statuses and updates the overall card counts.
 *
 * @async
 * @returns {Promise<void>} A promise indicating the completion of the function.
 */
async function getAllCardCound() {
  await getInProgressCardCount();
  await getAwaitingFeedbackCardCount();
  await getToDoCardCount();
  await getDoneCardCount();
  await updateCardCountByColor();
}

/**
 * Calculates the count of cards in progress and updates the corresponding element.
 *
 * @async
 * @returns {Promise<number>} The count of cards in progress.
 */
async function getInProgressCardCount() {
  const inProgressCardCount = pushAddTask.reduce((total, task) => {
    if (task.numbCard !== undefined && task.status === 'inProgress') {
      return total + 1;
    }
    return total;
  }, 0);

  const tasksProgressElement = document.getElementById('tasks-progress');
  if (tasksProgressElement) {
    tasksProgressElement.innerHTML = `${inProgressCardCount}`;
  }
  return inProgressCardCount;
}

/**
 * Calculates the count of cards awaiting feedback and updates the corresponding element.
 *
 * @async
 * @returns {Promise<number>} The count of cards awaiting feedback.
 */
async function getAwaitingFeedbackCardCount() {
  const inProgressCardCount = pushAddTask.reduce((total, task) => {
    if (task.numbCard !== undefined && task.status === 'feedback') {
      return total + 1;
    }
    return total;
  }, 0);

  const tasksProgressElement = document.getElementById('awaiting-feedback');
  if (tasksProgressElement) {
    tasksProgressElement.innerHTML = `${inProgressCardCount}`;
  }
  return inProgressCardCount;
}

/**
 * Updates the count of cards with the color 'Urgent' and displays it in the corresponding element.
 *
 * @async
 * @returns {Promise<number>} The count of cards with the color 'Urgent'.
 */
async function updateCardCountByColor() {
  const cardCount = pushAddTask.reduce((total, task) => {
    if (task.color === 'Urgent') {
      return total + 1;
    }
    return total;
  }, 0);

  const element = document.getElementById('sum-urgent');
  if (element) {
    element.innerHTML = `${cardCount}`;
  }
  return cardCount;
}

/**
 * Calculates the count of cards in the 'toDo' status and updates the corresponding element.
 *
 * @async
 * @returns {Promise<number>} The count of cards in the 'toDo' status.
 */
async function getToDoCardCount() {
  const inProgressCardCount = pushAddTask.reduce((total, task) => {
    if (task.numbCard !== undefined && task.status === 'toDo') {
      return total + 1;
    }
    return total;
  }, 0);

  const tasksProgressElement = document.getElementById('sum-todo');
  if (tasksProgressElement) {
    tasksProgressElement.innerHTML = `${inProgressCardCount}`;
  }
  return inProgressCardCount;
}

/**
 * Calculates the count of cards in the 'done' status and updates the corresponding element.
 *
 * @async
 * @returns {Promise<number>} The count of cards in the 'done' status.
 */
async function getDoneCardCount() {
  const inProgressCardCount = pushAddTask.reduce((total, task) => {
    if (task.numbCard !== undefined && task.status === 'done') {
      return total + 1;
    }
    return total;
  }, 0);

  const tasksProgressElement = document.getElementById('sum-done');
  if (tasksProgressElement) {
    tasksProgressElement.innerHTML = `${inProgressCardCount}`;
  }
  return inProgressCardCount;
}
// Tasks Nummer in Summary OFF



/**
 * go to Board
 */ 
function toBoard() {
  window.location.href = "board.html";
}