/**
 * Attempts to send a password reset email by verifying the user's email.
 */
async function sendEmail() {
    const emailInput = document.getElementById('forgot-password-input');
    const enteredEmail = emailInput.value;
    const storedUsersJSON = await getItem('users');
    const storedUsers = JSON.parse(storedUsersJSON) || [];
    const foundUser = findUserByEmail(storedUsers, enteredEmail);

    if (foundUser) {
        await setItem('resetEmail', enteredEmail);
        console.log(foundUser);
        console.log('E-Mail stimmt');
        resetFormInput(emailInput);
        redirectToNewPasswordPage();
    } else {
        displayInvalidEmailError();
        console.log('Falsche E-Mail');
    }
}

/**
 * Finds a user by their email from the provided list.
 *
 * @param {Array<Object>} users - The list of users.
 * @param {string} email - The email to search for.
 * @returns {Object|undefined} The found user object, or undefined.
 */
function findUserByEmail(users, email) {
    return users.find(user => user.email === email);
}

/**
 * Redirects to the password reset page.
 */
function redirectToNewPasswordPage() {
    window.location.href = 'newPassword.html';
}

/**
 * Shows an error if the email is not found in the user list.
 */
function displayInvalidEmailError() {
    const failEmailRequest = document.getElementById('failEmailForgot');
    failEmailRequest.classList.add('d-none');
    setTimeout(() => {
        failEmailRequest.classList.remove('d-none');
    }, 100);
}

/**
 * Clears the email input field.
 *
 * @param {HTMLElement} emailInput - The email input element to clear.
 */
function resetFormInput(emailInput) {
    emailInput.value = '';
}