function createCarousel({
  width,
  listSelector,
  cardsToDisplay,
  currentSelector,
  leftArrowSelector,
  rightArrowSelector,
  changeCounter
}) {

  const list = document.querySelector(listSelector);
  const listEl = list.children

  const availablePages = listEl.length - cardsToDisplay + 1

  let currentPage = 1;

  const current = document.querySelector(currentSelector)

  changeCounter({currentElement:current, currentPage, cardsToDisplay})


  const transformCarousel = () => {
    list.style.transform = `translateX(${(currentPage - 1) * -width + 'px'})`;
    changeCounter({currentElement:current, currentPage, cardsToDisplay})
  }

  document.querySelector(leftArrowSelector).addEventListener('click', ()=> {
    currentPage = Math.max(currentPage - 1, 1);
    transformCarousel()
  })

  document.querySelector(rightArrowSelector).addEventListener('click', ()=> {
    currentPage = Math.min(currentPage + 1, availablePages);
    transformCarousel()
  })
}
const mediaQuery = window.matchMedia('(max-width: 1280px)')

createCarousel({
  width: mediaQuery.matches ? 447 : 450,
  listSelector: 'ul',
  cardsToDisplay: mediaQuery.matches ? 1 : 3,
  currentSelector: ".section-tournament__counter-current",
  leftArrowSelector: ".section-tournament__carousel-button__left-arrow",
  rightArrowSelector:'.section-tournament__carousel-button__right-arrow',
  changeCounter: setValueToCounter
})
createCarousel({
  width: 355,
  listSelector: '.grid-container',
  cardsToDisplay: 1,
  currentSelector: ".section-stages__carousel-container__choice",
  leftArrowSelector: ".section-stages__carousel-button__left-arrow",
  rightArrowSelector:'.section-stages__carousel-button__right-arrow',
  changeCounter: highlightCircle
})
function setValueToCounter({currentElement, currentPage, cardsToDisplay}) {
  currentElement.innerHTML = (currentPage + cardsToDisplay - 1).toString()
}
function highlightCircle({ currentPage }){
  const circle = document.querySelector(`.carousel-circle:nth-child(${currentPage})`)
  document.querySelectorAll('.carousel-circle').forEach((circle) => circle.classList.remove('highlight'))
  circle.classList.add('highlight')
}


