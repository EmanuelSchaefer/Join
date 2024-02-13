let users = [];

/**
 * Initializes the sign-up process by loading users and updating the 'users' variable.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves when the initialization is complete.
 */
async function initSignUp() {
    loadUsers();
    let user = JSON.parse(await getItem('users'));
    users = user;
}

/**
 * Loads user data from storage and updates the 'users' variable.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves when the user data is loaded and the 'users' variable is updated.
 */
async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.info('Could not load users');
    }
}

/**
 * Handles the user sign-up process.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves when the sign-up process is complete.
 */
async function userSignUp() {
    const email = signupEmail.value;
    const failSignUp = document.getElementById('msgFailSnUp');
        if (isEmailExists(email)) {
            handleExistingEmail();
            return;
        }
    const id = generateUniqueId();
        if (isIdExists(id)) {
            handleExistingId();
            return;
        }
    signupBtn.disabled = true;
    addUser(signupName.value, email, signupPassword.value, id);
    await setItem('users', JSON.stringify(users));
    handleSignupSuccess();
}

// checks whether email exists
function isEmailExists(email) {
    return users.some(user => user.email === email);
}

// checks whether id exists
function isIdExists(id) {
    return users.some(user => user.id === id);
}

/**
 * Displays an error message if the email already exists.
 */
function handleExistingEmail() {
    console.error('Die E-Mail-Adresse existiert bereits.');
    const failSignUp = document.getElementById('msgFailSnUp');
    failSignUp.classList.remove('d-none');
    setTimeout(() => {
        failSignUp.classList.add('d-none');
    }, 4000);
    signupBtn.disabled = false;
}

/**
 * Alerts the user that the entered ID already exists.
 */
function handleExistingId() {
    console.error('Die ID existiert bereits.');
    alert('Die ID existiert bereits.');
    signupBtn.disabled = false;
}

/**
 * Adds a new user to the users array.
 *
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password for the user.
 * @param {string} id - The unique ID for the user.
 */
function addUser(name, email, password, id) {
    users.push({
        name: name,
        email: email,
        password: password,
        id: id,
    });
}

/**
 * Handles the successful signup process by resetting the form and displaying a success message.
 */
function handleSignupSuccess() {
    resetForm();
    const winSignUp = document.getElementById('msgWinSnUp');
    winSignUp.classList.remove('d-none');
    setTimeout(() => {
        winSignUp.classList.add('d-none');
        window.location.href = 'index.html';
    }, 3000);
}

/**
 * Generates a unique ID using a random number.
 *
 * @returns {string} A unique ID string.
 */
function generateUniqueId() {
    const randomNumber = Math.floor(Math.random() * 1000000);
    return randomNumber.toString();
}

/**
 * Checks if a given ID already exists in the users array.
 *
 * @param {string} id - The ID to check for existence.
 * @returns {boolean} Returns true if the ID exists, otherwise false.
 */
function isIdExists(id) {
    return users.some(user => user.id === id);
}

/**
 * Checks if a given email already exists in the users array.
 *
 * @param {string} email - The email to check for existence.
 * @returns {boolean} Returns true if the email exists, otherwise false.
 */
function isEmailExists(email) {
    return users.some(user => user.email === email);
}

/**
 * Resets the values of the signup form and enables the signup button.
 */
function resetForm() {
    signupName.value = '';
    signupEmail.value = '';
    signupPassword.value = '';
    signupBtn.disabled = false;
}

/**
 * Sign up Input for First- and Last name
 */
function validateSignupInput(input) {
    input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
}

/**
 * go to Login
 */
function backToLoginPage() {
    window.location.href = "index.html";
}