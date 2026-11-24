import urllib.request
import os
from PIL import Image, ImageEnhance, ImageFilter

# Target path inside public folder of Vite app
public_dir = os.path.join(os.getcwd(), 'her-corporate-care', 'public')
target_path = os.path.join(public_dir, 'welcome-hero.png')
target_art_path = os.path.join(public_dir, 'welcome-ai-art.png')

# URLs of top-tier serene women's wellness, calm mindfulness, soft rose tones
urls = [
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=90',
]

downloaded = False
temp_raw = 'temp_raw.jpg'

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = resp.read()
            with open(temp_raw, 'wb') as f:
                f.write(data)
            print(f"Downloaded raw image from {url}, size={len(data)}")
            downloaded = True
            break
    except Exception as e:
        print(f"Failed to download {url}: {e}")

if downloaded:
    im = Image.open(temp_raw).convert('RGB')
    
    # Crop to 16:10 editorial aspect ratio
    w, h = im.size
    target_ratio = 16.0 / 10.0
    current_ratio = w / h
    
    if current_ratio > target_ratio:
        # Too wide, crop horizontally
        new_w = int(h * target_ratio)
        offset = (w - new_w) // 2
        im = im.crop((offset, 0, offset + new_w, h))
    else:
        # Too tall, crop vertically
        new_h = int(w / target_ratio)
        offset = (h - new_h) // 2
        im = im.crop((0, offset, w, offset + new_h))
        
    im = im.resize((1200, 750), Image.Resampling.LANCZOS)
    
    # Apply warm rose / burgundy velvet color grading to match Her luxury aesthetic
    # Soft rose tint overlay
    tint_layer = Image.new('RGB', (1200, 750), (45, 12, 22)) # Deep velvet burgundy
    # Blend with soft lighting
    graded = Image.blend(im, tint_layer, alpha=0.32)
    
    # Enhance contrast and gentle color
    enhancer = ImageEnhance.Contrast(graded)
    graded = enhancer.enhance(1.15)
    
    # Save both welcome-hero.png and welcome-ai-art.png
    graded.save(target_path, 'PNG', optimize=True)
    graded.save(target_art_path, 'PNG', optimize=True)
    print(f"Saved luxury graded hero image to {target_path} and {target_art_path}")
    
    if os.path.exists(temp_raw):
        os.remove(temp_raw)
else:
    print("Could not download raw image, keeping existing asset.")
