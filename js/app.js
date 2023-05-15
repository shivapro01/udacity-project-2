
/**
 * Define Global Variables
 *
 */

const navbar = document.createElement("nav");
const navlist = document.createElement("ul");
const sections = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// Function to remove active class from all list items
function removeActiveClass() {
  const listItems = document.querySelectorAll(".navbar__menu li");
  listItems.forEach((item) => {
    item.classList.remove("active");
  });
}

// Function to add active class to the list item when scrolled to its section
function addActiveClass() {
  const scrollPosition = window.scrollY;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (
      scrollPosition >= sectionTop - sectionHeight / 3 &&
      scrollPosition < sectionTop + sectionHeight - sectionHeight / 3
    ) {
      removeActiveClass(); // Remove active class from all list items
      const listItem = document.querySelector(
        `.navbar__menu li[data-section-id="${section.id}"]`
      );
      listItem.classList.add("active"); // Add active class to the corresponding list item
    }
  });

  const backToTopButton = document.querySelector(".back-to-top");
  if (scrollPosition > 100) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// looping over all sections to create a list item in navigation bar
sections.forEach((section) => {
  const listItem = document.createElement("li");
  const sectionId = section.id;
  const sectionName = section.dataset.nav;

  // Setting the text content and attributes for the list item
  listItem.textContent = sectionName;
  listItem.setAttribute("data-section-id", sectionId);
  listItem.setAttribute("class", "menu__link");

  // Adding an event listener to scroll to the clicked section
  listItem.addEventListener("click", () => {
    removeActiveClass(); // Removing active class from all list items
    section.scrollIntoView({ behavior: "smooth" });
    listItem.classList.add("active"); // Adding active class to the clicked list item
  });

  // Append the list item to the navigation list
  navlist.appendChild(listItem);
});

// Appending the navigation list to the navigation bar
navbar.appendChild(navlist);

// Appending the navigation bar to the header
const nav = document.querySelector(".navbar__menu");
nav.appendChild(navbar);

// Adding scroll event listener to update active class on scroll and show/hide "Back to Top" button
window.addEventListener("scroll", addActiveClass);

// Creating "Back to Top" button
const backToTopButton = document.createElement("button");
backToTopButton.classList.add("back-to-top");
backToTopButton.innerHTML = "<p>Back Top</p>";

// Adding click event listener to scroll back to top when the button is clicked
backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Appending the "Back Top" button to the document body
document.body.appendChild(backToTopButton);
