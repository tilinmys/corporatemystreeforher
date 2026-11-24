import math
from PIL import Image, ImageDraw, ImageFilter

def create_master_hero_image(filepath="public/welcome-hero.png", width=1000, height=750):
    # Base RGBA canvas
    img = Image.new("RGBA", (width, height))
    
    # 1. Luxury Fluid Gradient: Deep Oxblood (#350B14) to Rich Velvet Burgundy (#5A1222) to Deep Wine (#22050B)
    draw = ImageDraw.Draw(img)
    c_top = (58, 11, 20)      # Deep Oxblood
    c_mid = (95, 20, 36)      # Velvet Burgundy
    c_bot = (32, 6, 12)       # Midnight Wine
    c_rose_glow = (185, 65, 88) # Warm Rose Glow
    
    for y in range(height):
        t_y = y / height
        for x in range(0, width, 4):
            t_x = x / width
            # Non-linear radial/diagonal blend
            diag = (t_x * 0.4 + t_y * 0.6)
            center_dist = math.sqrt((t_x - 0.5)**2 + (t_y - 0.45)**2)
            glow_weight = max(0.0, 1.0 - center_dist * 1.6)
            
            r = int(c_top[0] * (1 - diag) + c_bot[0] * diag + c_rose_glow[0] * glow_weight * 0.5)
            g = int(c_top[1] * (1 - diag) + c_bot[1] * diag + c_rose_glow[1] * glow_weight * 0.5)
            b = int(c_top[2] * (1 - diag) + c_bot[2] * diag + c_rose_glow[2] * glow_weight * 0.5)
            
            r = min(255, max(0, r))
            g = min(255, max(0, g))
            b = min(255, max(0, b))
            
            draw.rectangle([x, y, x + 4, y + 1], fill=(r, g, b, 255))
            
    img = img.filter(ImageFilter.GaussianBlur(10))
    
    # 2. Layer: Soft Luminous Auras (Warm peach, blush pearl)
    aura_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    a_draw = ImageDraw.Draw(aura_layer)
    
    # Warm golden/peach light at top-right
    a_draw.ellipse([width * 0.45, -120, width + 150, height * 0.75], fill=(255, 235, 235, 55))
    # Soft crimson blush at bottom-left
    a_draw.ellipse([-100, height * 0.35, width * 0.55, height + 120], fill=(225, 29, 72, 40))
    # Radiant center orb
    a_draw.ellipse([width * 0.28, height * 0.18, width * 0.72, height * 0.82], fill=(254, 205, 211, 35))
    
    aura_layer = aura_layer.filter(ImageFilter.GaussianBlur(60))
    img = Image.alpha_composite(img, aura_layer)
    
    # 3. Layer: Fluid Silk Waves & Ribbons
    waves_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    w_draw = ImageDraw.Draw(waves_layer)
    
    for i in range(5):
        alpha = int(25 + i * 18)
        base_y = height * 0.42 + i * 40
        pts = []
        for x in range(0, width + 20, 10):
            norm_x = x / width
            wave = (
                math.sin(norm_x * math.pi * 2.2 + i * 0.7) * 45 +
                math.cos(norm_x * math.pi * 1.4 - i * 0.4) * 30
            )
            pts.append((x, base_y + wave))
            
        pts_poly = pts + [(width, height), (0, height)]
        w_draw.polygon(pts_poly, fill=(255, 241, 242, 6 + i * 3))
        w_draw.line(pts, fill=(255, 228, 230, alpha), width=2)
        
    waves_layer = waves_layer.filter(ImageFilter.GaussianBlur(2.5))
    img = Image.alpha_composite(img, waves_layer)
    
    # 4. Layer: Fine Minimalist Botanical & Crescent Aura Motif
    vector_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    v_draw = ImageDraw.Draw(vector_layer)
    
    # Central harmonious crescent ring
    cx, cy = width * 0.5, height * 0.48
    # Outer hairline circle
    v_draw.ellipse([cx - 160, cy - 160, cx + 160, cy + 160], outline=(255, 255, 255, 60), width=1)
    
    # Elegant inner crescent
    crescent_pts = []
    for deg in range(-70, 190, 2):
        rad = math.radians(deg)
        x = cx + math.cos(rad) * 125
        y = cy + math.sin(rad) * 125
        crescent_pts.append((x, y))
    v_draw.line(crescent_pts, fill=(255, 255, 255, 180), width=3)
    
    # Small delicate accent orb at the crescent tip
    end_x, end_y = crescent_pts[-1]
    v_draw.ellipse([end_x - 14, end_y - 14, end_x + 14, end_y + 14], outline=(255, 255, 255, 200), width=2)
    v_draw.ellipse([end_x - 6, end_y - 6, end_x + 6, end_y + 6], fill=(255, 241, 242, 180))
    
    # Graceful botanical leaf curves originating from bottom
    stem_pts = []
    for step in range(100):
        t = step / 100
        sx = cx + 90 - math.sin(t * math.pi * 0.8) * 80 + t * 40
        sy = height * 0.95 - t * (height * 0.65)
        stem_pts.append((sx, sy))
    v_draw.line(stem_pts, fill=(255, 255, 255, 120), width=2)
    
    # Delicate leaves along the curve
    for idx, (sx, sy) in enumerate(stem_pts[15::12]):
        leaf_side = 1 if idx % 2 == 0 else -1
        leaf_len = 38 + (idx % 3) * 8
        leaf_angle = -0.45 * leaf_side + 0.1
        leaf_poly = [
            (sx, sy),
            (sx + math.cos(leaf_angle) * leaf_len * 0.6 + leaf_side * 12, sy - math.sin(leaf_angle) * leaf_len * 0.6 - 8),
            (sx + math.cos(leaf_angle) * leaf_len, sy - math.sin(leaf_angle) * leaf_len - 14),
            (sx + math.cos(leaf_angle) * leaf_len * 0.6 - leaf_side * 5, sy - math.sin(leaf_angle) * leaf_len * 0.6 - 4),
        ]
        v_draw.polygon(leaf_poly, fill=(255, 241, 242, 45))
        v_draw.line(leaf_poly + [(sx, sy)], fill=(255, 255, 255, 150), width=1)
        
    img = Image.alpha_composite(img, vector_layer)
    
    # 5. Vignette & Inner hairline border
    border_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    b_draw = ImageDraw.Draw(border_layer)
    b_draw.rounded_rectangle([2, 2, width - 3, height - 3], radius=40, outline=(255, 255, 255, 50), width=2)
    img = Image.alpha_composite(img, border_layer)
    
    # Save crisp output
    final_rgb = img.convert("RGB")
    final_rgb.save(filepath, "PNG", quality=95)
    print(f"Masterpiece hero image saved to {filepath}")

if __name__ == "__main__":
    create_master_hero_image("c:/Users/Tilin Bijoy/Desktop/mystreewebsitee/corporatewesbite/her-corporate-care/public/welcome-hero.png")
    create_master_hero_image("c:/Users/Tilin Bijoy/Desktop/mystreewebsitee/corporatewesbite/her-corporate-care/src/assets/welcome-hero.png")
