function createCarousel({
                          width,
                          listSelector,
                          cardsToDisplay,
                          currentSelector,
                          changeCounter
                        }) {

  const list = document.querySelector(listSelector);
  const listEl = list.children

  const availablePages = listEl.length - cardsToDisplay + 1

  let currentPage = 1;

  const current = document.querySelector(currentSelector)

  changeCounter({currentElement: current, currentPage, cardsToDisplay})

  const transformCarousel = () => {
    list.style.transform = `translateX(${(currentPage - 1) * -width + 'px'})`;
    changeCounter({currentElement: current, currentPage, cardsToDisplay})
  }

  return {
    getCurrentPage: () => currentPage,
    nextPage: () => {
      currentPage = (currentPage + availablePages) % availablePages + 1
      transformCarousel()
    },
    prevPage: () => {
      currentPage = (currentPage - 2 + availablePages) % availablePages + 1
      transformCarousel()
    }
  }
}

const mediaQuery = window.matchMedia('(max-width: 1280px)')

function setValueToCounter({currentElement, currentPage, cardsToDisplay}) {
  currentElement.innerHTML = (currentPage + cardsToDisplay - 1).toString()
}

const tournament = createCarousel({
  width: mediaQuery.matches ? 447 : 450,
  listSelector: 'ul',
  cardsToDisplay: mediaQuery.matches ? 1 : 3,
  currentSelector: ".section-tournament__counter-current",
  changeCounter: setValueToCounter
})

document.querySelector(".section-tournament__carousel-button__left-arrow").addEventListener('click', tournament.prevPage)
document.querySelector('.section-tournament__carousel-button__right-arrow').addEventListener('click', tournament.nextPage)

setInterval(tournament.nextPage, 4000)

function highlightCircle({currentPage}) {
  const circle = document.querySelector(`.carousel-circle:nth-child(${currentPage})`)
  document.querySelectorAll('.carousel-circle').forEach((circle) => circle.classList.remove('highlight'))
  circle.classList.add('highlight')
}

const stages = createCarousel({
  width: 355,
  listSelector: '.grid-container',
  cardsToDisplay: 1,
  currentSelector: ".section-stages__carousel-container__choice",
  changeCounter: highlightCircle
})

document.querySelector(".section-stages__carousel-button__left-arrow").addEventListener('click', stages.prevPage)
document.querySelector('.section-stages__carousel-button__right-arrow').addEventListener('click', stages.nextPage)



