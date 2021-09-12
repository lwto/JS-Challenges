const quizData = [{
    question: 'How many liter of water you should drink daily?',
    a: 'less than 1 liter',
    b: '1 liter',
    c: '2 liter',
    d: 'more than 2 liter',
    correct: 'c'
}, {
    question: 'What is the most used programmming language in 2021',
    a: 'Python',
    b: 'Java',
    c: 'JavaScript',
    d: 'PHP',
    correct: 'a'
}, {
    question: 'Who is the President of US?',
    a: 'Florin Pop',
    b: 'Donald Trump',
    c: 'Ivan Saldano',
    d: 'Mihai Andrei',
    correct: 'b'
}, {
    question: 'What does HTML stand for?',
    a: 'Hypertext Markup Language',
    b: 'Cascading Style Sheet',
    c: 'Json Object Notation',
    d: 'Helicopters Terminals Mortorboats Lamborginis',
    correct: 'a'
}, {
    question: 'What year was JavaScript launched?',
    a: '1997',
    b: '1998',
    c: '1994',
    d: 'none of the above',
    correct: 'd'
}];

const questionE1 = document.getElementById('question');
const a_text = document.getElementById('a-text');
const b_text = document.getElementById('b-text');
const c_text = document.getElementById('c-text');
const d_text = document.getElementById('d-text');
const submitBtn = document.getElementById('submit');
const finishMsg = document.querySelector(".quiz-container");
const answers = document.querySelectorAll(".answer");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    const currentQuizData = quizData[currentQuiz];
    questionE1.innerHTML = currentQuizData.question;
    a_text.innerHTML = currentQuizData.a;
    b_text.innerHTML = currentQuizData.b;
    c_text.innerHTML = currentQuizData.c;
    d_text.innerHTML = currentQuizData.d;
}

function getSelected() {

    let userAns = undefined;

    answers.forEach((answer) => {
        if (answer.checked) {
            userAns = answer.value;
        }
    });
    return userAns;

}
submitBtn.addEventListener('click', () => {

    const userAns = getSelected();
    const currentQuizData = quizData[currentQuiz];

    if (userAns) {

        if (userAns === currentQuizData.correct) {
            score++;
        }
        var radio = document.querySelector('input[type=radio][name=quiz]:checked');
        radio.checked = false;

        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            finishMsg.innerHTML =
                `<h2>Finish!! <br> Your Score is <br> ${score} / ${quizData.length} </h2>`;
            submitBtn.style.display = "none";
        }
    }



})