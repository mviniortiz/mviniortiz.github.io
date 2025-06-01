document.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('skillsChart');
  
  if (!ctx) {
    console.error('Canvas element with id "skillsChart" not found');
    return;
  }
  
  // Verificar se Chart.js está disponível
  if (typeof Chart === 'undefined') {
    console.error('Chart.js não está carregado');
    return;
  }
  
  try {
    // Detectar se é dispositivo móvel
    const isMobile = window.innerWidth <= 768;
    
    // Detectar tema atual
    const isDarkMode = !document.body.classList.contains('light-theme');
    
    // Cores adaptáveis ao tema com gradientes modernos
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)';
    const labelColor = isDarkMode ? '#ffffff' : '#1f2937';
    const accentColor = isDarkMode ? '#ef4444' : '#dc2626'; // Vermelho moderno
    const secondaryColor = isDarkMode ? '#f97316' : '#ea580c'; // Laranja elegante
    
    // Criar gradiente para o fundo do radar
    const canvas = ctx.getContext('2d');
    const gradient = canvas.createRadialGradient(0, 0, 0, 0, 0, 200);
    gradient.addColorStop(0, isDarkMode ? 'rgba(239, 68, 68, 0.3)' : 'rgba(220, 38, 38, 0.2)');
    gradient.addColorStop(0.5, isDarkMode ? 'rgba(249, 115, 22, 0.2)' : 'rgba(234, 88, 12, 0.15)');
    gradient.addColorStop(1, isDarkMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(220, 38, 38, 0.05)');
    
    // Gradiente para a borda
    const borderGradient = canvas.createRadialGradient(0, 0, 0, 0, 0, 200);
    borderGradient.addColorStop(0, accentColor);
    borderGradient.addColorStop(1, secondaryColor);
    
    // Dados das habilidades com projetos associados
    const skillsData = {
      labels: ['Power BI', 'SQL', 'Python', 'Excel', 'Looker Studio', 'Figma', 'Pentaho', 'Databricks', 'Oracle', 'KNIME'],
      datasets: [{
        label: 'Nível de Proficiência',
        data: [95, 90, 85, 88, 80, 75, 70, 65, 72, 68],
        backgroundColor: gradient,
        borderColor: borderGradient,
        borderWidth: 3,
        pointBackgroundColor: isDarkMode ? accentColor : '#ffffff',
        pointBorderColor: isDarkMode ? '#ffffff' : accentColor,
        pointBorderWidth: 3,
        pointHoverBackgroundColor: isDarkMode ? '#ffffff' : accentColor,
        pointHoverBorderColor: isDarkMode ? accentColor : '#ffffff',
        pointHoverBorderWidth: 4,
        pointRadius: isMobile ? 5 : 10,
        pointHoverRadius: isMobile ? 7 : 15,
        tension: 0.1,
        fill: true
      }]
    };
    
    // Informações detalhadas de cada habilidade
    const skillsInfo = {
      'Power BI': {
        level: 95,
        projects: ['Advanced Sales Analytics Dashboard', 'IT Equipment & Acquisitions Dashboard', 'Sales Performance Accelerator'],
        description: 'Criação de dashboards interativos e análises avançadas'
      },
      'SQL': {
        level: 90,
        projects: ['Advanced Sales Analytics Dashboard', 'IT Equipment & Acquisitions Dashboard', 'Dashboard de Absenteísmo e Segurança'],
        description: 'Consultas complexas, otimização e modelagem de dados'
      },
      'Python': {
        level: 85,
        projects: ['BrightBuy: E-commerce Intelligence', 'Lead Generation Command Center'],
        description: 'Análise de dados, automação e machine learning'
      },
      'Excel': {
        level: 88,
        projects: ['Sales Performance Accelerator', 'Dashboard de Absenteísmo e Segurança'],
        description: 'Análises avançadas, VBA e modelagem financeira'
      },
      'Looker Studio': {
        level: 80,
        projects: ['BrightBuy: E-commerce Intelligence', 'Lead Generation Command Center'],
        description: 'Dashboards colaborativos e relatórios automatizados'
      },
      'Figma': {
        level: 75,
        projects: ['Design de interfaces para dashboards'],
        description: 'Prototipagem e design de interfaces de usuário'
      },
      'Pentaho': {
        level: 70,
        projects: ['Projetos de ETL e integração de dados'],
        description: 'Integração e transformação de dados'
      },
      'Databricks': {
        level: 65,
        projects: ['Análises de big data e machine learning'],
        description: 'Processamento de big data e analytics avançados'
      },
      'Oracle': {
        level: 72,
        projects: ['Sistemas corporativos e data warehousing'],
        description: 'Administração de banco de dados e consultas complexas'
      },
      'KNIME': {
        level: 68,
        projects: ['Workflows de análise de dados'],
        description: 'Análise visual de dados e workflows automatizados'
      }
    };
    
    // Configuração do gráfico
    const config = {
      type: 'radar',
      data: skillsData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 2000,
          easing: 'easeInOutQuart',
          animateRotate: true,
          animateScale: true
        },
        elements: {
          line: {
            borderJoinStyle: 'round',
            borderCapStyle: 'round'
          },
          point: {
            hoverRadius: isMobile ? 7 : 14,
            hitRadius: 15
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            min: 0,
            ticks: {
              stepSize: 20,
              display: true,
              backdropColor: 'transparent',
              color: isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.4)',
              font: {
                family: 'Poppins',
                size: isMobile ? 10 : 12,
                weight: '400'
              },
              z: 1
            },
            grid: {
              color: function(context) {
                if (context.tick.value === 0) {
                  return 'transparent';
                }
                return isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.06)';
              },
              lineWidth: function(context) {
                return context.tick.value === 100 ? 2 : 1;
              },
              circular: true
            },
            angleLines: {
              color: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
              lineWidth: 1.5
            },
            pointLabels: {
              color: labelColor,
              font: {
                family: 'Poppins',
                size: isMobile ? 12 : 15,
                weight: '600'
              },
              padding: isMobile ? 45 : 45,
              callback: function(value) {
                // Quebrar labels longos em múltiplas linhas
                if (value.length > 8) {
                  return value.split(' ');
                }
                return value;
              }
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'none'
        },

      }
    };
    
    // Criar o gráfico
    const skillsChart = new Chart(ctx, config);
    
    // Adicionar evento para limpar tooltip quando mouse sair do canvas
    ctx.addEventListener('mouseleave', function() {
      const tooltipEl = document.getElementById('chartjs-tooltip');
      if (tooltipEl) {
        tooltipEl.style.opacity = 0;
        tooltipEl.style.visibility = 'hidden';
      }
    });
    
    // Função para atualizar cores baseado no tema
    function updateChartColors() {
      const newIsDarkMode = !document.body.classList.contains('light-theme');
      const newGridColor = newIsDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)';
      const newLabelColor = newIsDarkMode ? '#ffffff' : '#1f2937';
      const newAccentColor = '#ef4444'; // Vermelho
      const newSecondaryColor = '#f97316'; // Laranja
      
      // Recriar gradientes com as novas cores
      const newGradient = canvas.createRadialGradient(0, 0, 0, 0, 0, 200);
      newGradient.addColorStop(0, newIsDarkMode ? 'rgba(239, 68, 68, 0.3)' : 'rgba(220, 38, 38, 0.2)');
      newGradient.addColorStop(0.5, newIsDarkMode ? 'rgba(249, 115, 22, 0.2)' : 'rgba(234, 88, 12, 0.15)');
      newGradient.addColorStop(1, newIsDarkMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(220, 38, 38, 0.05)');
      
      const newBorderGradient = canvas.createRadialGradient(0, 0, 0, 0, 0, 200);
      newBorderGradient.addColorStop(0, newAccentColor);
      newBorderGradient.addColorStop(1, newSecondaryColor);
      
      // Atualizar dataset
      skillsChart.data.datasets[0].backgroundColor = newGradient;
      skillsChart.data.datasets[0].borderColor = newBorderGradient;
      skillsChart.data.datasets[0].pointBackgroundColor = newIsDarkMode ? newAccentColor : '#ffffff';
      skillsChart.data.datasets[0].pointBorderColor = newIsDarkMode ? '#ffffff' : newAccentColor;
      skillsChart.data.datasets[0].pointHoverBackgroundColor = newIsDarkMode ? '#ffffff' : newAccentColor;
      skillsChart.data.datasets[0].pointHoverBorderColor = newIsDarkMode ? newAccentColor : '#ffffff';
      
      // Atualizar cores do gráfico
      skillsChart.options.scales.r.angleLines.color = newIsDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)';
      skillsChart.options.scales.r.pointLabels.color = newLabelColor;
      skillsChart.options.scales.r.ticks.color = newIsDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.4)';
      
      // Atualizar cores do tooltip
      skillsChart.options.plugins.tooltip.backgroundColor = newIsDarkMode ? 'rgba(15, 23, 42, 0.98)' : 'rgba(255, 255, 255, 0.98)';
      skillsChart.options.plugins.tooltip.titleColor = newIsDarkMode ? '#ffffff' : '#1e293b';
      skillsChart.options.plugins.tooltip.bodyColor = newIsDarkMode ? '#e2e8f0' : '#475569';
      skillsChart.options.plugins.tooltip.borderColor = newAccentColor;
      
      skillsChart.update('none');
    }
    
    // Escutar evento customizado de mudança de tema
    window.addEventListener('themeChanged', updateChartColors);
    
    // Observar mudanças de tema (fallback)
    const observer = new MutationObserver(updateChartColors);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
    
  } catch (error) {
    console.error('Erro ao criar o gráfico de habilidades:', error);
  }
});