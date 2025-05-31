import numpy as np
import matplotlib.pyplot as plt
from matplotlib import cm
from matplotlib.animation import FuncAnimation
from mpl_toolkits.mplot3d import Axes3D

def generate_torus(R=1, r=0.5, n_steps=100):
    """
    Generate the coordinates of a torus (donut shape)
    R: major radius - distance from the center of the tube to the center of the torus
    r: minor radius - radius of the tube
    n_steps: number of points to generate around each circle
    """
    theta = np.linspace(0, 2*np.pi, n_steps)
    phi = np.linspace(0, 2*np.pi, n_steps)
    theta, phi = np.meshgrid(theta, phi)
    
    x = (R + r * np.cos(phi)) * np.cos(theta)
    y = (R + r * np.cos(phi)) * np.sin(theta)
    z = r * np.sin(phi)
    
    return x, y, z

def main():
    # Create a figure and 3D axis
    fig = plt.figure(figsize=(10, 8))
    ax = fig.add_subplot(111, projection='3d')
    
    # Generate torus coordinates
    x, y, z = generate_torus(R=3, r=1, n_steps=60)
    
    # Plot the surface with a colormap
    surf = ax.plot_surface(
        x, y, z, 
        cmap=cm.plasma,
        linewidth=0,
        antialiased=True,
        alpha=0.8
    )
    
    # Add a color bar
    fig.colorbar(surf, ax=ax, shrink=0.5, aspect=5)
    
    # Set the axis labels
    ax.set_xlabel('X')
    ax.set_ylabel('Y')
    ax.set_zlabel('Z')
    
    # Set the title
    ax.set_title('Animated 3D Donut (Torus)')
    
    # Make it pretty with equal aspect ratio
    ax.set_box_aspect([1, 1, 1])
    
    # Set axis limits
    r_max = 4
    ax.set_xlim(-r_max, r_max)
    ax.set_ylim(-r_max, r_max)
    ax.set_zlim(-r_max, r_max)
    
    # Function to update the plot for animation
    def update(frame):
        ax.view_init(elev=20, azim=frame)
        return [surf]
    
    # Create animation
    ani = FuncAnimation(
        fig, update, frames=np.arange(0, 360, 2),
        interval=50, blit=True
    )
    
    # Show the plot
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    main() 