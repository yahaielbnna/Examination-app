import auth from "./auth.js";
import examModel from "./examModel.js"

let user = auth.middelware(),
    savedExams = examModel.getSubmitedExam(user.id);

// console.log(examModel.exams());

document.getElementById('userName').innerText = user.user.first_name;

let examsContainers = document.getElementById('examsContainers');

for (const exam of examModel.exams()) {
    let examBox = document.createElement('div'),
        ahref = document.createElement('a'),
        examName = document.createElement('h5'),
        examDate = document.createElement('p');

    examsContainers.appendChild(examBox);
    examBox.appendChild(ahref);
    ahref.append(examName);
    ahref.append(examDate);

    examBox.classList.add('exam-box');
    user.user.role == 'admin' ? ahref.href = `questions.html?id=${exam.id}` : ahref.href = `exam.html?id=${exam.id}`;
    examName.innerText = exam.name;
    examDate.innerText = exam.date;
}

let lastScores = document.getElementById('lastScores');

function scoresItem(name, score) {
    let li = document.createElement('li'),
        h4 = document.createElement('h4'),
        span = document.createElement('span');

    lastScores.appendChild(li);

    li.appendChild(h4);
    li.appendChild(span);

    h4.innerText = name;
    span.innerText = score;
}
if (savedExams) {
    savedExams.map(e => {
        scoresItem(e.name, `${e.score}/${e.questions.length}`)
    })
}

if (user.user.role == 'admin') {
    let labeledUser = document.querySelectorAll('[data-label="user"]');
    labeledUser.forEach(element => {
        element.remove()
    });
}