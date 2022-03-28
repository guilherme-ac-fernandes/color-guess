// Posições
const ballSection = document.querySelector('#ball-section');
const colorToFind = document.getElementById('rgb-color');
const answerPosition = document.getElementById('answer');
const resetButton = document.getElementById('reset-game');
const scorePosition = document.getElementById('score');
let score = 0;

// Gera um número aleatório - presente também no meu projeto Mistery Letter
// Função de gerar número aleatório entre valor máximo e mínimo preoveniente da documentaçãp presente no link abaixo, alterando apenas Math.floor para Math.round
// source: https://www.w3schools.com/js/js_random.asp
function getRndInteger(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

// Função de gerar cores aleatórias
function randomRGBArray() {
  const colorArray = [];
  for (let j = 0; j < 6; j += 1) {
    const rgbColor1 = getRndInteger(0, 255);
    const rgbColor2 = getRndInteger(0, 255);
    const rgbColor3 = getRndInteger(0, 255);
    const rgbColor = `${rgbColor1}, ${rgbColor2}, ${rgbColor3}`;
    colorArray.push(rgbColor);
  }
  return colorArray;
}

// Escolher cor
function chooseColor(array) {
  const position = getRndInteger(0, 5);
  colorToFind.innerText = `(${array[position]})`;
  // console.log(position);
  // console.log(array[position]);
}

// Função de criar as divs
function createColorsDiv() {
  const divColors = randomRGBArray();
  // console.log(divColors);
  for (let i = 0; i < 6; i += 1) {
    const div = document.createElement('div');
    div.className = 'ball';
    div.style.backgroundColor = `rgb(${divColors[i]})`;
    ballSection.appendChild(div);
  }
  chooseColor(divColors);
}

// Função para avaliar a resposta do usuário
function checkAnswer(event) {
  const eventChoose = event.target.style.backgroundColor;
  if (eventChoose === `rgb${colorToFind.innerText}`) {
    answerPosition.innerText = 'Acertou!';
    score += 3;
    scorePosition.innerText = score;

  } else {
    answerPosition.innerText = 'Errou! Tente novamente!';
  }
}

// Função para reiniar o jogo
function resetGame() {
  answerPosition.innerText = 'Escolha uma cor';
  // Remover as div coloridas antigas para incluit novas
  for (let z = 0; z < ballSection.childNodes.length; z += 1) {
    const position = ballSection.childNodes[z];
    ballSection.removeChild(position);
    z -= 1;
  }
  createColorsDiv();
}

// Incluir pontuação

window.onload = () => {
  createColorsDiv();
  ballSection.addEventListener('click', checkAnswer);
  resetButton.addEventListener('click', resetGame);
};
