// Lista de imagens (nomes)
const imageNames = [
  'comic1.png',
  'comic2.png',
  'comic3.png'
];

let currentIndex = 0;
let currentLanguage = 'eng';  // Idioma padrão
let langData = {};  // Objeto para armazenar os textos traduzidos

// Função para carregar o arquivo JSON de linguagem
function loadLanguage(language) {
  currentLanguage = language;  // Atualiza a linguagem atual
  fetch(`Lang/${language}.json`)
    .then(response => response.json())
    .then(data => {
      langData = data;
      updateTexts();  // Atualiza os textos quando a linguagem é carregada
      updateImage();  // Atualiza as imagens para o idioma selecionado
    });
}

// Função para mudar a linguagem
function changeLanguage(language) {
  loadLanguage(language);
}

// Função para atualizar os textos na página
function updateTexts() {
  document.getElementById('prev-button').textContent = langData.previous;
  document.getElementById('next-button').textContent = langData.next;
  document.getElementById('language-label').textContent = `${langData.language}:`;
  updatePageNumber();  // Atualiza o número da página com os textos novos
}

// Função para atualizar o número da página
function updatePageNumber() {
  document.getElementById('page-number').textContent = `${langData.page} ${currentIndex + 1} ${langData.of} ${imageNames.length}`;
}

// Função para mudar a imagem
function changeImage(direction) {
  currentIndex += direction;

  // Verifica se o índice está dentro do limite
  if (currentIndex < 0) {
    currentIndex = 0;
  } else if (currentIndex >= imageNames.length) {
    currentIndex = imageNames.length - 1;
  }

  // Atualiza a imagem
  updateImage();

  // Atualiza o número da página
  updatePageNumber();

  // Desabilita o botão "Anterior" se estivermos na primeira imagem
  document.getElementById('prev-button').disabled = currentIndex === 0;

  // Desabilita o botão "Próximo" se estivermos na última imagem
  document.getElementById('next-button').disabled = currentIndex === imageNames.length - 1;
}

// Função para atualizar a imagem de acordo com a linguagem
function updateImage() {
  const imagePath = `The Comics/${currentLanguage}/${imageNames[currentIndex]}`;
  document.getElementById('comic-image').src = imagePath;
}

// Função para alternar entre modo claro e escuro
function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme');
  const modeToggle = document.querySelector('.mode-toggle');

  if (currentTheme === 'dark') {
    body.removeAttribute('data-theme');
    modeToggle.textContent = '🌙'; // Lua para modo escuro
  } else {
    body.setAttribute('data-theme', 'dark');
    modeToggle.textContent = '☀️'; // Sol para modo claro
  }
}

// Inicializa a página com a linguagem padrão (português)
loadLanguage('eng');
