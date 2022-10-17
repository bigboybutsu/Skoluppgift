<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="main.js" defer></script>
  </head>
  <body>
    <h1>Ankademin Quiz</h1>
    <div class="quiz">
      <div class="score">
        <span id="user-score">0</span>
        <span id="total-score">/ 10</span>
      </div>

      <div class="questions" id="question-zone">
        <div id="question-text"></div>
        <div class="options">
          <label for="opt1">Sant</label>
          <input type="radio" name="choice" id="opt1" value="1" />
          <label for="opt2">Falskt</label>
          <input type="radio" name="choice" id="opt2" value="2" />
        </div>
      </div>

      <div class="nav">
          <button class="prevBtn" id="prev">Previous question</button>
          <button class="nextBtn" id="next">Next questions</button>
          <button class="restartBtn" id="restart">Restart Quiz</button>
        <button class="submitBtn" id="submit">Submit answer</button>
      </div>
    </div>
  </body>
</html>
