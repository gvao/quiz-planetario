const user = {
    name: null,
    score: 0,
    setName(name) {
        this.name = name

        const span = $name.querySelector('span')
        $name.classList.remove('hidden')
        span.textContent = this.name
    },
    setScore(point) {
        this.score += point
        const span = $score.querySelector('span')
        span.textContent = this.score
    },
    addScore(point) {
        const currentScore = this.score += point
        const span = $score.querySelector('span')
        span.textContent = currentScore
    },
    clearScore() {
        this.score = 0
    }
}

const questions = [
    {
        question: "Quantos planetas temos no sistema solar?",
        answears: [ "7 planetas", "9 planetas", "10 planetas", "8 planetas"],
        correctAnswear: "8 planetas",
        correctIndex: 0,
    },
    {
        question: "Qual planeta mais distante do sol?",
        answears: ["Netuno", "Mercurio", "Plutão", "Marte"],
        correctAnswear: "Netuno",
        correctIndex: 0
    },
    {
        question: "Como é conhecido o satelite natural da Terra?",
        answears: ["Nikerson", "spotnik", "Lua", "Organike"],
        correctAnswear: "Lua",
        correctIndex: 0
    },
    {
        question: "O planeta Terra está em qual galáxia?",
        answears: ["Parmalate", "Via láctea", "Andromeda", "Glax"],
        correctAnswear: "Via láctea",
        correctIndex: 1
    },
]

const pointPerQuestion = 100 / questions.length

const $form = document.querySelector('form')
const $button = document.querySelector('[type="submit"]')
const $score = document.querySelector('#score')
const $name = document.querySelector('#name')
const $feedback = createElement('p', '', {
    class: 'feedback',
})
const $header = document.querySelector('header')



function createElement(tagName = 'div', content = '', attributes = {}) {
    const $element = document.createElement(tagName)
    $element.textContent = content

    for (key in attributes) {
        $element.setAttribute(key, attributes[key])
    }

    return $element
}

function getIndexCorrectAnswear (array=[], textFinder = null) {
    return array.indexOf(textFinder)
}

const insertQuestion = ({ question, answears,  correctAnswear }, index) => {

    const $section = createElement('section')
    const $question = createElement('p', question, { class: 'question' })
    const $answears = createElement('div', '', { class: 'answears' })

    const insertAnswearsScreen = (answear, i) => {
        const $label = document.createElement('label')
        const $answear = document.createElement('span')
        
        const $inputRadio = createElement('input', '', {
            value: i,
            type: `radio`,
            name: `inputQuestion${index}`
        })
        
        $answear.textContent = answear
        
        $label.append($inputRadio)
        $label.append($answear)
        $answears.append($label)
    }

    answears.forEach(insertAnswearsScreen)
    
    $section.append($question)
    $section.append($answears)

    $button.insertAdjacentElement("beforebegin", $section)
}

const validateQuestion = ({ answears, correctAnswear }, index) => {
    
    const $question = $form[`inputQuestion${index}`]
    const questionsValue = $question.value

    if (!questionsValue) return

    for (let i = 0; i < $question.length; i++) {
        const { value, parentElement } = $question[i]

        const valueNumber = Number(value)

        const correctIndex = getIndexCorrectAnswear(answears, correctAnswear)
        const isCorrectInput = valueNumber === correctIndex

        parentElement.setAttribute('class', '')

        if (isCorrectInput) {

            user.addScore(pointPerQuestion)
            parentElement.classList.add('answears-correct')

        } else if (valueNumber === Number(questionsValue)) {

            user.addScore(-pointPerQuestion)
            parentElement.classList.add('answears-incorrect')

        }
    }
}

const animationFinalScore = (points, message) => {
    let counter = 0

    const interval = setInterval(() => {
        if (counter === points) {
            clearInterval(interval)
        }
        
        $feedback.textContent = `${message} ${counter + '%'}`
        counter++
    }, 10)
}

function insertMessageFeedback(message = '', points) {
    $header.insertAdjacentElement('beforeend', $feedback)
    
    animationFinalScore(points, message)
}

const insertMessage = () => {
    let message = ''

    if(user.score === 100) {
        message = `Parabéns você atingiu a pontuação maxíma!`
    } else {
        message = `Sua pontuação é:`
    }
    
    insertMessageFeedback(message, user.score)

    scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
    })
}

const handlerSubmit = event => {
    event.preventDefault()
    
    user.clearScore()

    questions.forEach(validateQuestion)

    insertMessage()
}



questions.forEach(insertQuestion)

$form.addEventListener('submit', handlerSubmit)