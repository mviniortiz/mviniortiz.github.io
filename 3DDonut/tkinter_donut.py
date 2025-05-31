import tkinter as tk
import math
import time

class DonutRenderer:
    def __init__(self, root, width=800, height=600):
        self.root = root
        self.width = width
        self.height = height
        
        # Configure the window
        self.root.title("Donut 3D - Tkinter Version")
        self.root.geometry(f"{width}x{height}")
        self.root.resizable(False, False)
        self.root.configure(bg="black")
        
        # Create canvas
        self.canvas = tk.Canvas(
            root, 
            width=width, 
            height=height, 
            bg="black", 
            highlightthickness=0
        )
        self.canvas.pack()
        
        # Settings for the donut - Aumentando tamanho
        self.R1 = 180  # Donut main radius (aumentado)
        self.R2 = 80   # Tube radius (aumentado)
        self.K2 = 1000  # Distance from viewer to z=0 (reduzido para ampliação)
        self.K1 = self.width * self.K2 * 3 / (8 * (self.R1 + self.R2))  # Constant for scaling
        
        # Animation parameters
        self.A = 1.0   # X-axis rotation
        self.B = 1.0   # Z-axis rotation
        
        # For storing projected points
        self.buffer = [" "] * (width * height)
        self.zbuffer = [0] * (width * height)
        
        # Circle resolution - Aumentando para melhor qualidade
        self.circle_precision = 100
        
        # Animation state
        self.is_running = True
        
        # Setup controls
        self.setup_controls()
        
        # Start the animation
        self.animate()
    
    def setup_controls(self):
        # Create a frame for buttons
        control_frame = tk.Frame(self.root, bg="black")
        control_frame.pack(side=tk.BOTTOM, fill=tk.X, pady=10)
        
        # Pause/Resume button
        self.toggle_button = tk.Button(
            control_frame, 
            text="Pause", 
            command=self.toggle_animation,
            bg="#333", 
            fg="white",
            relief=tk.FLAT,
            padx=20
        )
        self.toggle_button.pack(side=tk.LEFT, padx=20)
        
        # Quit button
        quit_button = tk.Button(
            control_frame, 
            text="Quit", 
            command=self.root.destroy,
            bg="#333", 
            fg="white",
            relief=tk.FLAT,
            padx=20
        )
        quit_button.pack(side=tk.RIGHT, padx=20)
        
        # Add keyboard controls
        self.root.bind("<KeyPress-space>", lambda event: self.toggle_animation())
        self.root.bind("<KeyPress-Up>", lambda event: self.adjust_rotation(0.1, 0))
        self.root.bind("<KeyPress-Down>", lambda event: self.adjust_rotation(-0.1, 0))
        self.root.bind("<KeyPress-Left>", lambda event: self.adjust_rotation(0, 0.1))
        self.root.bind("<KeyPress-Right>", lambda event: self.adjust_rotation(0, -0.1))
    
    def toggle_animation(self):
        self.is_running = not self.is_running
        self.toggle_button.config(text="Resume" if not self.is_running else "Pause")
    
    def adjust_rotation(self, dA, dB):
        self.A += dA
        self.B += dB
    
    def render_frame(self):
        # Clear the buffer
        self.buffer = [" "] * (self.width * self.height)
        self.zbuffer = [0] * (self.width * self.height)
        
        # Pre-compute sines and cosines
        cosA, sinA = math.cos(self.A), math.sin(self.A)
        cosB, sinB = math.cos(self.B), math.sin(self.B)
        
        # Loop through circle
        for theta in range(self.circle_precision):
            theta_rad = theta * 2 * math.pi / self.circle_precision
            costheta, sintheta = math.cos(theta_rad), math.sin(theta_rad)
            
            for phi in range(self.circle_precision):
                phi_rad = phi * 2 * math.pi / self.circle_precision
                cosphi, sinphi = math.cos(phi_rad), math.sin(phi_rad)
                
                # 3D coordinates before rotation
                circlex = self.R2 * costheta
                circley = self.R2 * sintheta
                
                # 3D coordinates after circle rotation in the donut
                x = self.R1 + circlex
                y = 0
                z = circley
                
                # Fix: 3D coordinates after rotating the whole donut
                # Rotate around X-axis
                temp_y = y * cosA - z * sinA
                temp_z = y * sinA + z * cosA
                y = temp_y
                z = temp_z
                
                # Rotate around Z-axis
                temp_x = x * cosB - y * sinB
                y = x * sinB + y * cosB
                x = temp_x
                
                # Project 3D to 2D
                # Calculate illumination - aumentando o brilho
                L = cosphi * costheta * 0.7 + 0.5
                
                # Convert to 0-255 range for color
                color_val = max(0, min(255, int(255 * L)))
                
                # Project to 2D screen
                z_inv = 1 / (z + self.K2)
                xp = int(self.width / 2 + self.K1 * z_inv * x)
                yp = int(self.height / 2 - self.K1 * z_inv * y)
                
                # Plot pixel if it's on screen
                pos = xp + yp * self.width
                if 0 <= xp < self.width and 0 <= yp < self.height:
                    if z_inv > self.zbuffer[pos]:
                        self.zbuffer[pos] = z_inv
                        self.buffer[pos] = color_val
        
        # Clear canvas
        self.canvas.delete("all")
        
        # Draw points - Usando um tamanho maior para os pixels
        pixel_size = 2
        for i in range(0, self.width, pixel_size):
            for j in range(0, self.height, pixel_size):
                pos = i + j * self.width
                if self.buffer[pos] != " ":
                    color_val = self.buffer[pos]
                    # Set color based on illumination - garantindo cores válidas
                    r = max(0, min(255, color_val))
                    g = max(0, min(255, color_val))
                    b = max(0, min(255, color_val//2 + 128))
                    color_hex = f"#{r:02x}{g:02x}{b:02x}"
                    self.canvas.create_rectangle(i, j, i+pixel_size, j+pixel_size, fill=color_hex, outline="")
    
    def animate(self):
        if self.is_running:
            # Update rotation values - velocidade aumentada
            self.B += 0.05
            
            # Render the frame
            self.render_frame()
        
        # Schedule next frame
        self.root.after(33, self.animate)  # ~30 FPS

def main():
    root = tk.Tk()
    app = DonutRenderer(root)
    root.mainloop()

if __name__ == "__main__":
    main() 