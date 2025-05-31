import numpy as np
import pygame
import sys
from pygame.locals import *
try:
    from OpenGL.GL import *
    from OpenGL.GLU import *
    print("PyOpenGL importado com sucesso!")
except ImportError as e:
    print(f"ERRO ao importar OpenGL: {e}")
    print("Certifique-se de instalar as dependências necessárias com:")
    print("pip install PyOpenGL PyOpenGL-accelerate")
    sys.exit(1)

def generate_torus_vertices(R=3, r=1, n_major=40, n_minor=20):
    """
    Generate vertices for a torus (donut shape)
    R: major radius - distance from the center of the tube to the center of the torus
    r: minor radius - radius of the tube
    n_major: number of segments around the major radius
    n_minor: number of segments around the minor radius
    """
    vertices = []
    colors = []
    
    for i in range(n_major):
        for j in range(n_minor):
            # Major radius angles
            phi = i * 2 * np.pi / n_major
            phi_next = (i + 1) * 2 * np.pi / n_major
            
            # Minor radius angles
            theta = j * 2 * np.pi / n_minor
            theta_next = (j + 1) * 2 * np.pi / n_minor
            
            # Calculate vertices for the quad
            v1 = [
                (R + r * np.cos(theta)) * np.cos(phi),
                (R + r * np.cos(theta)) * np.sin(phi),
                r * np.sin(theta)
            ]
            
            v2 = [
                (R + r * np.cos(theta_next)) * np.cos(phi),
                (R + r * np.cos(theta_next)) * np.sin(phi),
                r * np.sin(theta_next)
            ]
            
            v3 = [
                (R + r * np.cos(theta_next)) * np.cos(phi_next),
                (R + r * np.cos(theta_next)) * np.sin(phi_next),
                r * np.sin(theta_next)
            ]
            
            v4 = [
                (R + r * np.cos(theta)) * np.cos(phi_next),
                (R + r * np.cos(theta)) * np.sin(phi_next),
                r * np.sin(theta)
            ]
            
            # Add quad vertices
            vertices.extend([v1, v2, v3, v4])
            
            # Generate colors based on position (for rainbow effect)
            c1 = [(np.cos(phi) + 1) / 2, (np.sin(theta) + 1) / 2, (np.sin(phi) + 1) / 2]
            c2 = [(np.cos(phi) + 1) / 2, (np.sin(theta_next) + 1) / 2, (np.sin(phi) + 1) / 2]
            c3 = [(np.cos(phi_next) + 1) / 2, (np.sin(theta_next) + 1) / 2, (np.sin(phi_next) + 1) / 2]
            c4 = [(np.cos(phi_next) + 1) / 2, (np.sin(theta) + 1) / 2, (np.sin(phi_next) + 1) / 2]
            
            colors.extend([c1, c2, c3, c4])
    
    return vertices, colors

def main():
    try:
        # Initialize Pygame and OpenGL
        pygame.init()
        print("Pygame inicializado com sucesso!")
        
        display = (800, 600)
        try:
            screen = pygame.display.set_mode(display, DOUBLEBUF | OPENGL)
            print("Janela OpenGL criada com sucesso!")
        except pygame.error as e:
            print(f"ERRO ao criar janela OpenGL: {e}")
            print("Verifique se seus drivers de vídeo estão atualizados.")
            return
        
        pygame.display.set_caption("3D Donut - OpenGL")
        
        # Setup perspective
        try:
            gluPerspective(45, (display[0] / display[1]), 0.1, 50.0)
            glTranslatef(0.0, 0.0, -15)
            print("Perspectiva OpenGL configurada com sucesso!")
        except Exception as e:
            print(f"ERRO ao configurar perspectiva OpenGL: {e}")
            return
        
        # Generate torus vertices and colors
        print("Gerando vértices do torus...")
        vertices, colors = generate_torus_vertices()
        print(f"Gerados {len(vertices)} vértices.")
        
        # Enable depth testing and smooth shading
        glEnable(GL_DEPTH_TEST)
        glShadeModel(GL_SMOOTH)
        
        # Set clear color to dark gray
        glClearColor(0.2, 0.2, 0.2, 1)
        
        # Rotation angles
        x_rot, y_rot = 0, 0
        rot_speed = 1.0
        
        # Main game loop
        clock = pygame.time.Clock()
        running = True
        print("Iniciando loop principal...")
        while running:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                
                # Handle key presses for manual rotation
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_UP:
                        x_rot -= 5
                    if event.key == pygame.K_DOWN:
                        x_rot += 5
                    if event.key == pygame.K_LEFT:
                        y_rot -= 5
                    if event.key == pygame.K_RIGHT:
                        y_rot += 5
                    if event.key == pygame.K_SPACE:
                        rot_speed = 0 if rot_speed else 1.0
            
            # Auto-rotation
            y_rot += rot_speed
            
            # Clear buffers
            glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)
            
            # Set up rotation
            glLoadIdentity()
            glTranslatef(0.0, 0.0, -15)
            glRotatef(x_rot, 1, 0, 0)
            glRotatef(y_rot, 0, 1, 0)
            
            # Draw torus as quads
            glBegin(GL_QUADS)
            for i, vertex in enumerate(vertices):
                glColor3fv(colors[i])
                glVertex3fv(vertex)
            glEnd()
            
            # Update display
            pygame.display.flip()
            clock.tick(60)
        
        pygame.quit()
        print("Programa finalizado com sucesso!")
    except Exception as e:
        print(f"ERRO não tratado: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main() 