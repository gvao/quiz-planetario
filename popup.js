const $popup = document.querySelector(`.popup-wrap`)
const $popuForm = document.querySelector('.popup-form')

const closePopup = () => $popup.remove()

$popup.addEventListener('click', event => {
    const elementClicked = event.target
    const classToClosePopup = ['popup-wrap', 'popup-close' ]
    const className = elementClicked.classList[0]

    if (classToClosePopup.some(classClose => classClose === className)) {
        console.log(`fechar popup`)
        closePopup()
    }
})

$popuForm.addEventListener('submit', event => {
    event.preventDefault()
    const name = $popuForm.whatsName.value
    user.setName(name)
    // console.log(`Name atualizado`, user)
    
    closePopup()
})