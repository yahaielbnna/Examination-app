import auth from "./auth.js";
import examModel from "./examModel.js"

let user = auth.middelware();

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
    ahref.href = `exam.html?id=${exam.id}`
    examName.innerText = exam.name;
    examDate.innerText = exam.date;
}