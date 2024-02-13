/**
 * Triggers the process to dynamically load HTML components.
 */
async function includeLoad() {
  await includeHTML();
}

/**
 * Dynamically loads and inserts HTML content for elements with a specific attribute.
 * On failure, displays an error message within the element.
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
  await getActiveLink();
}

/**
 * Navigates to a specified page.
 *
 * @param {string} locationHref - The base name of the page to navigate to.
 */
function goToPages(locationHref) {
  window.location.href = `${locationHref}.html`;
}

/**
 * Determines the current page and highlights the corresponding link in the navigation bar.
 * Uses the window location to identify the current page and adjusts the background color accordingly.
 *
 * @async
 */
async function getActiveLink() {
  var currentPage = window.location.href;

  if (currentPage.includes("summary.html")) {
      document.getElementById('summary').style.backgroundColor = '#091931';
  } else {
      document.getElementById('summary').style.backgroundColor = '';
  }

  if (currentPage.includes("board.html")) {
      document.getElementById('board').style.backgroundColor = '#091931';
  } else {
      document.getElementById('board').style.backgroundColor = '';
  }

  if (currentPage.includes("add_task.html")) {
      document.getElementById('addTask').style.backgroundColor = '#091931';
  } else {
      document.getElementById('addTask').style.backgroundColor = '';
  }

  if (currentPage.includes("contact.html")) {
      document.getElementById('contacts').style.backgroundColor = '#091931';
  } else {
      document.getElementById('contacts').style.backgroundColor = '';
  }

  if (currentPage.includes("legal_notice.html")) {
      document.getElementById('legalNotice').style.backgroundColor = '#091931';
  } else {
      document.getElementById('legalNotice').style.backgroundColor = '';
  }
}
