import math
from PIL import Image, ImageDraw, ImageFilter

def generate_hero_image(filepath="public/welcome-hero.png", width=880, height=600):
    # Base image with luxury silk / gradient background
    img = Image.new("RGBA", (width, height), (250, 247, 245, 255))
    
    # Gradient canvas: Deep oxblood, rose velvet, warm blush
    base = Image.new("RGBA", (width, height))
    draw_base = ImageDraw.Draw(base)
    
    # Smooth vertical/diagonal gradient
    c_top_left = (61, 14, 24)      # #3D0E18
    c_center = (100, 30, 43)        # #641E2B
    c_bottom_right = (42, 14, 26)  # #2A0E1A
    c_rose_glow = (180, 80, 95)    # #B4505F
    
    for y in range(height):
        t_y = y / height
        for x in range(0, width, 2):
            t_x = x / width
            # Blend
            r = int(c_top_left[0] * (1 - t_x) * (1 - t_y) + c_center[0] * t_x * (1 - t_y) + c_rose_glow[0] * (1 - t_x) * t_y * 0.7 + c_bottom_right[0] * t_x * t_y)
            g = int(c_top_left[1] * (1 - t_x) * (1 - t_y) + c_center[1] * t_x * (1 - t_y) + c_rose_glow[1] * (1 - t_x) * t_y * 0.7 + c_bottom_right[1] * t_x * t_y)
            b = int(c_top_left[2] * (1 - t_x) * (1 - t_y) + c_center[2] * t_x * (1 - t_y) + c_rose_glow[2] * (1 - t_x) * t_y * 0.7 + c_bottom_right[2] * t_x * t_y)
            draw_base.rectangle([x, y, x + 2, y + 1], fill=(r, g, b, 255))
            
    base = base.filter(ImageFilter.GaussianBlur(15))
    
    # Layer 1: Ambient Glow Orbs (warm peach, soft rose)
    glow_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_layer)
    
    # Warm golden/rose light from top right
    glow_draw.ellipse([width * 0.5, -100, width + 100, height * 0.7], fill=(253, 226, 228, 45))
    # Soft crimson rose orb bottom left
    glow_draw.ellipse([-80, height * 0.3, width * 0.45, height + 80], fill=(225, 29, 72, 35))
    # Core warm aura
    glow_draw.ellipse([width * 0.25, height * 0.15, width * 0.75, height * 0.85], fill=(255, 241, 242, 25))
    
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(50))
    base = Image.alpha_composite(base, glow_layer)
    
    # Layer 2: Organic Fluid Waves / Silk Ribbon contours
    curves_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    curves_draw = ImageDraw.Draw(curves_layer)
    
    # Wave ribbons with gradient alpha
    num_ribbons = 6
    for i in range(num_ribbons):
        alpha = int(25 + i * 15)
        offset_y = height * 0.35 + i * 35
        pts = []
        for x in range(0, width + 20, 10):
            rad = (x / width) * 2 * math.pi
            y = offset_y + math.sin(rad * 1.2 + i * 0.6) * 60 + math.cos(rad * 0.8) * 35
            pts.append((x, y))
        pts_bottom = pts + [(width, height), (0, height)]
        curves_draw.polygon(pts_bottom, fill=(255, 255, 255, 8 + i * 4))
        curves_draw.line(pts, fill=(255, 228, 230, alpha), width=2)
        
    curves_layer = curves_layer.filter(ImageFilter.GaussianBlur(3))
    base = Image.alpha_composite(base, curves_layer)
    
    # Layer 3: Elegant Botanical / Floral Vector Silhouette (Minimalist & Calming)
    botanical_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    b_draw = ImageDraw.Draw(botanical_layer)
    
    # Center-right botanical stem with gentle leaves
    cx = width * 0.68
    cy = height * 0.95
    stem_pts = []
    for step in range(120):
        t = step / 120
        sx = cx - math.sin(t * math.pi * 0.8) * 90 + t * 40
        sy = cy - t * (height * 0.75)
        stem_pts.append((sx, sy))
        
    b_draw.line(stem_pts, fill=(255, 255, 255, 140), width=3)
    
    # Leaves along stem
    for idx, (sx, sy) in enumerate(stem_pts[15::10]):
        leaf_side = 1 if idx % 2 == 0 else -1
        leaf_len = 45 + (idx % 3) * 10
        leaf_angle = -0.4 * leaf_side + 0.2
        
        leaf_poly = [
            (sx, sy),
            (sx + math.cos(leaf_angle) * leaf_len * 0.6 + leaf_side * 14, sy - math.sin(leaf_angle) * leaf_len * 0.6 - 10),
            (sx + math.cos(leaf_angle) * leaf_len, sy - math.sin(leaf_angle) * leaf_len - 15),
            (sx + math.cos(leaf_angle) * leaf_len * 0.6 - leaf_side * 6, sy - math.sin(leaf_angle) * leaf_len * 0.6 - 5),
        ]
        b_draw.polygon(leaf_poly, fill=(255, 241, 242, 60))
        b_draw.line(leaf_poly + [(sx, sy)], fill=(255, 255, 255, 160), width=1)
        
    # Left delicate floral stem
    cx2 = width * 0.32
    stem_pts2 = []
    for step in range(90):
        t = step / 90
        sx = cx2 + math.sin(t * math.pi * 0.7) * 70 - t * 25
        sy = cy - t * (height * 0.55)
        stem_pts2.append((sx, sy))
    b_draw.line(stem_pts2, fill=(255, 255, 255, 100), width=2)
    
    for idx, (sx, sy) in enumerate(stem_pts2[10::9]):
        leaf_side = -1 if idx % 2 == 0 else 1
        leaf_len = 35 + (idx % 2) * 8
        leaf_angle = -0.3 * leaf_side + 0.1
        leaf_poly = [
            (sx, sy),
            (sx + math.cos(leaf_angle) * leaf_len * 0.6 + leaf_side * 10, sy - math.sin(leaf_angle) * leaf_len * 0.6 - 8),
            (sx + math.cos(leaf_angle) * leaf_len, sy - math.sin(leaf_angle) * leaf_len - 12),
            (sx + math.cos(leaf_angle) * leaf_len * 0.6 - leaf_side * 4, sy - math.sin(leaf_angle) * leaf_len * 0.6 - 4),
        ]
        b_draw.polygon(leaf_poly, fill=(255, 241, 242, 45))
        b_draw.line(leaf_poly + [(sx, sy)], fill=(255, 255, 255, 120), width=1)
        
    # Layer 4: Minimalist Arch / Aura Ring (Framing Wellness)
    arch_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    a_draw = ImageDraw.Draw(arch_layer)
    
    # Outer elegant hairline ellipse
    a_draw.ellipse([width * 0.15, height * 0.1, width * 0.85, height * 0.95], outline=(255, 255, 255, 70), width=2)
    # Inner dashed ring
    for deg in range(0, 360, 6):
        if deg % 12 < 6:
            continue
        rad = math.radians(deg)
        rx = width * 0.32
        ry = height * 0.38
        x1 = width * 0.5 + math.cos(rad) * rx
        y1 = height * 0.52 + math.sin(rad) * ry
        x2 = width * 0.5 + math.cos(rad + 0.05) * rx
        y2 = height * 0.52 + math.sin(rad + 0.05) * ry
        a_draw.line([(x1, y1), (x2, y2)], fill=(255, 228, 230, 90), width=1)
        
    # Layer 5: Subtle vignetting & silk highlights
    vignette = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    v_draw = ImageDraw.Draw(vignette)
    v_draw.rectangle([0, 0, width, height], outline=(255, 255, 255, 40), width=1)
    
    final_img = Image.alpha_composite(base, botanical_layer)
    final_img = Image.alpha_composite(final_img, arch_layer)
    final_img = Image.alpha_composite(final_img, vignette)
    
    # Convert to RGB and save
    final_rgb = final_img.convert("RGB")
    final_rgb.save(filepath, "PNG", quality=95)
    print(f"Hero image saved successfully to {filepath}")

if __name__ == "__main__":
    generate_hero_image("c:/Users/Tilin Bijoy/Desktop/mystreewebsitee/corporatewesbite/her-corporate-care/public/welcome-hero.png")
