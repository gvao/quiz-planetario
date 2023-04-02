/*
Este exercício será um pouquinho diferente dos anteriores.

Seu desafio é desenvolver uma versão do quiz que:

- Aborda um tema diferente (não pode ser de filmes);
- Tem um tema de cores diferente do que foi apresentado na aula;
- Exibe na tela a pontuação que o usuário fez. Não há certo ou errado, apenas faça. Essa exibição de pontos é uma das implementações que faremos na próxima aula =D

Independente se você já fez o quiz dos filmes enquanto acompanhava a aula, busque fazer esse exercício sem rever partes da aula.

É importante que a sua versão do quiz seja feita apenas com o conteúdo que vimos até aqui.
*/
const $form = document.querySelector('form')
const $button = document.querySelector('[type="submit"]')
const $score = document.querySelector('#score > span')
const $name = document.querySelector('#name > span')
const $feedback = createElement('p', '', {
    class: 'feedback',
})

const $fatherName = $name.parentElement

const user = {
    name: null,
    score: 0,
    setName(name) {
        this.name = name
        $fatherName.classList.remove('hidden')
        setTextElemento($name, this.name)
    },
    setScore(point) {
        this.score += point
        setTextElemento($score, this.score)
    },
    addScore(point) {
        const currentScore = this.score += point
        setTextElemento($score, currentScore)
    },
    clearScore() {
        this.score = 0
    }
}

const questions = [
    {
        question: "Quantos planetas temos no sistema solar?",
        answears: ["8 planetas", "7 planetas", "9 planetas"],
        correctIndex: 0
    },
    {
        question: "Qual planeta mais distante do sol?",
        answears: ["Netuno", "Mercurio", "Plutão"],
        correctIndex: 0
    },
    {
        question: "Como é conhecido o satelite natural da Terra?",
        answears: ["Lua", "Nikerson", "spotnik"],
        correctIndex: 0
    },
    {
        question: "O planeta Terra está em qual galáxia?",
        answears: ["Parmalate", "Via láctea", "Andromeda"],
        correctIndex: 1
    },
]

const pointPerQuestion = 100 / questions.length


function setTextElemento(elemento, content) {
    elemento.textContent = content
}

function createElement(tagName = 'div', content = '', attributes = {}) {
    const $element = document.createElement(tagName)
    $element.textContent = content

    for (key in attributes) {
        $element.setAttribute(key, attributes[key])
    }

    return $element
}

const insertQuestion = ({ question, answears }, index) => {

    const $section = createElement('section')

    // const $question = document.createElement('p')
    // $question.setAttribute('class', 'question')
    // $question.textContent = question
    const $question = createElement('p', question, { class: 'question' })
    $section.append($question)

    const $answears = createElement('div', '', { class: 'answears' })
    // $answears.setAttribute('class', 'answears')
    $section.append($answears)

    answears.forEach((answear, i) => {
        const $label = document.createElement('label')
        const $answear = document.createElement('span')

        const $inputRadio = createElement('input', '', {
            value: i,
            type: `radio`,
            name: `inputQuestion${index}`
        })
        // const $inputRadio = document.createElement('input')
        // $inputRadio.value = i
        // $inputRadio.setAttribute('type', 'radio')
        // $inputRadio.setAttribute('name', `inputQuestion${index}`)
        $label.append($inputRadio)

        $answear.textContent = answear
        $label.append($answear)

        $answears.append($label)
    })

    $button.insertAdjacentElement("beforebegin", $section)
}

const validateQuestion = (question, index) => {
    
    const $question = $form[`inputQuestion${index}`]
    const questionsValue = $question.value

    if (!questionsValue) return

    for (let i = 0; i < $question.length; i++) {
        const { value, parentElement } = $question[i]
        const valueNumber = Number(value)
        const isCorrectInput = valueNumber === question.correctIndex

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

function insertMessageFeedback(message = 'feedback aqui!') {
    $feedback.textContent = message
    $button.insertAdjacentElement('beforebegin', $feedback)
}

const handlerSubmit = event => {
    event.preventDefault()
    
    user.clearScore()

    questions
        .forEach(validateQuestion)

        
    let message = ''
    if(user.score === 100) {
        message = `Parabéns você atingiu a pontuação maxíma!`
    } else {
        message = `Sua pontuação é ${user.score}.`
    }
    
    insertMessageFeedback(message)
}

questions.forEach(insertQuestion)

$form.addEventListener('submit', handlerSubmit)