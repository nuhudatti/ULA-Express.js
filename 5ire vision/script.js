// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//SLIDING IMAGES
const slides = document.querySelector(".slides2");
const slideWidth = document.querySelector(".slide2").offsetWidth;
const indicators = document.querySelectorAll(".indicator");
let currentSlide = 0;
let isDragging = false;
let startX, scrollLeft;

// Move the slider to the selected slide
function moveToSlide(index) {
    slides.style.transform = `translateX(-${index * slideWidth}px)`;
    indicators.forEach((indicator, i) => {
        if (i === index) {
            indicator.classList.add("active");
        } else {
            indicator.classList.remove("active");
        }
    });
}

// Click on Indicator
indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
        currentSlide = index;
        moveToSlide(currentSlide);
    });
});

// Previous Button
document.querySelector(".prev").addEventListener("click", () => {
    currentSlide = (currentSlide === 0) ? slides.children.length - 1 : currentSlide - 1;
    moveToSlide(currentSlide);
});

// Next Button
document.querySelector(".next").addEventListener("click", () => {
    currentSlide = (currentSlide === slides.children.length - 1) ? 0 : currentSlide + 1;
    moveToSlide(currentSlide);
});

// Mouse Dragging
slides.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    scrollLeft = slides.scrollLeft;
    slides.style.cursor = "grabbing";
});

slides.addEventListener("mouseleave", () => {
    isDragging = false;
    slides.style.cursor = "grab";
});

slides.addEventListener("mouseup", () => {
    isDragging = false;
    slides.style.cursor = "grab";
});

slides.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const x = e.pageX - startX;
    slides.scrollLeft = scrollLeft - x;
});

// Mouse Wheel Scroll
slides.addEventListener("wheel", (e) => {
    if (e.deltaY > 0) {
        currentSlide = (currentSlide === slides.children.length - 1) ? 0 : currentSlide + 1;
    } else {
        currentSlide = (currentSlide === 0) ? slides.children.length - 1 : currentSlide - 1;
    }
    moveToSlide(currentSlide);
});

// Initial Setup
moveToSlide(currentSlide);

AOS.init();


