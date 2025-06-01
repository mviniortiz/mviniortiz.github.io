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
    
    // Cores adaptáveis ao tema
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const labelColor = isDarkMode ? '#ffffff' : '#1f2937';
    
    // Dados das habilidades com projetos associados
    const skillsData = {
      labels: ['Power BI', 'SQL', 'Python', 'Excel', 'Looker Studio', 'Figma', 'Pentaho', 'Databricks', 'Oracle', 'KNIME'],
      datasets: [{
        label: 'Nível de Proficiência',
        data: [95, 90, 85, 88, 80, 75, 70, 65, 72, 68],
        backgroundColor: 'rgba(220, 38, 38, 0.2)',
        borderColor: 'rgba(220, 38, 38, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(220, 38, 38, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(220, 38, 38, 1)',
        pointRadius: isMobile ? 4 : 6,
        pointHoverRadius: isMobile ? 6 : 8
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
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            mode: 'point',
            intersect: true,
            position: 'nearest',
            backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            titleColor: isDarkMode ? '#ffffff' : '#1f2937',
            bodyColor: isDarkMode ? '#d1d5db' : '#374151',
            borderColor: 'rgba(220, 38, 38, 1)',
            borderWidth: 2,
            cornerRadius: 12,
            padding: 16,
            displayColors: false,
            titleFont: {
              size: 14,
              weight: 'bold'
            },
            bodyFont: {
              size: 12
            },
            animation: {
              duration: 200
            },
            external: function(context) {
              // Tooltip Element
              let tooltipEl = document.getElementById('chartjs-tooltip');
              
              // Create element on first render
              if (!tooltipEl) {
                tooltipEl = document.createElement('div');
                tooltipEl.id = 'chartjs-tooltip';
                tooltipEl.innerHTML = '<table></table>';
                document.body.appendChild(tooltipEl);
              }
              
              // Hide if no tooltip
              const tooltipModel = context.tooltip;
              if (tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = 0;
                tooltipEl.style.visibility = 'hidden';
                return;
              }
              
              // Show tooltip
              tooltipEl.style.visibility = 'visible';
              
              // Set caret Position
              tooltipEl.classList.remove('above', 'below', 'no-transform');
              if (tooltipModel.yAlign) {
                tooltipEl.classList.add(tooltipModel.yAlign);
              } else {
                tooltipEl.classList.add('no-transform');
              }
              
              function getBody(bodyItem) {
                return bodyItem.lines;
              }
              
              // Set Text
              if (tooltipModel.body) {
                const titleLines = tooltipModel.title || [];
                const bodyLines = tooltipModel.body.map(getBody);
                
                let innerHtml = '<thead>';
                
                titleLines.forEach(function(title) {
                  innerHtml += '<tr><th>' + title + '</th></tr>';
                });
                innerHtml += '</thead><tbody>';
                
                bodyLines.forEach(function(body, i) {
                  const colors = tooltipModel.labelColors[i];
                  let style = 'background:' + colors.backgroundColor;
                  style += '; border-color:' + colors.borderColor;
                  style += '; border-width: 2px';
                  const span = '<span style="' + style + '"></span>';
                  innerHtml += '<tr><td>' + span + body + '</td></tr>';
                });
                innerHtml += '</tbody>';
                
                let tableRoot = tooltipEl.querySelector('table');
                tableRoot.innerHTML = innerHtml;
              }
              
              // `this` will be the overall tooltip
              const position = context.chart.canvas.getBoundingClientRect();
              const bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);
              
              // Display, position, and set styles for font
              tooltipEl.style.opacity = 1;
              tooltipEl.style.position = 'absolute';
              tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
              tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
              tooltipEl.style.font = bodyFont.string;
              tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
              tooltipEl.style.pointerEvents = 'none';
              tooltipEl.style.backgroundColor = isDarkMode ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)';
              tooltipEl.style.borderRadius = '12px';
              tooltipEl.style.border = '2px solid rgba(220, 38, 38, 1)';
              tooltipEl.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
              tooltipEl.style.zIndex = '1000';
              tooltipEl.style.maxWidth = '300px';
              tooltipEl.style.color = isDarkMode ? '#ffffff' : '#1f2937';
            },
            callbacks: {
              title: function(context) {
                const skillName = context[0].label;
                return skillName;
              },
              label: function(context) {
                return '';
              },
              afterLabel: function(context) {
                const skillName = context.label;
                const skill = skillsInfo[skillName];
                if (skill) {
                  const lines = [];
                  lines.push(`Nível: ${skill.level}%`);
                  lines.push(`Descrição: ${skill.description}`);
                  lines.push('');
                  lines.push('Projetos:');
                  skill.projects.forEach(project => {
                    lines.push(`• ${project}`);
                  });
                  return lines;
                }
                return [`Nível: ${context.parsed.r}%`];
              }
            }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            min: 0,
            ticks: {
              stepSize: 20,
              display: false
            },
            grid: {
              color: gridColor,
              lineWidth: 1
            },
            angleLines: {
              color: gridColor,
              lineWidth: 1
            },
            pointLabels: {
              color: labelColor,
              font: {
                family: 'Poppins',
                size: isMobile ? 10 : 12,
                weight: '500'
              },
              padding: isMobile ? 20 : 25,
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
          intersect: true,
          mode: 'point'
        },
        onHover: (event, activeElements, chart) => {
          ctx.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
          
          // Limpar tooltip quando não há elementos ativos
          if (activeElements.length === 0) {
            const tooltipEl = document.getElementById('chartjs-tooltip');
            if (tooltipEl) {
              tooltipEl.style.opacity = '0';
              tooltipEl.style.visibility = 'hidden';
              tooltipEl.style.pointerEvents = 'none';
            }
          }
        }
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
      const newGridColor = newIsDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
      const newLabelColor = newIsDarkMode ? '#ffffff' : '#1f2937';
      
      // Atualizar cores do gráfico
      skillsChart.options.scales.r.grid.color = newGridColor;
      skillsChart.options.scales.r.angleLines.color = newGridColor;
      skillsChart.options.scales.r.pointLabels.color = newLabelColor;
      
      // Atualizar cores do tooltip
      skillsChart.options.plugins.tooltip.backgroundColor = newIsDarkMode ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)';
      skillsChart.options.plugins.tooltip.titleColor = newIsDarkMode ? '#ffffff' : '#1f2937';
      skillsChart.options.plugins.tooltip.bodyColor = newIsDarkMode ? '#d1d5db' : '#374151';
      
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