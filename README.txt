Pak Ar International upgraded static website

Folder-based URL structure is ready for hosting:
- Home: /index.html
- About: /about/index.html
- Products: /products/index.html
- Product details: /products/product-name/index.html
- FAQ: /faq/index.html
- Contact: /contact/index.html

Upload the contents of this folder to the domain root / public_html. After hosting, links will show as /about/, /products/, /contact/ instead of .html.

Included features:
- Responsive layout for mobile, tablet and desktop
- Sticky header with mobile menu
- Product dropdown
- Product search and category filters
- Product comparison dock
- FAQ accordion and FAQ search
- Product detail tabs
- Quick product guide
- Contact forms that open WhatsApp with prepared message
- Google Maps embed on contact page
- Scroll progress bar, reveal effects, counters, back-to-top button

To change map location:
Open contact/index.html and replace the Google Maps search query with the exact office address or coordinates.


IMPORTANT FIX:
This version uses relative asset paths, so CSS/JS will load correctly even when you open it from a subfolder, local server, GitHub Pages, or public_html.

For best testing, open it with a local server instead of double-clicking files:
- VS Code Live Server, or
- python -m http.server 8000
Then open http://localhost:8000/
