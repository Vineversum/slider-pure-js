document.querySelector('.slider-controls').style.display = 'block';
document.querySelector('.slider-indicators').style.display = 'block';

let slides = document.querySelectorAll('.slider-item');
let indicators = document.querySelectorAll('.indicator');
let indicatorsContainer = document.querySelector('.slider-indicators');
let currentSlide = 0;
let nextSlide;
let playing = true;
let playPauseBtn = document.getElementById('play-pause');
let previousBtn = document.getElementById('previous-btn');
let nextBtn = document.getElementById('next-btn');
let delay = 4000;
let isGoing = false; 

slides[currentSlide].style.zIndex = '1';

let slideInterval = setInterval(showNextSlide, delay); //запускаем слайдер


function showNextSlide() { //следующий слайд
    goToSlide(currentSlide + 1, 'toLeft');
};

function showPreviousSlide() { //предыдущий слайд
    goToSlide(currentSlide - 1, 'toRight');
};

function goToSlide(n, direction) { //переход на n-ый слайд, анимируем переход в зависимости от направления
    if(isGoing) return; //выход если анимация еще не окончена
    isGoing = true;
    nextSlide = (n + slides.length) % slides.length; 

    indicators[currentSlide].className = 'far fa-circle indicator';
    indicators[nextSlide].className = 'fas fa-circle indicator';
    
    if (direction === 'toRight') {
        slides[nextSlide].style.transform = 'translateX(-100%)';
        
        setTimeout(function(){ 
            slides[nextSlide].style.zIndex = '1';
            slides[nextSlide].style.transition = 'transform 0.5s';
            slides[currentSlide].style.transition = 'transform 0.5s';
            slides[nextSlide].style.transform = 'translateX(0)';
            slides[currentSlide].style.transform = 'translateX(100%)';
        }, 0);
        
    }
    if (direction === 'toLeft') {
        slides[nextSlide].style.transform = 'translateX(100%)';
        setTimeout(function(){
            slides[nextSlide].style.zIndex = '1';
            slides[nextSlide].style.transition = 'transform 0.5s';
            slides[currentSlide].style.transition = 'transform 0.5s';
            slides[nextSlide].style.transform = 'translateX(0)';
            slides[currentSlide].style.transform = 'translateX(-100%)';
        }, 0);
    }
    setTimeout(function(){
        slides[currentSlide].style.transition = 'none';
        slides[nextSlide].style.transition = 'none';
        slides[currentSlide].style.zIndex = '0';
        currentSlide = nextSlide;
        isGoing = false;
    }, 500);
    
};


playPauseBtn.addEventListener('click', function(){ //по нажатию на кнопку воспроизведения/паузы останавливаем или запускаем слайдер 
    if (playing) {
        pauseSlideshow();
    }
    else {
        playSlideshow();
    }
});

function pauseSlideshow(){ //функция паузы
    playing = false;
    playPauseBtn.className = 'fas fa-play'; //меняем внешний фид кнопки
    clearInterval(slideInterval);
};

function playSlideshow() { //функция воспроизведения
    playing = true;
    playPauseBtn.className = 'fas fa-pause'; //меняем внешний фид кнопки
    slideInterval = setInterval(showNextSlide, delay);
};

nextBtn.addEventListener('click', function() {
    pauseSlideshow();
    showNextSlide();
});

previousBtn.addEventListener ('click', function() {
    pauseSlideshow();
    showPreviousSlide();
});

indicatorsContainer.addEventListener ('click', function(event){ //обработка события при помощи делегирования
    let target = event.target;
    pauseSlideshow();
    while (target != this) {
        if (target.tagName === 'I') {
            for (let i = 0; i < indicators.length; i++){   //на какой индикатор нажали?
                if (indicators[i] === target) {
                    if (i > currentSlide) goToSlide(i, 'toLeft');
                    else goToSlide(i, 'toRight');
                }
            }
        }
        target = target.parentNode;
    }
});

document.addEventListener('keydown', keyNavigation); //обрабатываем нажатие кнопки

function keyNavigation(event) {
    
    if (event.keyCode === 37) { //стрелка влево
        pauseSlideshow();
        showPreviousSlide();
    }
    if (event.keyCode === 39) { //стрелка вправо
        pauseSlideshow();
        showNextSlide();
    }
    if (event.keyCode === 32) { //пробел
        if (playing) pauseSlideshow();
        else playSlideshow();
    }       
};
