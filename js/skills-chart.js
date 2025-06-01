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
    const accentColor = isDarkMode ? '#3b82f6' : '#2563eb'; // Azul moderno
    const secondaryColor = isDarkMode ? '#8b5cf6' : '#7c3aed'; // Roxo elegante
    
    // Criar gradiente para o fundo do radar
    const canvas = ctx.getContext('2d');
    const gradient = canvas.createRadialGradient(0, 0, 0, 0, 0, 200);
    gradient.addColorStop(0, isDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(37, 99, 235, 0.2)');
    gradient.addColorStop(0.5, isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.15)');
    gradient.addColorStop(1, isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.05)');
    
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
        pointBackgroundColor: accentColor,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 3,
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: accentColor,
        pointHoverBorderWidth: 4,
        pointRadius: isMobile ? 6 : 8,
        pointHoverRadius: isMobile ? 8 : 12,
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
            hoverRadius: isMobile ? 10 : 14,
            hitRadius: 15
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            mode: 'point',
            intersect: true,
            position: 'nearest',
            backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)',
            titleColor: isDarkMode ? '#ffffff' : '#1e293b',
            bodyColor: isDarkMode ? '#e2e8f0' : '#475569',
            borderColor: accentColor,
            borderWidth: 2,
            cornerRadius: 16,
            padding: 20,
            displayColors: false,
            titleFont: {
              size: 15,
              weight: 'bold',
              family: 'Poppins'
            },
            bodyFont: {
              size: 13,
              family: 'Poppins'
            },
            animation: {
              duration: 300,
              easing: 'easeOutQuart'
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
              tooltipEl.style.backgroundColor = isDarkMode ? 'rgba(15, 23, 42, 0.98)' : 'rgba(255, 255, 255, 0.98)';
              tooltipEl.style.borderRadius = '16px';
              tooltipEl.style.border = `2px solid ${accentColor}`;
              tooltipEl.style.boxShadow = isDarkMode ? 
                '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.2)' : 
                '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(37, 99, 235, 0.2)';
              tooltipEl.style.zIndex = '1000';
              tooltipEl.style.maxWidth = '320px';
              tooltipEl.style.color = isDarkMode ? '#ffffff' : '#1e293b';
              tooltipEl.style.backdropFilter = 'blur(12px)';
              tooltipEl.style.webkitBackdropFilter = 'blur(12px)';
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
              display: true,
              backdropColor: 'transparent',
              color: isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.4)',
              font: {
                family: 'Poppins',
                size: isMobile ? 8 : 10,
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
                size: isMobile ? 11 : 13,
                weight: '600'
              },
              padding: isMobile ? 25 : 30,
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
          mode: 'nearest'
        },
        onHover: (event, activeElements, chart) => {
          ctx.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
          
          // Efeito de hover nos pontos
          if (activeElements.length > 0) {
            const activeElement = activeElements[0];
            const dataset = chart.data.datasets[activeElement.datasetIndex];
            
            // Criar efeito de pulsação no ponto ativo
            chart.canvas.style.filter = 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))';
          } else {
            chart.canvas.style.filter = 'none';
            
            // Limpar tooltip quando não há elementos ativos
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
      const newGridColor = newIsDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)';
      const newLabelColor = newIsDarkMode ? '#ffffff' : '#1f2937';
      const newAccentColor = newIsDarkMode ? '#3b82f6' : '#2563eb';
      const newSecondaryColor = newIsDarkMode ? '#8b5cf6' : '#7c3aed';
      
      // Recriar gradientes com as novas cores
      const newGradient = canvas.createRadialGradient(0, 0, 0, 0, 0, 200);
      newGradient.addColorStop(0, newIsDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(37, 99, 235, 0.2)');
      newGradient.addColorStop(0.5, newIsDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.15)');
      newGradient.addColorStop(1, newIsDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.05)');
      
      const newBorderGradient = canvas.createRadialGradient(0, 0, 0, 0, 0, 200);
      newBorderGradient.addColorStop(0, newAccentColor);
      newBorderGradient.addColorStop(1, newSecondaryColor);
      
      // Atualizar dataset
      skillsChart.data.datasets[0].backgroundColor = newGradient;
      skillsChart.data.datasets[0].borderColor = newBorderGradient;
      skillsChart.data.datasets[0].pointBackgroundColor = newAccentColor;
      skillsChart.data.datasets[0].pointHoverBorderColor = newAccentColor;
      
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