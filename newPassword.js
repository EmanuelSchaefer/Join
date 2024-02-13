/**
 * Initiates password reset process for the user identified by the email stored in local storage.
 */
async function resetPassword() {
    const email = await getItem('resetEmail');
    const stsdsdJSON = await getItem('users');
    const users = JSON.parse(stsdsdJSON) || [];
    let checkedUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());

    if (checkedUser) {
        await confirmPassword(users);
    }
}

/**
 * Checks if the new password and confirmation match, then updates the user's password.
 *
 * @param {Array<Object>} users - List of all users.
 */
async function confirmPassword(users) {
    const newPasswordElement = document.getElementById("newPassword");
    const confirmPasswordElement = document.getElementById("confirmPassword");
    const email = await getItem('resetEmail');

    if (passwordsMatch(newPasswordElement.value, confirmPasswordElement.value)) {
        updatePassword(users, email, newPasswordElement.value);
        backToLoginPage();
    } else {
        displayPasswordMismatchError();
    }
}

/**
 * Checks if two given passwords are the same.
 *
 * @param {string} password1 - First password.
 * @param {string} password2 - Second password to compare.
 * @returns {boolean} True if passwords match, false otherwise.
 */
function passwordsMatch(password1, password2) {
    return password1 === password2;
}

/**
 * Updates the specified user's password in the users array and saves it to local storage.
 *
 * @param {Array<Object>} users - List of all users.
 * @param {string} email - Email of the user to update.
 * @param {string} newPassword - New password to set.
 */
function updatePassword(users, email, newPassword) {
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if (email == user['email']) {
            user.password = newPassword;
            users[i] = user;
            setItem('users', JSON.stringify(users));
        }
    }
}

/**
 * Displays an error message if the password confirmation fails.
 */
function displayPasswordMismatchError() {
    const failConfirm = document.getElementById('yourPasswordmsg');
    failConfirm.classList.remove('d-none');
    setTimeout(() => {
        failConfirm.classList.add('d-none');
    }, 4000);
}

/**
 * Navigates the user back to the login page.
 */
function backToLoginPage() {
    window.location.href = 'index.html';
}