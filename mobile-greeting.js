const mobileGreeting = document.querySelector(".first-mobile-greeting");
const summaryDesktop = document.querySelector(".on-top");

/**
 * Sets the greeting text for mobile view based on the time of day and initiates greeting animation.
 */
async function mobile() {
    document.getElementById("mobileTextgreeting").innerText =
    await alldayGreeting();
    await greetSummaryAnimation();
}

/**
 * Generates a greeting message according to the current time.
 *
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
 * Manages the display and animation of greetings for different screen sizes.
 */
async function greetSummaryAnimation() {
    if (window.innerWidth >= 1000) {
        mobileGreeting.style.display = "none";
        summaryDesktop.style.display = "flex";
    } else if (window.innerWidth <= 1000) {
        mobileGreeting.style.display = "flex";
        summaryDesktop.style.display = "none";

        setTimeout(() => {
            mobileGreeting.style.animation =
                "fadeOutGreeting 1s ease-in-out forwards";
            mobileGreeting.style.display = "none";

            summaryDesktop.style.animation = "fadeInGreeting 1s ease-in-out forwards";
            summaryDesktop.style.display = "flex";
        }, 2000);
    }
}