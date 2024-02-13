/**
 * Kicks off the login process by loading user data.
 */
async function initLogin() {
    await loadUsers();
}

/**
 * Fetches user data from storage, updating or logging failure.
 */
async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.info('Could not load users');
    }
}

// Login User && Guest START
/*btn Guest daten for guest*/
function guestLoginNow() {
    const guestDaten = { name: "Dear Guest", id: 0};
    localStorage.setItem("guestData", JSON.stringify(guestDaten));
    usersName();
    window.location.href = "summary.html";
}

/**
 * Validates user credentials and processes the login.
 */
async function loginUser() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessageContainerEmail = document.getElementById('error-messageEmail');
    const errorMessageContainerPasswort = document.getElementById('error-messagePasswort');
    
    const enteredEmail = emailInput.value;
    const enteredPassword = passwordInput.value;
    const storedUsersJSON = await getItem('users');
    const storedUsers = JSON.parse(storedUsersJSON) || [];

    const foundUser = findUserByEmail(storedUsers, enteredEmail);

    if (foundUser) {
        if (foundUser.password === enteredPassword) {
            console.log(foundUser);
            resetFormInput(emailInput, passwordInput);
            handleSuccessfulLogin(foundUser);
        } else {
            errorMessageContainerPasswort.textContent = 'Wrong password';
        }
    } else {
        errorMessageContainerEmail.textContent = 'user not found';
    }
}

/**
 * Searches for a user by email in the provided user list.
 *
 * @param {Array} users - The array of user objects.
 * @param {string} email - The email to search for.
 * @returns {Object|undefined} The found user object, or undefined if not found.
 */
function findUserByEmail(users, email) {
    return users.find(user => user.email === email);
}

/**
 * Handles actions following a successful login, such as redirecting.
 *
 * @param {Object} user - The successfully logged in user object.
 */
function handleSuccessfulLogin(user) {
    const userName = user.name;
    usersName(userName);
    localStorage.setItem("foundUserName", userName);
    window.location.href = 'summary.html';
}
// Login User && Guest OFF

/**
 * Clears login form inputs.
 *
 * @param {HTMLElement} emailInput - The email input field.
 * @param {HTMLElement} passwordInput - The password input field.
 */
function resetFormInput(emailInput, passwordInput) {
    emailInput.value = '';
    passwordInput.value = '';
}