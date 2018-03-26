
document.getElementById('start').addEventListener('click', getData);
var amounts;

function createQuestion(question, answerType){
  if(answerType === "multiple"){
    let answers = [
      {text: question.correct_answer, correct: true},
      {text: question.incorrect_answers[0], correct: false},
      {text: question.incorrect_answers[1], correct: false},
      {text: question.incorrect_answers[2], correct: false}
    ];
    var randomAnswers = shuffle(answers);
    let answerbuttons = randomAnswers.map(function(answer){
      if (answer.correct === true){
        return `<p class="options"> <input class="correct" name="${question.question}" type="radio">${answer.text}</input> </p>
        `
      }
      return `<p class="options"> <input class="incorrect" name="${question.question}" type="radio">${answer.text}</input> </p>`
    })
      let template = ` <p class="question"> ${question.question} </p> <br/> ${answerbuttons.join(' ')}`;
      return template;
    }
}
function getData(){
  let difficulty = document.getElementById('difficulty').value;
  let type = document.getElementById('type').value;
  let category = document.getElementById('category').value;
  amounts = document.getElementById('amounts').value;
  if(difficulty !== "easy" && difficulty !== "medium" && difficulty !== "hard"){
    throw Error(`Bad Arguments: ${difficulty}`);
  }
  else if(type !== "multiple" && type !== "boolean"){
    throw Error(`Bad Arguments: ${type}`);
  }
  else if(amounts < 1 || amounts > 50){
    throw Error(`Bad Arguments: Outside the range`);
  }
  let dataFile = `https://opentdb.com/api.php?amount=${amounts}&category=${category}&difficulty=${difficulty}&type=${type}`;
  fetch(dataFile)
    .then(function(response){
      return(response.json());
    })
    .then(function(data){
      console.log(data);
      const createTypedQuestion = result => createQuestion(result, type)
      let answerhtml = data.results.map(createTypedQuestion);
      let template = answerhtml.join(`<br/> <br/>`);
      template += `<button type="button" class="button" id="submit">Submit</button>`
      document.getElementById('content').innerHTML = template;
      console.log(data);
      document.getElementById('submit').addEventListener('click', submitAnswers)
    })
}

function submitAnswers(){
  let guesses = document.querySelectorAll(".options input");
  let correct = 0;
  for (var i= 0; i < guesses.length; i++){
    if (guesses[i].className === "correct" && guesses[i].checked) {
      correct++;
    }
  }
  let score = (correct/amounts)*100;
  console.log(score);
  document.getElementById('content').innerHTML = document.getElementById('content').innerHTML
  + ` <br/> <p> Your score is ${score}%! <p> <button type="button" class="button" onclick="getData()">
  Try Another!</button> </p> </p> <p> <button type ="button" class="button" onclick="restart()">Home</button> </p>`;
}

function restart(){
  location.reload();
}

function shuffle(answers){
  var index = answers.length, temporaryValue, randomIndex;
  while (0 !== index){
    randomIndex = Math.floor(Math.random() * index);
    index -= 1;
    temporaryValue = answers[index];
    answers[index] = answers[randomIndex];
    answers[randomIndex] = temporaryValue;
  }
  return answers;
}
