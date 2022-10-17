myQuestions = [
  {
    question: "Kungen en kung?",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: "a",
    correctAnswerString: "Kungen är faktiskt en kung",
  },
  {
    question: "Sverige är en delstat?",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: "b",
  },
  {
    question: "Växter kan växa utan ljus?",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: "a",
  },
  {
    question: "Människan är ett djur?",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: "a",
  },
  {
    question: "Mcdonalds är en 'restuarang'?",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: "b",
  },
  {
    question: "Irland är en del av stor britanien?",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: "b",
  },
  {
    question: "Är det tre laxar i en lax ask?",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: "a",
  },
  {
    question: "Kapitalism är destruktivt",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: "a",
  },
  {
    question: "3+4=6+1",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: "a",
  },
  {
    question: "Kan en groda svara på en fråga",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: "b",
  },
];

const quizDiv = document.querySelector("#quiz");
const resultsDiv = document.querySelector("#results");
const submitBtn = document.querySelector("#submit");
(function () {
  function buildQuiz() {
    const output = [];

    myQuestions.forEach((currentQuestion, questionNumber) => {
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
    });
    quizDiv.innerHTML = output.join("");
  }

  function showResults() {
    const answerS = quizDiv.querySelectorAll(".answers");
    const correct = document.createElement("span");

    let numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answerCont = answerS[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerCont.querySelector(selector) || {}).value;

      correct.innerHTML = currentQuestion.correctAnswerString;
      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++;
        answerS[questionNumber].style.color = "green";
      } else {
        answerS[questionNumber].style.color = "red";
      }
    });
    resultsDiv.innerHTML = `${numCorrect} / ${myQuestions.length}`;
  }

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitBtn.addEventListener("click", showResults);
})();
const darkModeBtn = document.querySelector("#darkMode");

darkModeBtn.addEventListener("click", () => {
  let element = document.body;
  element.classList.toggle("dark-mode");
});
