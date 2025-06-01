function initThemeSwitcher() {
  const switcher = document.getElementById('theme-switcher');
  const body = document.body;
  
  if (!switcher) {
    console.error('Theme switcher element not found');
    return;
  }
  
  // Função para atualizar o ícone
  function updateIcon() {
    const isLight = body.classList.contains('light-theme');
    switcher.innerHTML = isLight ? 
      '<i class="fas fa-moon"></i>' : 
      '<i class="fas fa-sun"></i>';
  }
  
  // Verificar preferência salva na inicialização
  const savedTheme = localStorage.getItem('dark-theme');
  if (savedTheme === 'false') {
    body.classList.add('light-theme');
  } else if (savedTheme === null) {
    // Se não há preferência salva, usar tema escuro como padrão
    localStorage.setItem('dark-theme', 'true');
  }
  
  // Atualizar ícone inicial
  updateIcon();
  
  // Event listener para o clique
  switcher.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const isDark = !body.classList.contains('light-theme');
    localStorage.setItem('dark-theme', isDark.toString());
    
    // Atualizar ícone
    updateIcon();
    
    // Disparar evento customizado para outros componentes
    window.dispatchEvent(new CustomEvent('themeChanged', {
      detail: { isDark: isDark }
    }));
  });
}

document.addEventListener('DOMContentLoaded', initThemeSwitcher);