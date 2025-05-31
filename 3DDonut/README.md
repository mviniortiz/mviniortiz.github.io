# 3D Donut Visualization

Este projeto contém diferentes implementações de visualizações 3D de uma rosquinha (toro) usando Python.

## Versões

Este projeto inclui várias implementações:

1. **Donut Estático** (donut3d.py) - Uma visualização simples com matplotlib
2. **Donut Animado** (animated_donut.py) - Uma visualização matplotlib com rotação
3. **Donut OpenGL** (opengl_donut.py) - Uma implementação avançada usando PyOpenGL e Pygame
4. **Donut Fancy** (fancy_donut.py) - Uma visualização matplotlib mais elaborada com efeitos visuais
5. **Donut Tkinter** (tkinter_donut.py) - Uma implementação básica usando apenas Tkinter (sem dependências externas)

## Requisitos

### Requisitos Mínimos
- Python 3.x

### Pacotes Específicos por Versão
- **donut3d.py e animated_donut.py**: NumPy, Matplotlib
- **opengl_donut.py**: NumPy, PyOpenGL, PyOpenGL-accelerate, Pygame
- **fancy_donut.py**: NumPy, Matplotlib
- **tkinter_donut.py**: Nenhuma dependência externa (usa apenas bibliotecas padrão do Python)

## Instalação

Instale todos os pacotes necessários usando pip:

```
pip install -r requirements.txt
```

Ou instale pacotes específicos para a versão que deseja executar:

```
# Para as versões matplotlib
pip install numpy matplotlib

# Para a versão OpenGL
pip install numpy pyopengl pyopengl-accelerate pygame
```

## Solucionando Problemas

### Problemas com OpenGL
Se a versão OpenGL não estiver funcionando, pode ser devido a:

1. **Dependências faltando** - Certifique-se de instalar todas as dependências necessárias:
   ```
   pip install numpy pygame PyOpenGL PyOpenGL-accelerate
   ```

2. **Drivers de vídeo** - O OpenGL requer drivers de vídeo adequados. Verifique se seus drivers estão atualizados.

3. **Compatibilidade de hardware** - Nem todos os computadores suportam OpenGL corretamente.

**Solução alternativa**: Use a versão `tkinter_donut.py` que não requer dependências externas ou aceleração de hardware.

## Executando os Programas

### Donut Estático (Matplotlib)
```
python donut3d.py
```

### Donut Animado (Matplotlib)
```
python animated_donut.py
```

### Donut OpenGL (Interativo)
```
python opengl_donut.py
```

### Donut Fancy (Matplotlib com efeitos visuais)
```
python fancy_donut.py
```

### Donut Tkinter (Sem dependências externas)
```
python tkinter_donut.py
```

## Controles

### Para versão OpenGL
- **Setas do teclado**: Rotacionar o donut manualmente
- **Espaço**: Ativar/desativar a rotação automática
- **Fechar janela**: Sair do programa

### Para versão Tkinter
- **Botão Pause/Resume**: Pausa ou continua a animação
- **Botão Quit**: Sai do programa
- **Setas do teclado**: Ajusta a rotação manualmente
- **Espaço**: Ativa/desativa a rotação automática

## Características

- Visualizações 3D interativas com múltiplas implementações
- Gradientes de cores e efeitos visuais
- Animação automática
- Renderização de alta performance (versão OpenGL)
- Parâmetros do donut personalizáveis (edite o código para alterar valores de raio)
- Versão sem dependências externas (tkinter_donut.py)

## Comparação entre Implementações

- **Versões Matplotlib**: Mais fáceis de entender, mas com desempenho mais lento
- **Versão OpenGL**: Desempenho mais rápido, animação mais suave, mais interativa
- **Versão Tkinter**: Compatibilidade máxima, sem dependências externas, mas com qualidade visual inferior 