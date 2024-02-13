/**
 * Loads HTML content specifically for mobile devices.
 * Delegates the task to the `includeHTMLmobile` function.
 */
async function includeLoad_mobile() {
  await includeHTMLmobile();
}

/**
 * Asynchronously includes HTML content for mobile devices based on elements with the attribute 'w3-include-html'.
 *
 * @async
 */
async function includeHTMLmobile() {
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
  await getActiveLinkMobile();
}

/**
 * Redirects the user to a specific page based on the provided locationHref.
 * @param {string} locationHref - The location href of the target page.
 */
function goToPages(locationHref) {
  window.location.href = `${locationHref}.html`;
}

/**
 * Asynchronously highlights the active link in the mobile navigation based on the current page.
 * The active link is determined by checking the 'window.location.href'.
 */
async function getActiveLinkMobile() {
  var currentPageMobile = window.location.href;

  if (currentPageMobile.includes("summary.html")) {
    document.getElementById('summary-link').style.backgroundColor = '#091931';
  } else {
    document.getElementById('summary-link').style.backgroundColor = '';
  }

  if (currentPageMobile.includes("board.html")) {
    document.getElementById('board-link').style.backgroundColor = '#091931';
  } else {
    document.getElementById('board-link').style.backgroundColor = '';
  }

  if (currentPageMobile.includes("add_task.html")) {
    document.getElementById('addTask-link').style.backgroundColor = '#091931';
  } else {
    document.getElementById('addTask-link').style.backgroundColor = '';
  }

  if (currentPageMobile.includes("contact.html")) {
    document.getElementById('contact-link').style.backgroundColor = '#091931';
  } else {
    document.getElementById('contact-link').style.backgroundColor = '';
  }
}
