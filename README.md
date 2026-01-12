# Lotus View - Social Media Agency Portfolio

A modern, fully responsive, deploy-ready portfolio website for a social media agency built with pure HTML, CSS, and JavaScript (no frameworks, no build tools).

## 🎯 Features

- **Responsive Design**: Mobile-first approach, optimized for all devices
- **Hero Slider**: Auto-playing carousel with 3 slides, pagination dots, and swipe support
- **Sticky Navigation**: Mobile-friendly hamburger menu with smooth animations
- **Service Cards**: Beautiful service cards with hover effects
- **Portfolio Grid**: Responsive image gallery with hover overlays
- **Contact Section**: Contact form (client-side demo), email/phone links, WhatsApp integration
- **Smooth Interactions**: Scroll animations, fade-in effects, micro-interactions
- **Accessibility**: Semantic HTML, keyboard navigation, focus states, ARIA labels
- **Performance**: Optimized CSS variables, minimal JavaScript, no external dependencies except CDN fonts/icons

## 📁 Folder Structure

```
LotusAgency/
├── assets/
│   └── img/
│       ├── hero1.jpg
│       ├── hero2.jpg
│       ├── hero3.jpg
│       ├── about.jpg
│       ├── p1.jpg through p6.jpg
│       └── (image placeholders)
├── index.html
├── style.css
├── script.js
├── favicon.ico
└── README.md
```

## 🚀 Quick Start

1. **Download/Clone** the repository
2. **Replace images** in `/assets/img/` with your own (or use placeholders)
3. **Customize content** in `index.html` as needed
4. **Update contact details** with your actual information
5. **Open `index.html`** in a browser or deploy directly

## 🎨 Colors & Typography

### Color Palette
- **Primary Yellow**: `#FFD300`
- **Black**: `#000`
- **White**: `#FFF`
- **Light Gray**: `#f5f5f5`

### Fonts (Google Fonts)
- **Headings**: Bebas Neue
- **Body**: Poppins
- **Accents**: Montserrat

All fonts are loaded via CDN in the `<head>` of `index.html`.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

Mobile hamburger menu automatically appears on screens smaller than 768px.

## 🧩 JavaScript Modules

The `script.js` file is organized into clean, modular classes:

### MobileMenu
- Handles hamburger toggle
- Closes on link click, ESC press, or outside click
- Prevents body scroll when menu is open

### HeroSlider
- Auto-plays slides every 5 seconds
- Supports pagination dots, next/prev buttons, and swipe
- Pauses when hovered or out of viewport
- Responsive touch events for mobile

### SmoothScroll
- Smooth scrolling for all anchor links (`#section`)
- Updates URL without page jump

### RevealOnScroll
- Fade-in animations using IntersectionObserver
- Triggers when elements scroll into view

### ContactForm
- Client-side form validation
- Shows confirmation message on submit
- Logs form data to console (no backend integration by default)

### FooterYear
- Auto-updates current year in footer

### KeyboardNavigation
- Hamburger menu: Enter/Space to toggle
- Slider dots: Arrow keys to navigate
- All buttons have focus states

## 📋 Customization Guide

### Update Agency Information

Open `index.html` and find these sections:

```html
<!-- Navbar Logo -->
<span class="logo-text">Lotus View</span>

<!-- Hero Slides -->
<h1 class="hero-title">Your Headline Here...</h1>

<!-- About Section -->
<h2>About <span class="highlight">Lotus View</span></h2>
<p>Your about text...</p>

<!-- Contact Section -->
<a href="tel:+919409382678">+91 94093 82678</a>
<a href="mailto:khabaramdavad@gmail.com">khabaramdavad@gmail.com</a>
```

### Add/Remove Slides

Hero slider has 3 slides. To add more:

1. Add a new slide in HTML:
```html
<div class="hero-slide" data-slide="3">
    <div class="hero-image">
        <img src="assets/img/hero4.jpg" alt="Description">
    </div>
    <div class="hero-content">
        <h1 class="hero-title">Headline</h1>
        <p class="hero-subtitle">Subtext</p>
        <a href="#" class="btn btn-primary">CTA</a>
    </div>
</div>
```

