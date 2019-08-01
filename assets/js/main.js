let slides = document.querySelectorAll('.slider-item');
let indicators = document.querySelectorAll('.indicator');
let currentSlide = 0,  previousSlide = 4, nextSlide = 1;
let slideInterval = setInterval(showNextSlide, 5000);



function showNextSlide() {
    previousSlide = currentSlide;
    currentSlide = (currentSlide + 1) % slides.length;
    nextSlide = (currentSlide + 1) % slides.length;
    for (let i in slides) {
        slides[i].className = "slider-item";
    }
    slides[currentSlide].className = 'slider-item current-slide';
    slides[nextSlide].className = 'slider-item next-slide'
    slides[previousSlide].className = 'slider-item previous-slide';
    indicators[currentSlide].className = 'fas fa-circle indicator';
    indicators[previousSlide].className = 'far fa-circle indicator'
}

function showPreviousSlide() {
    previousSlide = (currentSlide - 1 + slides.length) % slides.length;
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    nextSlide = (currentSlide + 1) % slides.length;
    for (let i in slides) {
        slides[i].className = "slider-item";
    }
    slides[currentSlide].className = 'slider-item next-slide';
    slides[nextSlide].className = 'slider-item';
    slides[previousSlide].className = 'slider-item current-slide';
    indicators[currentSlide].className = 'fas fa-circle indicator';
    indicators[nextSlide].className = 'far fa-circle indicator';
}
