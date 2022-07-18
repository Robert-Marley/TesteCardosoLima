//MENU MOBILE

const nav = document.querySelector(".navbar")
const body = document.querySelector(".body")
const carousel = document.querySelector(".carousel")
const carouselActions = document.querySelector(".carousel-actions")
const btnMobile = document.querySelector(".btn-mobile")

function menuMobile(event) {
    
    if(event.type === 'touchstart') {
        event.preventDefault()
    }

    nav.classList.toggle("active") //Adiciona se não tem, remove se tem
    body.classList.toggle("active")
    carousel.classList.toggle("active")
    carouselActions.classList.toggle("active")
}

btnMobile.onclick = menuMobile
btnMobile.addEventListener('touchstart', menuMobile)

function hideNav() { //usado na hora do scroll
    nav.classList.toggle("active")
    body.classList.toggle("active")
    carousel.classList.toggle("active")
    carouselActions.classList.toggle("active")
}

  


//SLIDER

const nextButton = document.querySelector('[data-js="carousel-button--next"]')
const prevButton = document.querySelector('[data-js="carousel-button--prev"]')
const slides = document.querySelectorAll('[data-js="carousel-item"]')

let currentSlideIndex = 0
let translateX = 0

const manipulateSlidesClasses = correctSlideIndex => {
    slides.forEach(slide => slide.classList.remove('carousel-item--visible'))
    slides[correctSlideIndex].classList.add('carousel-item--visible')
}

const lastSlideIndex = slides.length - 1 

nextButton.addEventListener('click', () => {
    const correctSlideIndex = currentSlideIndex === lastSlideIndex
    ? currentSlideIndex = 0
    : ++currentSlideIndex 
    
    manipulateSlidesClasses(correctSlideIndex)
})

prevButton.addEventListener('click', () => {
    
    const correctSlideIndex = currentSlideIndex === 0 
    ? currentSlideIndex = lastSlideIndex
    : --currentSlideIndex
    
    manipulateSlidesClasses(correctSlideIndex)
})


//SCROLL SUAVE

const navLinks = document.querySelectorAll('#navlink')
const footerLinks = document.querySelectorAll('#footerlink')

function getDistanceFromTop (element) {
    const id = element.getAttribute('href')
    return document.querySelector(id).offsetTop
}

function navLinksScrollToSection(event) {
    event.preventDefault()
    const distanceFromTop = getDistanceFromTop(event.target) - 104
    smoothScrollTo(0, distanceFromTop, 500)

    hideNav()
}

function footerLinksScrollToSection(event) {
    event.preventDefault()
    const distanceFromTop = getDistanceFromTop(event.target) - 104
    smoothScrollTo(0, distanceFromTop, 500)
}

navLinks.forEach(link => {
    link.addEventListener('click', navLinksScrollToSection)
})

footerLinks.forEach(link => {
    link.addEventListener('click', footerLinksScrollToSection)
})

window.smoothScrollTo = function(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset
    const startY = window.scrollY || window.pageYOffset
    const distanceX = endX - startX
    const distanceY = endY - startY
    const startTime = new Date().getTime()
  
    duration = typeof duration !== 'undefined' ? duration : 400;
  
    // Easing function
    const easeInOutQuart = function(time, from, distance, duration) {
      if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
      return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    };
  
    const timer = window.setInterval(function() {
      const time = new Date().getTime() - startTime
      const  newX = easeInOutQuart(time, startX, distanceX, duration)
      const  newY = easeInOutQuart(time, startY, distanceY, duration)
      
      if (time >= duration) {
        window.clearInterval(timer);
      }
      window.scrollTo(newX, newY);
    }, 1000 / 60);
}