2. Add a dot in the pagination:
```html
<button class="dot" data-dot="3" aria-label="Go to slide 4"></button>
```

### Change Colors

Edit CSS variables in `style.css`:

```css
:root {
    --primary-yellow: #FFD300;
    --dark-black: #000;
    --light-white: #fff;
    /* ... other variables ... */
}
```

### Modify Fonts

Update the Google Fonts link in `index.html` `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@400;600;700&display=swap" rel="stylesheet">
```

Then update the CSS variable:

```css
--font-heading: 'Your Font', sans-serif;
```

## 🖼️ Image Guidelines

### Recommended Dimensions

- **Hero images**: 1920×1080px (16:9 aspect ratio)
- **About image**: 600×600px or 800×600px
- **Portfolio items**: 400×400px (square, for CSS aspect-ratio)
- **Icons/Logo**: 200×200px

### Optimization

For web performance:
- Compress images using TinyPNG or ImageOptim
- Use JPEG for photos, PNG for graphics
- Target file sizes: 100-300 KB per image

## 📝 Form Handling

The contact form is currently **client-side only** (shows confirmation message). To add backend processing:

1. **Option 1**: Use a service like Formspree, Netlify Forms, or EmailJS
2. **Option 2**: Create a backend endpoint and update the form submission in `script.js`

Example for Netlify Forms (add to `<form>` tag):
```html
<form id="contact-form" name="contact" method="POST" netlify>
    <!-- form fields -->
</form>
```

## 🌐 Deployment

This site is **deploy-ready** for:

### Netlify
1. Push repo to GitHub
2. Connect GitHub repo in Netlify dashboard
3. Deploy (automatic)

### Vercel
1. Push repo to GitHub
2. Import project in Vercel
3. Deploy (automatic)

### GitHub Pages
1. Push repo to GitHub
2. Enable GitHub Pages in repo settings (main branch)
3. Site publishes automatically

**No build step required.** Just upload the files and you're done.

## ♿ Accessibility Features

- **Semantic HTML**: Proper use of `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- **ARIA Labels**: Menu buttons, interactive elements have proper aria-labels
- **Keyboard Navigation**: All interactive elements accessible via Tab and Enter/Space
- **Focus States**: Visible focus indicators on all buttons and links
- **Color Contrast**: Text meets WCAG AA standards
- **Reduced Motion**: Respects `prefers-reduced-motion` media query

## 🔧 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 📊 Performance Checklist

- ✅ No JavaScript framework overhead
- ✅ CSS organized with variables and comments
- ✅ Images optimized and responsive
- ✅ Lazy-loading ready (can add data-src for lazy load)
- ✅ Minimal external dependencies (Google Fonts + FontAwesome CDN only)
- ✅ Gzipped size: ~50KB

## 🎓 Code Quality

- **HTML**: Semantic, accessible, well-commented
- **CSS**: Organized, variables-based, mobile-first responsive
- **JS**: Modular classes, no global variables, commented functions

## 🐛 Troubleshooting

### Images Not Loading
- Check image paths (use relative paths from `index.html`)
- Ensure images exist in `/assets/img/` folder
- Check browser console for 404 errors

### Menu Not Working on Mobile
- Ensure `script.js` is loaded before closing `</body>`
- Check console for JavaScript errors
- Verify hamburger button exists in HTML

### Slider Not Auto-Playing
- Check if JavaScript is enabled
- Verify slider container exists in HTML
- Check console for errors

### Form Not Submitting
- Ensure all required fields are filled
- Check console for validation errors
- Verify email format is valid

## 📧 Support & Contact

For issues or questions:
- Email: khabaramdavad@gmail.com
- WhatsApp: +91 94093 82678
- Instagram: @khabar.amdavad

## 📄 License

Free to use and modify. No attribution required.

---

**Built with ❤️ for Lotus View**  
*A modern social media agency portfolio, ready to deploy.*
