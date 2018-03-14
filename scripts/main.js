/* Javascript Page */
document.getElementById('estart').addEventListener('click', getData);

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
      return `<p class="answers"> <input class="correct" name="answer" type="radio">${answer.text}</input> </p>
      `
    }
    return `<p class="answers"> <input class="incorrect" name="answer" type="radio">${answer.text}</input> </p>`
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
      document.getElementById('content').innerHTML = template;
    })
}
