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
    const card = createProjectCard(project);
    container.appendChild(card);
  });
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  initializeAnimations();
});