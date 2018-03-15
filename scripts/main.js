/* Javascript Page */
document.getElementById('start').addEventListener('click', getData);

dataFile = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"

function createQuestion(question){
  let answers = [
    {text: question.correct_answer, correct: true},
    {text: question.incorrect_answers[0], correct: false},
    {text: question.incorrect_answers[1], correct: false},
    {text: question.incorrect_answers[2], correct: false}
  ];
  let answerbuttons = answers.map(function(answer){
    if (answer.correct === true){
      return `<p class="answers"> <input class="correct" name="${question.question}" type="radio">${answer.text}</input> </p>
      `
    }
    return `<p class="answers"> <input class="incorrect" name="${question.question}" type="radio">${answer.text}</input> </p>`
  })
    let template = ` <p class="question"> ${question.question} </p> <br/> ${answerbuttons.join(' ')}`;
    return template;
}

function getData(){
  fetch(dataFile)
    .then(function(response){
      return(response.json());
    })
    .then(function(data){
      console.log(data);
      let answerhtml = data.results.map(createQuestion);
      let template = answerhtml.join(`<br/> <br/>`);
      template += `<button type="button" id="submit">Submit</button>`
      document.getElementById('content').innerHTML = template;
      console.log(data);
      document.getElementById('submit').addEventListener('click', submitAnswers)
    })
}

function submitAnswers(){
  let answers = document.querySelectorAll(".answers input");
  let correct = 0;
  for (var i= 0; i < answers.length; i++) {
    if (answers[i].className === "correct" && answers[i].checked) {
      correct++;
    }
  }
  let score = (correct/10)*100;
  console.log(score);
  document.getElementById('content').innerHTML = "Your score is " + score + "%!" + `<br/> <br/> <p> <button type="button" onclick="restart()">Try Another!</button> </p>`;
}

function restart(){
  location.reload();
}
