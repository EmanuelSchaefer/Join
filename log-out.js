/**
 * header log out
 */
function Logout() {
  if (document.getElementById("mobile-options").classList.contains("d-none")) {
    document.getElementById("mobile-options").classList.remove("d-none");
  } else {
    document.getElementById("mobile-options").classList.add("d-none");
  }
}

/**
 * Logs out the user by clearing the local storage and redirecting to the index.html page.
 */
function Logoutout() {
  localStorage.clear();
  window.location.href = "index.html";
  window.location.replace("index.html");
}
