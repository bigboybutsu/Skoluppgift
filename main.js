const questions = [
  {
    type: "trueFalse",
    question: "Är kungen en kung?",
    answers: [
      { text: "Sant", correct: true },
      { text: "Falskt", correct: false },
    ],
  },
  {
    type: "trueFalse",
    question: "Sverige är en delstat?",
    answers: [
      { text: "Sant", correct: false },
      { text: "Falskt", correct: true },
    ],
  },
  {
    type: "multChoice",
    question: "Vilket djur har 4 ben?",
    answers: [
      { text: "Apa", correct: false },
      { text: "Ko", correct: true },
      { text: "Fisk", correct: false },
      { text: "Papegoja", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Vilka länder har en kust",
    answers: [
      { text: "Uzbekistan", correct: false },
      { text: "Mongolia", correct: false },
      { text: "Pakistan", correct: true },
      { text: "Turkmenistan", correct: true },
    ],
  },
  {
    type: "trueFalse",
    question: "Är det tre laxar i en lax ask?",
    answers: [
      { text: "Sant", correct: true },
      { text: "Falskt", correct: false },
    ],
  },
  {
    type: "multChoice",
    question: "Vart i världen kan du hitta det lutande tornet i Pisa?",
    answers: [
      { text: "Italien", correct: true },
      { text: "Frankrike", correct: false },
      { text: "Grekland", correct: false },
      { text: "Spanien", correct: false },
    ],
  },
  {
    type: "trueFalse",
    question: "Kapitalism är destruktivt",
    answers: [
      { text: "Sant", correct: true },
      { text: "Falskt", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Vilka av dessa VST-plugins är ljudeffekter",
    answers: [
      { text: "Echoboy", correct: true },
      { text: "OTT", correct: true },
      { text: "Tal-u-no-lx", correct: false },
      { text: "Portal", correct: true },
    ],
  },
  {
    type: "trueFalse",
    question: "3+4=6+1",
    answers: [
      { text: "Sant", correct: true },
      { text: "Falskt", correct: false },
    ],
  },
  {
    type: "trueFalse",
    question: "Kan en groda svara på en fråga",
    answers: [
      { text: "Sant", correct: false },
      { text: "Falskt", correct: true },
    ],
    // correctAnswerString: "Grodor kan inte prata så... nej.",
  },
];

const questionElement = document.querySelector("#question");
const questionContainer = document.querySelector("#question-container");
const answerContainer = document.querySelector("#answers-container");
const startBtn = document.querySelector("#start-btn");
const nextBtn = document.querySelector("#next-btn");
const mainContainer = document.querySelector(".main-container");
const answerBtn = document.querySelectorAll(".answer-btn");
const darkModeBtn = document.querySelector("#darkMode");
const controls = document.querySelector(".controls");

let currentQuestionIndex;

let totalscore = 0;
let maxQuest = questions.length;

startBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  showQuestion(questions[currentQuestionIndex]);
  startBtn.classList.add("hide");
  darkModeBtn.classList.add("hide");
  nextBtn.classList.remove("hide");
});

let hasClicked = false;
let hasClickedFalse = document.createElement("div");
// hasClickedFalse.innerText = "Please select an option!";
nextBtn.addEventListener("click", () => {
  if (hasClicked) {
    hasClickedFalse.innerText = "";
    nextQuestion();
    hasClicked = false;
  } else {
    hasClickedFalse.innerText = "Please select an option!";
    controls.append(hasClickedFalse);
    alert("Please select an option");
  }
});

let p = document.createElement("p");
function nextQuestion() {
  if (getPoint) {
    totalscore++;
    getPoint = false;
  }
  answerContainer.innerHTML = "";
  p.innerText = "";
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    p.innerHTML = `${totalscore} / ${questions.length}`;
    mainContainer.append(p);
    showQuestion(questions[currentQuestionIndex]);
  } else {
    getResult();
  }
}

let getPoint = false;

function showQuestion(question) {
  questionElement.innerText = question.question;

  if (question.type === "trueFalse") {
    question.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("answer-btn");
      button.addEventListener("click", () => {
        if (answer.correct === true) {
          getPoint = true;
          hasClicked = true;
          // console.log("nu är det true");
        } else if (answer.correct === false) {
          getPoint = false;
          hasClicked = true;
          // console.log("nu är det false");
        }
      });
      answerContainer.append(button);
    });
  } else if (question.type === "multChoice") {
    question.answers.forEach((answer, i) => {
      const label = document.createElement("label");
      label.classList.add("answerRC-btn");

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "answer";
      radio.classList.add("answerRC-btn");
      label.innerText = answer.text;
      label.appendChild(radio);
      radio.addEventListener("click", () => {
        if (answer.correct === true) {
          getPoint = true;
          hasClicked = true;
          // console.log("nu är det true");
        } else if (answer.correct === false) {
          getPoint = false;
          hasClicked = true;
          // console.log("nu är det false");
        }
      });
      answerContainer.append(label);
    });
  } else if (question.type === "checkbox") {
    let amountTrue = 0;
    let trueChecked = 0;
    let falseChecked = 0;
    question.answers.forEach((check) => {
      if (check.correct === true) {
        amountTrue++;
      }
    });
    console.log(amountTrue);

    question.answers.forEach((answer, i) => {
      const label = document.createElement("label");
      label.classList.add("answerRC-btn");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "answer";
      checkbox.classList.add("answerRC-btn");
      label.innerText = answer.text;
      label.appendChild(checkbox);
      // console.log(checkbox.checked);
      checkbox.addEventListener("click", () => {
        console.log("checkbox checked: " + checkbox.checked);
        if (checkbox.checked && answer.correct === true) {
          trueChecked++;
          console.log("TrueChecked: " + trueChecked);
          console.log("FalseChecked: " + falseChecked);
        } else if (checkbox.checked === false && answer.correct === true) {
          trueChecked--;
          console.log("TrueChecked: " + trueChecked);
          console.log("FalseChecked: " + falseChecked);
        } else if (checkbox.checked && answer.correct === false) {
          falseChecked++;
          console.log("TrueChecked: " + trueChecked);
          console.log("FalseChecked: " + falseChecked);
        } else if (checkbox.checked === false && answer.correct === false) {
          falseChecked--;
          console.log("FalseChecked: " + falseChecked);
          console.log("TrueChecked: " + trueChecked);
        }
        if (trueChecked === amountTrue && falseChecked === 0) {
          getPoint = true;
          console.log("nu är det true");
        } else {
          getPoint = false;
          console.log("nu är det false");
        }
        // Gör egen if statement för om checkboxen
        // är i checkad så är hasClicked = true
        if (trueChecked === 0 && falseChecked === 0) {
          hasClicked = false;
        } else {
          hasClicked = true;
        }
      });
      answerContainer.append(label);
    });
  }
}

function getResult() {
  nextBtn.classList.add("hide");
  questionContainer.classList.add("hide");
  const result = document.createElement("p");

  if (totalscore > maxQuest * 0.75) {
    result.innerHTML = "MVG";
    result.style.color = "green";
  } else if (totalscore > maxQuest * 0.5) {
    result.innerHTML = "G";
    result.style.color = "orange";
  } else if (totalscore < maxQuest * 0.5) {
    result.innerHTML = "IG";
    result.style.color = "red";
  }

  p.innerHTML = `${totalscore} / ${questions.length}`;
  // p.innerText = "totalscore: " + totalscore + "/ " + questions.length;
  mainContainer.append(result);
  // mainContainer.append(p);
}

darkModeBtn.addEventListener("click", () => {
  let element = document.body;
  mainContainer.style.backgroundcolor = "black";
  element.classList.toggle("dark-mode");
});
