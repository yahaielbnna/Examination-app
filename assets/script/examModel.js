var localExams = localStorage.getItem("exams"),
    exams = [];
if (!localExams) {
    fetch("../../standard/exams.json").then(e => e.json()).then(e => {
        localStorage.setItem("exams", JSON.stringify(e))
        exams = e;
    })
} else {
    exams = JSON.parse(localExams);
}

var examModel = {
    exams: () => {
        return exams.map(e => {
            return { name: e.name, id: e.id, date: e.date };
        })
    },
    getExam: id => {
        let exam = exams.filter(e => e.id == id)[0];
        if (exam) {
            return exam;
        } else {
            if (id != 'new') {
                location.href = 'dashboard.html'
            }
        }
    },
    submitExam: (exam, userID) => {
        let submited = localStorage.getItem('submited'),
            saved = {};
        if (submited) {
            saved = JSON.parse(submited);
        }


        if (!saved[userID]) {
            saved[userID] = []
        }

        let isExam = saved[userID].filter(e => e.id == exam.id)[0];

        if (!isExam) {
            saved[userID].push(exam);
        } else {
            let index = saved[userID].indexOf(isExam);
            saved[userID][index] = exam;
        }
        localStorage.setItem('submited', JSON.stringify(saved))
    },
    getSubmitedExam: (userID) => {
        let submited = localStorage.getItem('submited'),
            saved = {};
        if (submited) {
            saved = JSON.parse(submited);
        }
        if (saved[userID]) {
            return saved[userID];
        }
    },
    saveExam: (id, exam) => {
        let Eexam = exams.filter(e => e.id == id)[0],
            index = exams.indexOf(Eexam);
        exams[index] = exam;
        localStorage.setItem("exams", JSON.stringify(exams))
        location.href = 'dashboard.html'

    },
    storeExam: (exam) => {
        exam.id = (exams.length + 1);
        exams.push(exam);
        localStorage.setItem("exams", JSON.stringify(exams))
        location.href = 'dashboard.html'

    },
}
export default examModel;