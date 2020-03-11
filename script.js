//select all elements

const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const qImg = document.getElementById("qImg");
const img = document.getElementById("img");
const question = document.getElementById("questionSpot");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");

const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const scoreInitals = document.getElementById("scoreInitals");
const nextSlide = document.getElementById("nextSlide")


//quiz questions
var questions = [
    {
        question: " What does HTML stand for?",
        imgSrc: "assets/html-image.png ",
        choiceA: "A. Hyper Trainer Marking Language ",
        choiceB: "B. Hyper Text Markup Language ",
        choiceC: "C. Hyper Text Markup Leveler ",
        correct: "B"

    },

    {
        question: " What does CSS stand for?",
        imgSrc: "assets/css-image.png ",
        choiceA: "Cascading Style Sheets ",
        choiceB: "Cascading Super Stuff ",
        choiceC: "Connecting Style Sheets ",
        correct: "A"
    },

    {
        question: "What are the steps to push a file to your git repository? ",
        imgSrc: "assets/git-hub-image.png",
        choiceA: "git add, git commit - m with a message included, git push ",
        choiceB: "git clone, git add, git push ",
        choiceC: "git pull, git commit, git push ",
        correct: "A"
    },

    {
        question: "Which of the following is not an element selector? ",
        imgSrc: "assets/element.png ",
        choiceA: "div ",
        choiceB: "#",
        choiceC: "p",
        correct: "B"
    },

    {
        question: "What is the difference between Serif and Sans-Serif? ",
        imgSrc: " https://cdncms.fonts.net/images/6bff0c2cdbbcca14/A.SerifSansPrint.jpg",
        choiceA: "Sans-Serif fonts include small lines attached to the end strokes of a letter and Serif does not include those strokes",
        choiceB: "Sans-Serif does writing in cursive while Serif does it in print.",
        choiceC: "Serif fonts include small lines attached to the end strokes of a letter and Sans-Serif does not include those strokes",
        correct: "C"
    },

    {
        question: "What is bootstrap? ",
        imgSrc: "assets/llama.jpeg ",
        choiceA: "A free resource to help with HTML",
        choiceB: "Bootstrap is a free collection of tools for creating websites and web applications.",
        choiceC: "A free resource to create functions for your website. ",
        correct: "B"
    },

    {
        question: "What is the function of a rubber duck?",
        imgSrc: "https://cdn.shopify.com/s/files/1/0604/4801/products/SG-REYTD-JCNYO_1024x1024_clipped_rev_1-min.jpeg?v=1505504539://townsquare.media/site/622/files/2012/11/duckbulbasaur.jpg",
        choiceA: "To yell at it",
        choiceB: "To be cute",
        choiceC: "It's the one. It makes bathtime lots of fun.",
        correct: "A"
    },

    {
        question: "Where do you turn in assignments for bootcamp?",
        imgSrc: "https://static1.squarespace.com/static/56c48e10cf80a1474d506114/5d56bbfb84b79300019f757e/5d56bc0a3df6e90001185bd1/1565992444073/stress-help-300x200.jpeg?format=1500w",
        choiceA: "Github",
        choiceB: "Bootcamp Spot",
        choiceC: "What Assignments are you talking about? ",
        correct: "B"
    },

    {
        question: "What's David's favorite song?",
        imgSrc: "assets/music.jpeg",
        choiceA: " The Wii soundtrack ",
        choiceB: "Don't Stop Believing",
        choiceC: "No music. He hates music",
        correct: "A"
    },

    {
        question: "What is jQuery? ",
        imgSrc: "https://cdn4.iconfinder.com/data/icons/scripting-and-programming-languages/512/JQuery_logo-512.png ",
        choiceA: "jQuery is a cross-platform CSS library designed to simplify client-side HTML scripting. ",
        choiceB: "jQuery is a cross-platform JavaScript library designed to simplify client-side HTML scripting. ",
        choiceC: "jQuery is a cross-platform C++ library designed to simplify client-side HTML scripting. ",
        correct: "B"
    },
]
//Create some variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; //10 seconds
const gaugeWidth = 150; //150px
const gaugeUnit = gaugeWidth / questionTime;
let timer;
let score = 0;

// render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    timer = setInterval(renderCounter, 1000); // 1000ms = 1s

}



//renderProgress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
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
        //change progress to red 
        answerIsWrong();
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
    if (answer == questions[runningQuestion].correct) {
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(timer);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}
//score render
function scoreRender() {
    scoreDiv.style.display = "block";

    //calculate the amount of question percent by the user

    const scorePerCent = Math.round(100 * score / questions.length);

    //choose the image based on percent
    let img = (scorePerCent >= 80) ? "https://i.ebayimg.com/images/g/5qgAAOSwoBtW3zvq/s-l400.jpg" :
        (scorePerCent >= 60) ? "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSlaFNdANxQjREEGlQhwhmnAzdXkr_sSrmope466emjc6q_7oXY" :
            (scorePerCent >= 40) ? "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fpeopledotcom.files.wordpress.com%2F2018%2F05%2F21042210_264995290674140_8840525631411191808_n.jpg&w=400&c=sc&poi=face&q=85" :
                (scorePerCent >= 20) ? "https://images.beano.com/store/3cfd5493c801924a61d50cd3fd9e520ed16054a8ec95efa4a237775bfc2a?auto=compress&fm=jpg&rect=0%2C0%2C1280%2C720&w=400" :
                    (scorePerCent >= 0) ? "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAEx7y3.img?h=350&w=624&m=6&q=60&u=t&o=t&l=f&f=jpg&x=488&y=401" : null;


                    scoreDiv.innerHTML =  "<img src=" + img + ">";
                    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";

    var scoreInitals = prompt("Please enter your initals")
    console.log(scoreInitals, scorePerCent);


}

