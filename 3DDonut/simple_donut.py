import tkinter as tk
import math

class SimpleDonut:
    def __init__(self, root):
        self.root = root
        self.width = 800
        self.height = 600
        
        # Configure the window
        self.root.title("Simple 3D Donut")
        self.root.geometry(f"{self.width}x{self.height}")
        self.root.configure(bg="black")
        
        # Create canvas
        self.canvas = tk.Canvas(
            root, 
            width=self.width, 
            height=self.height, 
            bg="black", 
            highlightthickness=0
        )
        self.canvas.pack(fill=tk.BOTH, expand=True)
        
        # Donut parameters
        self.R1 = 70       # Radius of the donut
        self.R2 = 30       # Radius of the tube
        self.pixel_size = 6  # Size of each rendered pixel
        self.rotation_speed = 0.05
        
        # Rotation angles
        self.x_angle = 0
        self.z_angle = 0
        
        # Animation state
        self.is_running = True
        
        # Set up controls
        self.setup_controls()
        
        # Start animation
        self.animate()
    
    def setup_controls(self):
        control_frame = tk.Frame(self.root, bg="black")
        control_frame.pack(side=tk.BOTTOM, pady=10)
        
        # Pause button
        self.pause_button = tk.Button(
            control_frame,
            text="Pause",
            command=self.toggle_animation,
            bg="#333",
            fg="white",
            padx=10
        )
        self.pause_button.pack(side=tk.LEFT, padx=10)
        
        # Quit button
        quit_button = tk.Button(
            control_frame,
            text="Quit",
            command=self.root.destroy,
            bg="#333",
            fg="white",
            padx=10
        )
        quit_button.pack(side=tk.RIGHT, padx=10)
        
        # Keyboard controls
        self.root.bind("<Up>", lambda e: self.adjust_x_angle(-0.1))
        self.root.bind("<Down>", lambda e: self.adjust_x_angle(0.1))
        self.root.bind("<Left>", lambda e: self.adjust_z_angle(-0.1))
        self.root.bind("<Right>", lambda e: self.adjust_z_angle(0.1))
        self.root.bind("<space>", lambda e: self.toggle_animation())
    
    def toggle_animation(self):
        self.is_running = not self.is_running
        self.pause_button.config(text="Resume" if not self.is_running else "Pause")
    
    def adjust_x_angle(self, delta):
        self.x_angle += delta
    
    def adjust_z_angle(self, delta):
        self.z_angle += delta
    
    def draw_donut(self):
        # Clear canvas
        self.canvas.delete("all")
        
        # Center of the screen
        cx = self.width // 2
        cy = self.height // 2
        
        # Pre-calculate sines and cosines
        cosX = math.cos(self.x_angle)
        sinX = math.sin(self.x_angle)
        cosZ = math.cos(self.z_angle)
        sinZ = math.sin(self.z_angle)
        
        # Store visible points to handle depth
        visible_points = []
        
        # Calculate points around the donut
        for theta in range(0, 360, 5):
            theta_rad = math.radians(theta)
            cosTheta = math.cos(theta_rad)
            sinTheta = math.sin(theta_rad)
            
            for phi in range(0, 360, 5):
                phi_rad = math.radians(phi)
                cosPhi = math.cos(phi_rad)
                sinPhi = math.sin(phi_rad)
                
                # Calculate 3D coordinates on the torus
                # Circle coordinates
                circle_x = self.R2 * cosPhi
                circle_z = self.R2 * sinPhi
                
                # Torus coordinates
                x = (self.R1 + circle_x) * cosTheta
                y = (self.R1 + circle_x) * sinTheta
                z = circle_z
                
                # Rotate around X-axis
                y_rotated = y * cosX - z * sinX
                z = y * sinX + z * cosX
                y = y_rotated
                
                # Rotate around Z-axis
                x_rotated = x * cosZ - y * sinZ
                y = x * sinZ + y * cosZ
                x = x_rotated
                
                # Project 3D to 2D (simple perspective)
                scale = 200 / (200 + z)
                x2d = cx + int(x * scale)
                y2d = cy + int(y * scale)
                
                # Calculate lighting (simple point light from viewer)
                # Normalize the vector from the center of the donut to this point
                nx = x / (self.R1 + self.R2)
                ny = y / (self.R1 + self.R2)
                nz = z / self.R2
                normal_length = math.sqrt(nx*nx + ny*ny + nz*nz)
                
                if normal_length > 0:
                    nx /= normal_length
                    ny /= normal_length
                    nz /= normal_length
                
                # Light comes from the viewer direction (0, 0, -1)
                lighting = -nz * 0.5 + 0.5
                lighting = max(0.3, min(1.0, lighting))  # Clamp between 0.3 and 1.0
                
                # Store points with depth info for painter's algorithm
                visible_points.append((x2d, y2d, z, lighting))
        
        # Sort points by z value (painter's algorithm)
        visible_points.sort(key=lambda p: p[2], reverse=True)
        
        # Draw all points from back to front
        for x, y, z, lighting in visible_points:
            # Calculate color based on lighting
            color_val = int(255 * lighting)
            
            # Create color with blue highlight
            r = color_val
            g = color_val
            b = min(255, int(color_val * 1.5))  # Blue highlight
            
            color_hex = f"#{r:02x}{g:02x}{b:02x}"
            
            # Draw larger pixel
            self.canvas.create_rectangle(
                x - self.pixel_size//2, y - self.pixel_size//2,
                x + self.pixel_size//2, y + self.pixel_size//2,
                fill=color_hex, outline=""
            )
    
    def animate(self):
        if self.is_running:
            # Update rotation
            self.z_angle += self.rotation_speed
            
            # Draw the donut
            self.draw_donut()
        
        # Continue animation
        self.root.after(30, self.animate)

def main():
    root = tk.Tk()
    app = SimpleDonut(root)
    root.mainloop()

if __name__ == "__main__":
    main() 