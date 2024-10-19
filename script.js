// Lista de imagens dentro da pasta "The Comics"
const images = [
  'The Comics/comic1.png',
  'The Comics/comic2.png',
  'The Comics/comic3.png'
];

let currentIndex = 0;
let langData = {}; // Objeto para armazenar os textos traduzidos

// Função para carregar o arquivo JSON de linguagem
function loadLanguage(language) {
  fetch(`Lang/${language}.json`)
    .then(response => response.json())
    .then(data => {
      langData = data;
      updateTexts();  // Atualiza os textos quando a linguagem é carregada
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
  updatePageNumber();  // Atualiza o número da página com os textos novos
}

// Função para atualizar o número da página
function updatePageNumber() {
  document.getElementById('page-number').textContent = `${langData.page} ${currentIndex + 1} ${langData.of} ${images.length}`;
}

// Função para mudar a imagem
function changeImage(direction) {
  currentIndex += direction;

  // Atualiza a imagem
  document.getElementById('comic-image').src = images[currentIndex];

  // Atualiza o número da página
  updatePageNumber();

  // Desabilita o botão "Anterior" se estivermos na primeira imagem
  document.getElementById('prev-button').disabled = currentIndex === 0;

  // Desabilita o botão "Próximo" se estivermos na última imagem
  document.getElementById('next-button').disabled = currentIndex === images.length - 1;
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
loadLanguage('pt-br');
