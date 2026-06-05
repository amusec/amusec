const slides = Array.from(document.querySelectorAll(".story-slide"));
const navLinks = Array.from(document.querySelectorAll(".chapter-nav a"));
const progressBar = document.querySelector(".scroll-progress span");
const currentSlide = document.getElementById("current-slide");
const totalSlides = document.getElementById("total-slides");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function formatSlideNumber(index) {
    return String(index + 1).padStart(2, "0");
}

function setActiveSlide(slide) {
    const index = slides.indexOf(slide);

    if (index === -1) {
        return;
    }

    if (currentSlide) {
        currentSlide.textContent = formatSlideNumber(index);
    }

    navLinks.forEach((link) => {
        const targetId = link.getAttribute("href").replace("#", "");
        const isActive = targetId === slide.id;
        link.classList.toggle("active", isActive);
        link.setAttribute("aria-current", isActive ? "page" : "false");
    });
}

if (totalSlides) {
    totalSlides.textContent = String(slides.length).padStart(2, "0");
}

const slideObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                setActiveSlide(entry.target);
            }
        });
    },
    {
        threshold: 0.58
    }
);

slides.forEach((slide) => {
    slideObserver.observe(slide);
});

function updateProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;

    if (progressBar) {
        progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }
}

function updateParallax() {
    if (reduceMotion) {
        return;
    }

    const viewportHeight = window.innerHeight || 1;

    slides.forEach((slide) => {
        const background = slide.querySelector(".slide-bg");

        if (!background) {
            return;
        }

        const rect = slide.getBoundingClientRect();
        const distanceFromCenter = rect.top + rect.height / 2 - viewportHeight / 2;
        const offset = distanceFromCenter * -0.055;
        background.style.setProperty("--parallax", `${offset}px`);
    });
}

function onScroll() {
    updateProgress();
    updateParallax();
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        const target = document.querySelector(anchor.getAttribute("href"));

        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "start"
        });
    });
});

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);

slides[0]?.classList.add("is-visible");
setActiveSlide(slides[0]);
onScroll();

console.log(`
Still curious.
Still building.
Still learning.

If you are reading the console,
you already understand the story.
`);
