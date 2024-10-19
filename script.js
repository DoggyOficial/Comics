// Lista de imagens dentro da pasta "The Comics"
const images = [
  'The Comics/comic1.png',
  'The Comics/comic2.png',
  'The Comics/comic3.png'
];

let currentIndex = 0;

// Função para mudar a imagem
function changeImage(direction) {
  currentIndex += direction;

  // Atualiza a imagem
  document.getElementById('comic-image').src = images[currentIndex];

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
