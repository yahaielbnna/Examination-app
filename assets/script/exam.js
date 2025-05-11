import auth from "./auth.js";
import examModel from "./examModel.js";

let user = auth.middelware();

let params = new URLSearchParams(document.location.search),
    id = params.get('id'),
    exam = examModel.getExam(id),
    min = 9, sec = 60;
var currentID = 1, TScore = 0;


let nextBtn = document.getElementById('Next'),
    prevBtn = document.getElementById('Prev'),
    submit = document.getElementById('Submit');

document.querySelector('.exam-name').innerText = exam.name;

let timer = setInterval(timerFunction, 1000)
function timerFunction() {
    if (min >= 0 && sec >= 0) {
        sec--;
        document.getElementById('timer').innerText = `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
        if (sec == 0) {
            sec = 60;
            min--;
        }
    } else {
        clearInterval(timer)
    }
}


function listItem(name, id) {
    let li = document.createElement('li'),
        p = document.createElement('p'),
        span = document.createElement('span'),
        svgF = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bookmark-icon lucide-bookmark"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`,
        svgT = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ffc107" stroke="#ffc107" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bookmark-icon lucide-bookmark"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`;

    document.getElementById('questionsMenu').appendChild(li);

    li.appendChild(p);
    li.appendChild(span);

    li.dataset.id = id;

    p.innerText = name;
    span.innerHTML = svgF;

    li.addEventListener('click', e => {

        if (!span.contains(e.target) && !(e.target instanceof SVGElement)) {
            questionContainer(e.currentTarget.dataset.id)
        }
    })
    span.addEventListener('click', e => {
        exam.questions.map(e => {
            if (e.id == id) {
                e.bookMark = !(e.bookMark);
                if (e.bookMark) {
                    span.innerHTML = svgT;
                } else {
                    span.innerHTML = svgF;
                }
            }
        })

    })
}

let i = 1;
for (const element of exam.questions) {
    element.id = i;
    element.bookMark = false;
    element.score = 0;
    listItem(element.question, i)
    i++;
}

function questionContainer(id) {
    currentID = id;
    let question = exam.questions.filter(e => e.id == id)[0];

    let h3 = document.createElement('h3'),
        grid = document.createElement('div');

    h3.innerText = question.question;
    let questionContainer = document.querySelector('.question-container');
    questionContainer.innerHTML = '';
    questionContainer.appendChild(h3)
    questionContainer.appendChild(grid)

    h3.classList.add('question');
    grid.classList.add('grid');

    for (const element of question.answers) {
        let chooise = document.createElement('div'),
            input = document.createElement('input'),
            label = document.createElement('label');

        grid.append(chooise)

        chooise.appendChild(input)
        chooise.appendChild(label)

        chooise.classList.add('chooise');

        input.type = 'radio';
        input.value = element;
        input.name = id;
        input.id = element + id;
        if (question.userAnswer && question.userAnswer == element) {
            input.checked = true;
        }

        label.innerText = element;
        label.setAttribute('for', (element + id));

        input.addEventListener('change', e => {
            if (e.currentTarget.checked && e.currentTarget.value == question.correct) {
                question.score = 1;
            } else {
                question.score = 0;
            }
            question.userAnswer = e.currentTarget.value;
        })

    }
    cotnrolButtons()
}

questionContainer(currentID);

nextBtn.addEventListener('click', _ => {
    if (currentID < exam.questions.length) {
        currentID++;
        questionContainer(currentID);
    }
})

prevBtn.addEventListener('click', _ => {
    if (currentID > 1) {
        currentID--;
        questionContainer(currentID);
    }
})

function cotnrolButtons() {
    submit.style.display = 'none';
    if (currentID == exam.questions.length) {
        nextBtn.style.display = "none"
        submit.style.display = 'block';
    } else {
        nextBtn.style.display = "flex"
    }
    if (currentID == 1) {
        prevBtn.style.visibility = "hidden"
    } else {
        prevBtn.style.visibility = "visible"
    }
}

submit.addEventListener('click', e => {
    exam.questions.map(e => {
        TScore += e.score;
    })
    exam.score = TScore;
    examModel.submitExam(exam, user.id)
    TScore = 0;

    location.href = 'dashboard.html';

})