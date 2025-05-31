import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from matplotlib import cm
from mpl_toolkits.mplot3d import Axes3D

def generate_torus(R=3, r=1, n_steps=50):
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
    # Create a figure with a specific size and black background
    plt.style.use('dark_background')
    fig = plt.figure(figsize=(10, 8), facecolor='black')
    ax = fig.add_subplot(111, projection='3d')
    
    # Generate torus coordinates with more detail
    x, y, z = generate_torus(R=3, r=1, n_steps=60)
    
    # Custom colormap for a more vibrant appearance
    colors = np.empty(x.shape, dtype=object)
    for i in range(x.shape[0]):
        for j in range(x.shape[1]):
            angle = np.arctan2(y[i, j], x[i, j])
            height = z[i, j]
            # Create a more vibrant colorful pattern
            r = 0.7 + 0.3 * np.sin(angle * 3)
            g = 0.7 + 0.3 * np.sin(angle * 3 + 2*np.pi/3)
            b = 0.7 + 0.3 * np.sin(angle * 3 + 4*np.pi/3)
            colors[i, j] = (r, g, b)
    
    # Plot the surface with custom colors
    surf = ax.plot_surface(
        x, y, z, 
        facecolors=colors,
        linewidth=0,
        antialiased=True,
        shade=True
    )
    
    # Add a glowing effect with scattered points
    theta_points = np.random.uniform(0, 2*np.pi, 500)  # More points
    phi_points = np.random.uniform(0, 2*np.pi, 500)    # More points
    
    # Variables for the donut
    R, r = 3, 1
    
    x_points = (R + r * np.cos(phi_points)) * np.cos(theta_points)
    y_points = (R + r * np.cos(phi_points)) * np.sin(theta_points)
    z_points = r * np.sin(phi_points)
    
    # Random colors for glowing points
    point_colors = []
    for i in range(len(x_points)):
        point_colors.append((
            0.5 + 0.5 * np.random.random(),
            0.5 + 0.5 * np.random.random(),
            0.7 + 0.3 * np.random.random()
        ))
    
    # Add glowing points with different colors
    scatter = ax.scatter(
        x_points, y_points, z_points,
        color=point_colors,
        alpha=0.7,
        s=15  # Larger points
    )
    
    # Remove background grid and axes
    ax.set_axis_off()
    
    # Set equal aspect ratio
    ax.set_box_aspect([1, 1, 1])
    
    # Set axis limits
    r_max = 5
    ax.set_xlim(-r_max, r_max)
    ax.set_ylim(-r_max, r_max)
    ax.set_zlim(-r_max, r_max)
    
    # Add title with glow effect
    plt.title('✨ Fancy 3D Donut ✨', color='white', size=20, pad=30)
    
    # Function to update the view for animation
    def animate(frame):
        # Rotate view with smoother motion
        elevation = 20 + 10 * np.sin(frame * np.pi / 180)
        azimuth = frame % 360
        ax.view_init(elev=elevation, azim=azimuth)
        
        # Update colors for the glowing effect
        for i in range(x.shape[0]):
            for j in range(x.shape[1]):
                angle = np.arctan2(y[i, j], x[i, j]) + frame * np.pi / 180
                # Create a shifting colorful pattern
                r = 0.7 + 0.3 * np.sin(angle * 3)
                g = 0.7 + 0.3 * np.sin(angle * 3 + 2*np.pi/3)
                b = 0.7 + 0.3 * np.sin(angle * 3 + 4*np.pi/3)
                colors[i, j] = (r, g, b)
        
        # Also update the scattered points positions for extra animation
        new_theta = theta_points + frame * 0.01
        new_x = (R + r * np.cos(phi_points)) * np.cos(new_theta)
        new_y = (R + r * np.cos(phi_points)) * np.sin(new_theta)
        
        # Update scatter positions
        scatter._offsets3d = (new_x, new_y, z_points)
        
        # Update the surface colors
        surf.set_facecolors(colors.reshape(-1, 3))
        
        return [surf, scatter]
    
    # Create animation with smoother framerate
    ani = animation.FuncAnimation(
        fig, animate, frames=360,
        interval=40, blit=True
    )
    
    # Adjust layout and show
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    main() 