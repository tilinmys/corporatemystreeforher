import math
from PIL import Image, ImageDraw, ImageFilter

def create_grid_image_1(filepath, width=600, height=400):
    # Pillar 1: Gynaecology & Specialist Consultations
    img = Image.new("RGBA", (width, height))
    draw = ImageDraw.Draw(img)
    
    # Deep plum to rich burgundy gradient
    for y in range(height):
        t = y / height
        r = int(58 * (1 - t) + 100 * t)
        g = int(14 * (1 - t) + 26 * t)
        b = int(24 * (1 - t) + 40 * t)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))
        
    # Ambient warm glow
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow)
    g_draw.ellipse([width * 0.4, -50, width + 50, height * 0.8], fill=(255, 228, 230, 45))
    g_draw.ellipse([-50, height * 0.3, width * 0.5, height + 80], fill=(225, 29, 72, 35))
    glow = glow.filter(ImageFilter.GaussianBlur(35))
    img = Image.alpha_composite(img, glow)
    
    # Elegant vector curves & stethoscope/heart wellness silhouette
    vec = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    v_draw = ImageDraw.Draw(vec)
    
    # Stethoscope/care organic arc
    cx, cy = width * 0.5, height * 0.5
    v_draw.arc([cx - 90, cy - 80, cx + 90, cy + 90], start=30, end=330, fill=(255, 255, 255, 130), width=3)
    v_draw.ellipse([cx - 24, cy + 85, cx + 24, cy + 133], outline=(255, 255, 255, 180), width=3)
    
    # Flowing botanical curves
    for i in range(4):
        offset = i * 25
        pts = [(x, int(height * 0.7 + math.sin(x / 45 + i) * 20 - offset)) for x in range(0, width + 10, 10)]
        v_draw.line(pts, fill=(255, 241, 242, 60 + i * 20), width=2)
        
    img = Image.alpha_composite(img, vec)
    img.convert("RGB").save(filepath, "PNG", quality=95)
    print("Saved grid 1:", filepath)

def create_grid_image_2(filepath, width=600, height=400):
    # Pillar 2: Diagnostics & Blood Test Panels
    img = Image.new("RGBA", (width, height))
    draw = ImageDraw.Draw(img)
    
    for y in range(height):
        t = y / height
        r = int(42 * (1 - t) + 80 * t)
        g = int(14 * (1 - t) + 20 * t)
        b = int(26 * (1 - t) + 38 * t)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))
        
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow)
    g_draw.ellipse([width * 0.2, height * 0.1, width * 0.8, height * 0.9], fill=(244, 114, 182, 35))
    g_draw.ellipse([width * 0.55, -20, width + 50, height * 0.6], fill=(254, 205, 211, 40))
    glow = glow.filter(ImageFilter.GaussianBlur(30))
    img = Image.alpha_composite(img, glow)
    
    vec = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    v_draw = ImageDraw.Draw(vec)
    
    # Diagnostic test tube / flask abstract geometry
    fx, fy = width * 0.5, height * 0.48
    flask_poly = [
        (fx - 20, fy - 60),
        (fx + 20, fy - 60),
        (fx + 20, fy - 15),
        (fx + 65, fy + 65),
        (fx - 65, fy + 65),
        (fx - 20, fy - 15)
    ]
    v_draw.polygon(flask_poly, fill=(255, 241, 242, 35))
    v_draw.line(flask_poly + [(fx - 20, fy - 60)], fill=(255, 255, 255, 160), width=2)
    # Liquid level
    v_draw.line([(fx - 50, fy + 35), (fx + 50, fy + 35)], fill=(255, 228, 230, 200), width=2)
    
    # Pulse wave line across
    pts = []
    for x in range(0, width, 5):
        if width * 0.35 <= x <= width * 0.65:
            pulse = math.sin((x - width * 0.35) / 15) * 25
        else:
            pulse = math.sin(x / 30) * 4
        pts.append((x, int(height * 0.8 + pulse)))
    v_draw.line(pts, fill=(255, 255, 255, 120), width=2)
    
    img = Image.alpha_composite(img, vec)
    img.convert("RGB").save(filepath, "PNG", quality=95)
    print("Saved grid 2:", filepath)

def create_grid_image_3(filepath, width=600, height=400):
    # Pillar 3: Cycle Tracking & Privacy Vault
    img = Image.new("RGBA", (width, height))
    draw = ImageDraw.Draw(img)
    
    for y in range(height):
        t = y / height
        r = int(50 * (1 - t) + 90 * t)
        g = int(10 * (1 - t) + 24 * t)
        b = int(22 * (1 - t) + 36 * t)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))
        
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow)
    g_draw.ellipse([width * 0.3, -40, width * 0.9, height * 0.7], fill=(251, 207, 232, 40))
    glow = glow.filter(ImageFilter.GaussianBlur(30))
    img = Image.alpha_composite(img, glow)
    
    vec = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    v_draw = ImageDraw.Draw(vec)
    
    # Cycle Ring Motif
    rx, ry = width * 0.5, height * 0.5
    v_draw.ellipse([rx - 65, ry - 65, rx + 65, ry + 65], outline=(255, 255, 255, 160), width=3)
    v_draw.ellipse([rx - 45, ry - 45, rx + 45, ry + 45], outline=(255, 228, 230, 80), width=1)
    
    # 28-day cycle dots around ring
    for deg in range(0, 360, 24):
        rad = math.radians(deg)
        dx = rx + math.cos(rad) * 65
        dy = ry + math.sin(rad) * 65
        v_draw.ellipse([dx - 3, dy - 3, dx + 3, dy + 3], fill=(255, 255, 255, 200))
        
    img = Image.alpha_composite(img, vec)
    img.convert("RGB").save(filepath, "PNG", quality=95)
    print("Saved grid 3:", filepath)

if __name__ == "__main__":
    create_grid_image_1("c:/Users/Tilin Bijoy/Desktop/mystreewebsitee/corporatewesbite/her-corporate-care/public/welcome-grid-1.png")
    create_grid_image_2("c:/Users/Tilin Bijoy/Desktop/mystreewebsitee/corporatewesbite/her-corporate-care/public/welcome-grid-2.png")
    create_grid_image_3("c:/Users/Tilin Bijoy/Desktop/mystreewebsitee/corporatewesbite/her-corporate-care/public/welcome-grid-3.png")
