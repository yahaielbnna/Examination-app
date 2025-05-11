import examModel from "./examModel.js"
import auth from "./auth.js";

let user = auth.middelware(),
    savedExams = examModel.getSubmitedExam(user.id);

if (savedExams) {

    let subjects_name = savedExams.map(e => {
        return e.name;
    }),
        subjects_score = savedExams.map(e => {
            return Math.round((e.score / e.questions.length) * 100);
        })
    // console.log(subjects);


    var options = {
        series: subjects_score,
        chart: {
            height: 390,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                offsetY: 0,
                startAngle: 0,
                endAngle: 270,
                hollow: {
                    margin: 5,
                    size: '30%',
                    background: 'transparent',
                    image: undefined,
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        show: false,
                    }
                },
                barLabels: {
                    enabled: true,
                    useSeriesColors: true,
                    offsetX: -8,
                    fontSize: '16px',
                    formatter: function (seriesName, opts) {
                        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                    },
                },
            }
        },
        // colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
        labels: subjects_name,
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    show: false
                }
            }
        }]
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}