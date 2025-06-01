interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  skills: string[];
  details: string[];
  link: string;
}

// Dados dos projetos
const projects: Project[] = [
  {
    id: 'sales-analytics',
    title: 'Advanced Sales Analytics Dashboard',
    description: 'Plataforma abrangente de análise de vendas...',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    skills: ['PowerBI', 'SQL', 'Sales Analytics', 'Customer Segmentation'],
    details: [
      'Desenvolveu rastreamento interativo de receita com análise de tendências',
      'Implementou análise de segmentação de clientes e cálculos de valor vitalício'
    ],
    link: 'https://app.powerbi.com/view?r=eyJrIjoiNTEyNmFkOGQtZTU5YS00MzlkLTk5MzMtYjhkOGVlOTFmNDc5IiwidCI6IjMyNTU3NjRiLTdiNWItNDY0Ni1hN2I0LWJmOTU3MmM2OGFhZSJ9'
  },
  // Outros projetos...
];

// Renderizar projetos
function renderProjects(): void {
  const container = document.querySelector('.projects-grid');
  if (!container) return;
  
  projects.forEach(project => {
    const card = document.createElement('div');
    card.classList.add('project-card');
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" />
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="skills">
        ${project.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
      </div>
      <a href="${project.link}" target="_blank" rel="noopener noreferrer">View Project</a>
    `;
    container.appendChild(card);
  });
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  // renderProjects(); // Comentado pois os projetos estão definidos estaticamente no HTML
  initializeAnimations();
});