let boxes = document.getElementsByClassName('choice-grid');
let result = {};
let finishQuiz = document.querySelector('section:last-child');
let btn = document.querySelector('section button');

for (const box of boxes) {
  let selectedDiv;
  let image;
  let winnerDog;
  box.onclick = function (event) {
    let container = event.target;
    while (true) {
      if (container.tagName == 'DIV') {
        result[container.dataset.questionId] = container.dataset.choiceId;
        choseAnswer(container);
        if (Object.keys(result).length === 3) {
          winner(result);
          quizResult();
        }
        return;
      }
      container = container.parentNode;
    }
  }

  function choseAnswer(node) {

    if (selectedDiv) { // убрать существующую подсветку, если есть
      selectedDiv.classList.remove('chose');
      image.setAttribute('src', 'images/unchecked.png');
    }
    selectedDiv = node;
    selectedDiv.classList.add('chose'); // подсветить новый div
    image = selectedDiv.lastElementChild;
    image.setAttribute('src', 'images/checked.png'); //добавить галочку
    selectedDiv.classList.remove('noChose'); //убрать прозрачность с выбранного div
    let block = box.children; //задать прозрачность не выбранным div
    for (const box of block) {
      if (!box.classList.contains('chose')) {
        box.classList.add('noChose');
      }
    }
  }
}

btn.onclick = function (event) { 
  finishQuiz.classList.add('hidden');
  let cards = document.getElementsByClassName('card');
  for (const card of cards) {
    if (card.classList.contains('chose')) {
      card.classList.remove('chose');
      let imageCard = card.querySelector('img:last-child');
      console.log(imageCard);
      imageCard.setAttribute('src', 'images/unchecked.png');
    } else {
      card.classList.remove('noChose');
    }
  }
  window.scrollTo(0,0);
  result = {};
}

function winner(object) {
  let arr = Object.values(object);
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        winnerDog = arr[i];
      } else {
        winnerDog = arr[0];
      }
    }
  }
  return winnerDog;
}

function quizResult() {
  let headerReview = document.querySelector('section h2');
  let review = document.querySelector('section p');
  finishQuiz.classList.remove('hidden');
  headerReview.textContent = RESULTS_MAP[winnerDog].title;
  review.textContent = RESULTS_MAP[winnerDog].contents;
}
