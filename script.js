// =========================
// 1. MOBILE NAVIGATION
// =========================

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("show");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

// Close menu after clicking a link

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("show");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});


// =========================
// 2. ACTIVE NAVIGATION
// =========================

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            navLinks.forEach(link => {
                link.classList.remove("active");

                if (link.getAttribute("href") === `#${entry.target.id}`) {
                    link.classList.add("active");
                }
            });

        }

    });

}, {
    threshold: 0.25
});

sections.forEach(section => {
    observer.observe(section);
});


// =========================
// 3. AUTO COPYRIGHT YEAR
// =========================

document.getElementById("year").textContent =
    new Date().getFullYear();
	
// =========================
// 5. REVEAL ANIMATION
// =========================

const revealElements = document.querySelectorAll(
    ".section-heading, .about-text, .stat-card, .skill-card, .project-card, .service-card, .contact-wrapper"
);

revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition = "opacity 0.7s ease, transform 0.7s ease";
});

const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

            revealObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.12
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});
// =========================
// RIO PREMIUM LOADING SYSTEM
// =========================

const rioLoader = document.getElementById("rio-loader");

const loaderPercent =
    document.getElementById("loader-percent");

const loaderBar =
    document.getElementById("loader-progress-bar");

let progress = 0;
let loaderFinished = false;

// Loading Progress

const loadingInterval = setInterval(() => {

    if (progress < 90 && !loaderFinished) {

        progress += Math.floor(Math.random() * 5) + 1;

        progress = Math.min(progress, 90);

        loaderPercent.textContent = progress + "%";

        loaderBar.style.width = progress + "%";

    }

}, 100);


// Hide Loader

function finishRioLoader() {

    if (loaderFinished) return;

    loaderFinished = true;

    clearInterval(loadingInterval);

    progress = 100;

    loaderPercent.textContent = "100%";

    loaderBar.style.width = "100%";

    setTimeout(() => {

        rioLoader.classList.add("loader-hidden");

    }, 400);

}


// Wait for Website Resources

if (document.readyState === "complete") {

    finishRioLoader();

} else {

    window.addEventListener(
        "load",
        finishRioLoader,
        { once: true }
    );

}