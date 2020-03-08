//select all elements

const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const qImg = document.getElementById("qImg");

const question = document.getElementById("questionSpot");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");

const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const progress = document.getElementById("progress")
const scoreDiv = document.getElementById("scoreContainer")

//quiz questions
var questions = [
    {
        question: " What does HTML stand for?",
        imgSrc: "assets/html-image.png ",
        choiceA: "A. Hyper Trainer Marking Language ",
        choiceB: "B. Hyper Text Markup Language ",
        choiceC: "C. Hyper Text Markup Leveler ",
        correct: "B",

    },

    {
        question: " What does CSS stand for?",
        imgSrc: "assets/css-image.png ",
        choiceA: "Cascading Style Sheets ",
        choiceB: "Cascading Super Stuff ",
        choiceC: "Connecting Style Sheets ",
        correct: "A",
    },

    {
        question: "What are the steps to push a file to your git repository? ",
        imgSrc: "assets/git-hub-image.png",
        choiceA: "git add, git commit - m with a message included, git push ",
        choiceB: "git clone, git add, git push ",
        choiceC: "git pull, git commit, git push ",
        correct: "A",
    },

    {
        question: "Which of the following is not an element selector? ",
        imgSrc: "assets/element.png ",
        choiceA: "div ",
        choiceB: "#",
        choiceC: "p",
        correct: "B",
    },

    {
        question: "What is the difference between Serif and Sans-Serif? ",
        imgSrc: " https://cdncms.fonts.net/images/6bff0c2cdbbcca14/A.SerifSansPrint.jpg",
        choiceA: "Sans-Serif fonts include small lines attached to the end strokes of a letter and Serif does not include those strokes",
        choiceB: "Sans-Serif does writing in cursive while Serif does it in print.",
        choiceC: "Serif fonts include small lines attached to the end strokes of a letter and Sans-Serif does not include those strokes",
        correct: "C ",
    },

    {
        question: "What is bootstrap? ",
        imgSrc: "assets/llama.jpeg ",
        choiceA: "A free resource to help with HTML",
        choiceB: "Bootstrap is a free collection of tools for creating websites and web applications.",
        choiceC: "A free resource to create functions for your website. ",
        correct: "B",
    },

    {
        question: "In the following image, what is the value in this variable syntax? ",
        imgSrc: "assets/var-property.png ",
        choiceA: "Snow White",
        choiceB: "var",
        choiceC: "name ",
        correct: "A",
    },

    {
        question: "In the following image which animal has the index of 2? ",
        imgSrc: "assets/array.png ",
        choiceA: "Rhino ",
        choiceB: "Giraffe",
        choiceC: "Owl ",
        correct: "A",
    },

    {
        question: "In web development, what is an API? ",
        imgSrc: "https://hackernoon.com/drafts/lovb2b7g.png ",
        choiceA: " an API is a program used to access information on the World Wide Web. Every webpage, image, and video on the web can be accessed via a specific Unified Resource Link (URL). This lets browsers retrieve theseresources from a web server and display them on a user's device. ",
        choiceB: " an API is a set of code features (methods, properties, events, and URLs) that developers can use in their apps to interact with components of a user's web browser, data sets, hardware/software on a user’s computer, or third-party software and services ",
        choiceC: "an API is a program used to access information on the World Wide Web.  to navigate (methods, properties, events, and URLs) that developers can use in their apps to interact with components of a user's web browser, data sets, hardware/software on a user’s computer, or third-party software and services ",
        correct: "B",
    },

    {
        question: "What is jQuery? ",
        imgSrc: "https://cdn4.iconfinder.com/data/icons/scripting-and-programming-languages/512/JQuery_logo-512.png ",
        choiceA: "jQuery is a cross-platform CSS library designed to simplify client-side HTML scripting. ",
        choiceB: "jQuery is a cross-platform C++ library designed to simplify client-side HTML scripting. ",
        choiceC: "jQuery is a cross-platform JavaScript library designed to simplify client-side HTML scripting. ",
        correct: "C ",
    },
]
//Create some variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 5; //30 seconds
const gaugeWidth = 150; //150px
const gaugeUnit = gaugeWidth / questionTime;
let timer;
let score = 0;


start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    timer= setInterval(renderCounter,1000); // 1000ms = 1s


// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";

    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}



//renderProgress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion;
        qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "> </div>";
    }
}


// Counter Render

function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++;
    } else {
        count = 0;
        answerIsWrong();
        //change progress to red
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            //end the quiz and show score
            clearInterval(timer);
            scoreRender();
        }
    }
}

//check answer
function checkAnswer(answer) {
    if (answer === questions[runningQuestion].correct) {
        //answer is correct
        score++;
        answerIsCorrect();
    } else {
        //answer is wrong
        //change progress color to red
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        //end the quiz and show the score
        clearInterval(timer);
        scoreRender();
    }
}
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "green"
}

function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "red"
}

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "green";
}

//answer is wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "red";
}

//score render
function scoreRender() {
    scoreContainer.style.display = "block";

    //calculate the amount of question percent by the user

    const scorePerCent = Math.round(100 * score / question.length);

    //chose the image based on percent
    img(scorePerCent >= 80) ? "https://i.ebayimg.com/images/g/5qgAAOSwoBtW3zvq/s-l400.jpg" :
    img(scorePerCent >= 60) ? "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSlaFNdANxQjREEGlQhwhmnAzdXkr_sSrmope466emjc6q_7oXY" :
    img(scorePerCent >= 40) ? "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fpeopledotcom.files.wordpress.com%2F2018%2F05%2F21042210_264995290674140_8840525631411191808_n.jpg&w=400&c=sc&poi=face&q=85" :
    img (scorePerCent >= 20) ? "https://cmkt-image-prd.freetls.fastly.net/0.1.0/ps/4142262/910/607/m2/fpnw/wm1/cjpssheik3b7ggtxtbvychls64ge8jymz64welljjkt75dgkkjdyid33tb4ujlx0-.jpg?1521200767&s=72617cb8c2facefdada31d614c2f9ef4" :

    scoreContainer.innerHTML = "<img src" + img + ">";
    scoreContainer.innerHTML += "<p>" + scorePerCent + "%</p>";
}
}