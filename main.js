myQuestions = [
  {
    type: "trueFalse",
    question: "Kungen en kung?",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: "a",
  },
  {
    type: "trueFalse",
    question: "Sverige är en delstat?",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: "b",
  },
  {
    type: "multChoice",
    question: "Vilket djur har 4 ben?",
    answers: {
      a: "Apa",
      b: "Ko",
      c: "Fisk",
      d: "Papegoja",
    },
    correctAnswer: "b",
  },
  {
    type: "checkbox",
    question: "Vilka länder har en kust",
    answers: {
      a: "Uzbekistan",
      b: "Mongolia",
      c: "Pakistan",
      d: "Turkmenistan",
    },
    correctAnswer: ["c", "d"],
  },
  {
    type: "trueFalse",
    question: "Är det tre laxar i en lax ask?",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: "a",
  },
  {
    type: "multChoice",
    question: "Vart i världen kan du hitta det lutande tornet i Pisa?",
    answers: {
      a: "Italien",
      b: "Frankrike",
      c: "Grekland",
      d: "Spanien",
    },
    correctAnswer: "a",
  },
  {
    type: "trueFalse",
    question: "Kapitalism är destruktivt",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: "a",
  },
  {
    type: "checkbox",
    question: "Vilka av dessa VST-plugins är ljudeffekter",
    answers: {
      a: "Echoboy",
      b: "OTT",
      c: "Tal-u-no-lx",
      d: "Portal",
    },
    correctAnswer: ["a", "b", "c"],
  },
  {
    type: "trueFalse",
    question: "3+4=6+1",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: "a",
  },
  {
    type: "trueFalse",
    question: "Kan en groda svara på en fråga",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: "b",
    // correctAnswerString: "Grodor kan inte prata så... nej.",
  },
];
// console.log(myQuestions[7].correctAnswer);

const quizDiv = document.querySelector("#quiz");
const resultsDiv = document.querySelector("#results");
const submitBtn = document.querySelector("#submit");
(function () {
  function buildQuiz() {
    const output = [];

    myQuestions.forEach((currentQuestion, questionNumber) => {
      if (
        currentQuestion.type === "trueFalse" ||
        currentQuestion.type === "multChoice"
      ) {
        const answers = [];

        for (letter in currentQuestion.answers) {
          answers.push(`
          <label>
          <input type="radio" name="question${questionNumber}" value="${letter}">
          ${currentQuestion.answers[letter]}
          </label>`);
        }

        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>`
        );
      } else if (currentQuestion.type === "checkbox") {
        const answers = [];

        for (letter in currentQuestion.answers) {
          answers.push(`
          <label>
          <input type="checkbox" class="check" name="question${questionNumber}" value="${letter}">
          ${currentQuestion.answers[letter]}
          </label>`);
        }

        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>`
        );
      }
    });
    quizDiv.innerHTML = output.join("");
  }

  function showResults() {
    const answerS = quizDiv.querySelectorAll(".answers");
    // const correct = document.createElement("p");
    // correct.innerHTML = "";
    let numCorrect = 0;
    let maxQuest = myQuestions.length;

    // let values = [];
    // const userAnswer2 = document.querySelectorAll(".check");
    // userAnswer2.forEach((checkbox) => {
    //   if (checkbox.checked) {
    //     values.push(checkbox.value);
    //   }
    // });
    // console.log(values);

    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answerCont = answerS[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerCont.querySelector(selector) || {}).value;

      if (
        currentQuestion.type === "trueFalse" ||
        currentQuestion.type === "multChoice"
      ) {
        // correct.innerHTML = currentQuestion.correctAnswerString;
        if (userAnswer === currentQuestion.correctAnswer) {
          numCorrect++;
          answerS[questionNumber].style.color = "green";
        } else {
          answerS[questionNumber].style.color = "red";
          // answerS[questionNumber].append(correct);
        }
      } else if (currentQuestion.type === "checkbox") {
        // if (currentQuestion.correctAnswer === values) {
        //   numCorrect++;
        //   answerS[questionNumber].style.color = "green";
        // } else {
        //   answerS[questionNumber].style.color = "red";
        //   // answerS[questionNumber].append(correct);
        // }
      }
    });
    resultsDiv.innerHTML = `${numCorrect} / ${myQuestions.length}`;
    const result = document.createElement("p");

    if (numCorrect > maxQuest * 0.75) {
      result.innerHTML = "MVG";
      result.style.color = "green";
    } else if (numCorrect > maxQuest * 0.5) {
      result.innerHTML = "G";
      result.style.color = "orange";
    } else if (numCorrect < maxQuest * 0.5) {
      result.innerHTML = "IG";
      result.style.color = "red";
    }
    resultsDiv.append(result);
  }

  buildQuiz();

  submitBtn.addEventListener("click", showResults);
})();

const darkModeBtn = document.querySelector("#darkMode");
darkModeBtn.addEventListener("click", () => {
  let element = document.body;
  element.classList.toggle("dark-mode");
});
