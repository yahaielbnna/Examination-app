import auth from "./auth.js";
import examModel from "./examModel.js";

let user = auth.middelware();

let params = new URLSearchParams(document.location.search),
    id = params.get('id'),
    exam = examModel.getExam(id),
    index = 0;
let name = document.getElementsByName('name')[0],
    questionsContainer = document.querySelector('.page');

if (id != 'new') {
    document.title = `Edit exam | ${exam.name}`;
    name.value = exam.name;
} else {
    document.title = `Add Exam`;
}


function question(question = null) {
    index++;
    let div = document.createElement('div'),
        questionName = document.createElement('input'),
        grid = document.createElement('div');

    questionsContainer.appendChild(div);

    div.appendChild(questionName);
    div.appendChild(grid);

    div.classList.add('question')

    questionName.type = 'text';
    questionName.placeholder = 'Question title';
    questionName.name = `question[${index}]`;

    grid.classList.add('grid');

    if (question) {
        questionName.value = question.question;
    }

    for (let i = 0; i < 4; i++) {
        let answerContainer = document.createElement('div'),
            radio = document.createElement('input'),
            answer = document.createElement('input');

        grid.appendChild(answerContainer)

        answerContainer.appendChild(radio)
        answerContainer.appendChild(answer)

        answerContainer.classList.add('input-container');

        radio.type = 'radio';
        radio.name = `correct[${index}]`
        radio.dataset.ans = i;

        answer.type = 'text';
        answer.placeholder = `Answer ${i + 1}`;
        answer.name = `answer[${index}][${i}]`


        if (question) {
            answer.value = question.answers[i];
            if (question.answers[i] == question.correct) {
                radio.checked = true;
            }
        }
    }
}
if (id != 'new') {
    exam.questions.forEach(element => {
        question(element)

    });
}

document.getElementById('addQuestion').addEventListener('click', e => {
    question()
})
let form = document.forms['exam'];
form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());

    // console.log(formData.getAll('question[]'));

    let exam = {
        // id: id != 'new' ? id : 'new',
        name: formValues.name || "",
        date: formValues.date,
        questions: []
    };


    console.log(formValues);

    for (let i = 0; i < index; i++) {
        let answers = Object.entries(formValues)
            .filter(([key, _]) => key.includes(`answer[${i + 1}]`))
            .map(([_, value]) => value),
            correctAnswerIndex = document.querySelector(`input[type="radio"][name="correct[${i + 1}]"]:checked`).dataset.ans;

        let question = {
            question: formData.get(`question[${i + 1}]`),
            answers: answers,
            correct: formData.get(`answer[${i + 1}][${correctAnswerIndex}]`),
        }
        exam.questions.push(question)

    }

    if (id != 'new') {
        exam.id = id;
        examModel.saveExam(id, exam)
    } else {
        examModel.storeExam(exam)
    }

})