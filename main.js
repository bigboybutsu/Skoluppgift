const questions = [
  {
    type: "trueFalse",
    question: "Kungen är en kung",
    answers: [
      { text: " Sant", correct: true },
      { text: " Falskt", correct: false },
    ],
  },
  {
    type: "trueFalse",
    question: "Sverige är en delstat",
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
    question: "Vilka länder har en kust?",
    answers: [
      { text: " Uzbekistan", correct: false },
      { text: " Mongolia", correct: false },
      { text: " Pakistan", correct: true },
      { text: " Turkmenistan", correct: true },
    ],
  },
  {
    type: "trueFalse",
    question: "Det är tre laxar i en lax ask",
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
    question: "I mars är det 31 dagar",
    answers: [
      { text: " Sant", correct: true },
      { text: " Falskt", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Vilka av dessa VST-plugins är ljudeffekter?",
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
    question: "Grodor kan prata",
    answers: [
      { text: " Sant", correct: false },
      { text: " Falskt", correct: true },
    ],
    // correctAnswerString: "Grodor kan inte prata så... nej.",
  },
];

// Deklarerar alla const som kommer användas
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
const p = document.createElement("p");
questionContainer.prepend(span);

// Räknaren för att se vilken fråga man ska generara
let currentQuestionIndex;
// Startar quizet genom att generera fram frågor från showQuestion()
startBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  showQuestion(questions[currentQuestionIndex]);
  startBtn.classList.add("hide");
  nextBtn.classList.remove("hide");
});

let hasClicked = false;
let hasClickedFalse = document.createElement("p");
// Genererar nästa fråga
// och kollar om man har klickat i ett alternativ
nextBtn.addEventListener("click", () => {
  if (hasClicked) {
    hasClickedFalse.innerText = "";
    nextQuestion();
    hasClicked = false;
  } else {
    hasClickedFalse.innerText = "Please select an option!";
    controls.append(hasClickedFalse);
  }
});

let getPoint = false;
/** Generarar alla individuella frågor varje gång man klickar
 *  på nextBtn. 
 *  (ShowQuestion() körs genom nextQuestion() om det
 *  finns frågor kvar i frågor arrayen.)
 *  Här ser den skillnaden på de olika types som finns i
 *  arrayen och generarar ut två slags knappar beroende på om
 *  det är en checkbox eller radio fråga.*/
function showQuestion(question) {
  questionElement.innerText = question.question;
  span.innerHTML = "";
  span.innerHTML = `<b><u>Question: ${currentQuestionIndex + 1} / ${
    questions.length
  }</u></b> `;
  // Radio-button knapparna
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
      /** Tar information om man har klickat på rätt eller fel knapp.
       *  Sedan så ändrar den beroende på svar två olika boolean
       *  variablar till true/false.
       */
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
    // Checkbox-knapparna
  } else if (question.type === "checkbox") {
    // Kollar hur många rätta svar det finns på frågan.
    let amountTrue = 0;
    let trueChecked = 0;
    let falseChecked = 0;
    question.answers.forEach((check) => {
      if (check.correct === true) {
        amountTrue++;
      }
    });

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
      /** I och med att alla svar "rättas" i samma funktion som skapar dem.
       *  Så måste man använda en rad if statements användas.
       *  Dem kollar vilken knapp man har klickat på och
       *  lägger till "1" till antingen de rätta eller fel svars variablarna.
       */
      checkbox.addEventListener("click", () => {
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

let userAnswers = [];
let totalscore = 0;
/** Genererar nästa fråga samt sparar användarens svar
 *   Sedan kollar ett if statement om quizet är klart
 *   och antingen startar getResult() eller kör showQuestion()
 *   som i sin tur kör nextQuestion() igen.
 */
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
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
  } else {
    nextBtn.innerHTML = "Get result";
    getResult();
  }
}

let maxQuest = questions.length;
/** Visar en ny container som innehållar alla frågor och
 *  visar information från userAnswer arrayen.
 */
function getResult() {
  // Gömmer/skapar de element som används i endast denna funktion.
  nextBtn.classList.add("hide");
  questionContainer.classList.add("hide");
  const result = document.createElement("p");
  listContainer.classList.remove("hide");
  const answerDiv = document.createElement("div");
  answerDiv.id = "answer-list";

  //Går igenom alla frågor och skapar text och struktur för dem.
  questions.forEach((obj, i) => {
    list = document.createElement("div");
    listContainer.append(list);
    let h3 = document.createElement("h3");
    let p = document.createElement("p");
    h3.innerHTML = `<b><u>Question</u></b>`;
    h3.innerHTML += `<br><b>${obj.question}<b>`;
    let userAns = userAnswers[i];
    p.innerHTML = `Your answer: <u>${userAns}</u>`;
    list.append(h3);

    // Ger färg till rätta och fel svar.
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
    answerDiv.append(list);
  });
  listContainer.append(answerDiv);

  // Ger färg till en text baserat på hur många rätt man fått.
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
  mainContainer.append(p);
  mainContainer.append(result);
}

// Skapar en darkmode knapp som togglar två html klasser.
darkModeBtn.addEventListener("click", () => {
  let element = document.body;
  mainContainer.style.backgroundcolor = "black";
  element.classList.toggle("dark-mode");
});
