import os
import urllib.request
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw

public_dir = os.path.join(os.getcwd(), 'her-corporate-care', 'public')
target_hero = os.path.join(public_dir, 'welcome-ai-hero.jpg')
target_png = os.path.join(public_dir, 'welcome-hero.png')

# Download an exquisite serene wellness editorial photo
# Woman in mindful calm morning glow, natural botanicals, soft aesthetic lighting
url = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=95'

req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
raw_path = 'temp_wellness.jpg'

try:
    with urllib.request.urlopen(req, timeout=15) as resp:
        with open(raw_path, 'wb') as f:
            f.write(resp.read())
    print("Downloaded wellness image")
except Exception as e:
    print(f"Error downloading: {e}")

if os.path.exists(raw_path):
    im = Image.open(raw_path).convert('RGB')
    w, h = im.size
    
    # Crop to 16:10 ratio focusing on the serene subject
    target_ratio = 16.0 / 10.0
    if w / h > target_ratio:
        new_w = int(h * target_ratio)
        offset = (w - new_w) // 2
        im = im.crop((offset, 0, offset + new_w, h))
    else:
        new_h = int(w / target_ratio)
        offset = (h - new_h) // 2
        im = im.crop((0, offset, w, offset + new_h))
        
    im = im.resize((1200, 750), Image.Resampling.LANCZOS)
    
    # Create soft luxury rose & burgundy gradient glaze
    # Top has soft rose light, bottom deepens into rich burgundy for readability
    glaze = Image.new('RGBA', (1200, 750), (0, 0, 0, 0))
    draw = ImageDraw.Draw(glaze)
    
    for y in range(750):
        t = y / 750.0
        # Velvet burgundy tone (42, 14, 26) with alpha increasing towards bottom
        alpha = int(40 + t * 150) # subtle at top, deeper at bottom
        # gentle blush pink tint at top (255, 230, 235), rich burgundy at bottom
        r = int(220 * (1 - t) + 42 * t)
        g = int(120 * (1 - t) + 14 * t)
        b = int(140 * (1 - t) + 26 * t)
        draw.line([(0, y), (1200, y)], fill=(r, g, b, alpha))
    
    # Composite glaze over photo
    im_rgba = im.convert('RGBA')
    blended = Image.alpha_composite(im_rgba, glaze)
    
    # Save high-res JPEG and PNG
    final_rgb = blended.convert('RGB')
    enhancer = ImageEnhance.Contrast(final_rgb)
    final_rgb = enhancer.enhance(1.08)
    
    color_enhancer = ImageEnhance.Color(final_rgb)
    final_rgb = color_enhancer.enhance(1.05)
    
    final_rgb.save(target_hero, 'JPEG', quality=95, optimize=True)
    final_rgb.save(target_png, 'PNG', optimize=True)
    print(f"Successfully generated and saved: {target_hero}")
    
    if os.path.exists(raw_path):
        os.remove(raw_path)
