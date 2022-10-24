const questions = [
  {
    type: "trueFalse",
    question: "Är kungen en kung?",
    answers: [
      { text: " Sant", correct: true },
      { text: " Falskt", correct: false },
    ],
  },
  {
    type: "trueFalse",
    question: "Sverige är en delstat?",
    answers: [
      { text: " Sant", correct: false },
      { text: " Falskt", correct: true },
    ],
  },
  {
    type: "multChoice",
    question: "Vilket djur har 4 ben?",
    answers: [
      { text: " Apa", correct: false },
      { text: " Ko", correct: true },
      { text: " Fisk", correct: false },
      { text: " Papegoja", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Vilka länder har en kust",
    answers: [
      { text: " Uzbekistan", correct: false },
      { text: " Mongolia", correct: false },
      { text: " Pakistan", correct: true },
      { text: " Turkmenistan", correct: true },
    ],
  },
  {
    type: "trueFalse",
    question: "Är det tre laxar i en lax ask?",
    answers: [
      { text: " Sant", correct: true },
      { text: " Falskt", correct: false },
    ],
  },
  {
    type: "multChoice",
    question: "Vart i världen kan du hitta det lutande tornet i Pisa?",
    answers: [
      { text: " Italien", correct: true },
      { text: " Frankrike", correct: false },
      { text: " Grekland", correct: false },
      { text: " Spanien", correct: false },
    ],
  },
  {
    type: "trueFalse",
    question: "Kapitalism är destruktivt",
    answers: [
      { text: " Sant", correct: true },
      { text: " Falskt", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Vilka av dessa VST-plugins är ljudeffekter",
    answers: [
      { text: " Echoboy", correct: true },
      { text: " OTT", correct: true },
      { text: " Tal-u-no-lx", correct: false },
      { text: " Portal", correct: true },
    ],
  },
  {
    type: "trueFalse",
    question: "3+4=6+1",
    answers: [
      { text: " Sant", correct: true },
      { text: " Falskt", correct: false },
    ],
  },
  {
    type: "trueFalse",
    question: "Kan en groda svara på en fråga",
    answers: [
      { text: " Sant", correct: false },
      { text: " Falskt", correct: true },
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
const listContainer = document.querySelector(".list-container");
const span = document.createElement("span");
questionContainer.prepend(span);

let currentQuestionIndex;
let totalscore = 0;
let maxQuest = questions.length;

startBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  showQuestion(questions[currentQuestionIndex]);
  startBtn.classList.add("hide");
  // darkModeBtn.classList.add("hide");
  nextBtn.classList.remove("hide");
});

let hasClicked = false;
let hasClickedFalse = document.createElement("div");
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
let userAnswers = [];

function nextQuestion() {
  let radioValue = document.querySelector("[name='answer']:checked").value;
  let checkTheBoxes = document.querySelectorAll("input[type='checkbox']");
  let checkboxValues = [];
  const currentQuestion = questions[currentQuestionIndex];

  checkTheBoxes.forEach((obj) => {
    if (obj.checked) {
      checkboxValues.push(obj.value);
    }
  });
  if (getPoint) {
    totalscore++;
    getPoint = false;
  } else {
  }
  if (currentQuestion.type === "checkbox") {
    userAnswers.push(checkboxValues);
  } else {
    userAnswers.push(radioValue);
  }
  answerContainer.innerHTML = "";
  p.innerText = "";
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    p.innerHTML = `${totalscore} / ${questions.length}`;
    mainContainer.append(p);
    showQuestion(questions[currentQuestionIndex]);
  } else {
    nextBtn.innerHTML = "Get result";
    getResult();
  }
  console.log(userAnswers);
}
let getPoint = false;

function showQuestion(question) {
  questionElement.innerText = question.question;
  span.innerHTML = "";
  span.innerHTML = `<b><u>Question: ${currentQuestionIndex + 1} / ${
    questions.length
  }</u></b> `;

  if (question.type === "multChoice" || question.type === "trueFalse") {
    question.answers.forEach((answer) => {
      const label = document.createElement("label");
      label.classList.add("answerRC-btn");

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "answer";
      radio.classList.add("answerRC-btn");
      label.innerText = answer.text;
      label.appendChild(radio);
      if (answer.correct === true) {
        radio.value = answer.text;
      } else {
        radio.value = answer.text;
      }
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
    // console.log(amountTrue);

    question.answers.forEach((answer) => {
      const label = document.createElement("label");
      label.classList.add("answerRC-btn");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "answer";
      checkbox.classList.add("answerRC-btn");
      if (answer.correct === true) {
        checkbox.value = answer.text;
      } else {
        checkbox.value = answer.text;
      }
      label.innerText = answer.text;
      label.appendChild(checkbox);
      // console.log(checkbox.checked);
      checkbox.addEventListener("click", () => {
        // console.log("checkbox checked: " + checkbox.checked);
        if (checkbox.checked && answer.correct === true) {
          trueChecked++;
        } else if (checkbox.checked === false && answer.correct === true) {
          trueChecked--;
        } else if (checkbox.checked && answer.correct === false) {
          falseChecked++;
        } else if (checkbox.checked === false && answer.correct === false) {
          falseChecked--;
        }
        if (trueChecked === amountTrue && falseChecked === 0) {
          getPoint = true;
        } else {
          getPoint = false;
        }
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
// Test

let myARray = [1, 2, 3, 4, 5];

let anotherArray = ["a", "b", "c", "d"];

myARray.forEach((number, i) => {
  // console.log(number, anotherArray[i]);
});

// Test
function getResult() {
  nextBtn.classList.add("hide");
  // listContainer.classList.remove("hide");
  questionContainer.classList.add("hide");
  const result = document.createElement("p");

  listContainer.classList.remove("hide");
  const answerDiv = document.createElement("div");
  answerDiv.id = "ul-list";
  questions.forEach((obj, i) => {
    list = document.createElement("div");
    listContainer.append(list);
    let h3 = document.createElement("h3");
    let p = document.createElement("p");
    h3.innerHTML = `<b><u>Question</u></b>`;
    h3.innerHTML += `<br><b>${obj.question}<b>`;
    let userAns = userAnswers[i];
    p.innerHTML = `Your answer: ${userAns}`;
    list.append(h3);
    // console.log(userAnswers[i]);
    obj.answers.forEach((obj, i) => {
      list2 = document.createElement("p");
      list2.innerHTML += obj.text;
      if (obj.correct === true) {
        list2.style.color = "green";
      } else if (obj.correct === false) {
        list2.style.color = "red";
      }
      list.append(list2);
    });
    list.append(p);
    // console.log(allAnswers[i]);

    answerDiv.append(list);
  });
  listContainer.append(answerDiv);

  if (totalscore > maxQuest * 0.75) {
    result.innerHTML = "MVG";
    result.style.color = "green";
  } else if (totalscore >= maxQuest * 0.5) {
    result.innerHTML = "G";
    result.style.color = "blue";
  } else if (totalscore < maxQuest * 0.5) {
    result.innerHTML = "IG";
    result.style.color = "red";
  }
  p.innerHTML = `${totalscore} / ${questions.length}`;
  mainContainer.append(result);
}

darkModeBtn.addEventListener("click", () => {
  let element = document.body;
  mainContainer.style.backgroundcolor = "black";
  element.classList.toggle("dark-mode");
});