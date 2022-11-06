/**
Landing Page Exercise
FWD Professional Front-End Web Development course
Hamza Elmashad
*/

// Start Global Variables
const navList = document.getElementById("navbar__list"),
sectionsTitles = document.querySelectorAll('.landing__container h2'), //NodeList containing the header element of each section
sectionsHeaders = document.querySelectorAll('main section'); //NodeList containing the section elements of the main content
// End Global Variables

// Start Helper Functions
function isInViewport(element) {
    const rect = element.getBoundingClientRect(); // method returns info about the size of an element and its position relative to the viewport.
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
// End Helper Functions

// Begin Main Functions

// build the nav
function buildNav(sectionTitle, i) {
    const navItem = document.createElement("a");
    navItem.innerText = sectionTitle.innerText;
    navItem.classList.add("menu__link");
    navItem.href = `#section${i + 1}`;
    navItem.dataset.nav = document.getElementById(`section${i + 1}`).dataset.nav;
    // Create a list item
    const li = document.createElement("li")
    // Append the anchor to the list item
    li.appendChild(navItem);
    // Append the list item to the list
    navList.appendChild(li);
}

// Add class 'active' to section when near top of viewport
function sectionToActiv() {
    sectionsHeaders.forEach(function(header) {
        const children = header.querySelectorAll('p'),
        navItems = document.querySelectorAll('.menu__link');
        children.forEach(function(child) {
            if(isInViewport(child) || isInViewport(header)) {
                header.classList.add("your-active-class");
                navItems.forEach(function(item) {
                    if(item.dataset.nav == header.dataset.nav) {
                        item.parentElement.classList.add("your-active-class");
                    } else {
                        item.parentElement.classList.remove("your-active-class");
                    }
                })
            } else {
                header.classList.remove("your-active-class");
            }
        })
    })
}

// Scroll to anchor ID
function scrollToElement(event) {
    event.preventDefault();
    const element = document.querySelector(event.target.getAttribute('href'));
    element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}

// End Main Functions


// Begin Events

//Build the nav
sectionsTitles.forEach(buildNav);

// Scroll to section on link click
setTimeout(function() {
    const navs = document.querySelectorAll('#navbar__list li');
    navs.forEach(function(nav) {
        nav.addEventListener('click', scrollToElement);
    });
}, 100);

// Set sections as active
document.addEventListener('scroll', sectionToActiv);

// End Events