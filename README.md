# Noaman Ayub Portfolio Website

This is a personal portfolio website for Noaman Ayub, a graphic designer and content creator. The site showcases portfolio items (Logos, Posts, Videos, UI), provides information about services, and allows visitors to download a resume (CV).

## Features
- **Masonry/Pinterest-style Portfolio Grid**: Responsive grid layout for portfolio items with pagination (7 items per page).
- **Portfolio Tabs**: Filter portfolio by category (All, Logos, Posts, Videos, UI) with dynamic badge counts.
- **Media Support**: Supports images and videos, maintaining original aspect ratios.
- **Modern UI**: Clean, modern design with consistent button and section styling.
- **Downloadable Resume**: "Get CV" and "Download CV" buttons link to a downloadable PDF resume.
- **Follow Me Section**: Social media links for LinkedIn, Instagram, and GitHub.

## Folder Structure
```
├── css/                # Stylesheets (Bootstrap, custom styles, etc.)
├── img/                # Images, videos, and CV (PDF)
│   ├── cv/             # Resume PDF
│   ├── portfolio/      # Portfolio media (Logos, Posts, Videos, UI)
│   └── ...
├── js/                 # JavaScript files (portfolio logic, UI, etc.)
├── vendors/            # Third-party libraries (jQuery, Isotope, etc.)
├── index.html          # Main website file
└── README.md           # Project documentation (this file)
```

## Getting Started
1. **Clone or Download** this repository to your local machine.
2. **Open `index.html`** in your web browser to view the site.
3. **Edit Content**: Update images, videos, and text as needed in the `img/portfolio/` and `index.html` files.

## Customization
- **Portfolio Items**: Add or remove images/videos in the `img/portfolio/` subfolders. Update the arrays in `js/script.js` if you add new items.
- **Resume**: Replace `img/cv/NoamanAyubResume.pdf` with your own PDF to update the downloadable CV.
- **Social Links**: Update the URLs in the "Follow Me" section in `index.html`.

## Dependencies
- [Bootstrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)
- [Isotope](https://isotope.metafizzy.co/)
- [Owl Carousel](https://owlcarousel2.github.io/OwlCarousel2/)
- [Font Awesome](https://fontawesome.com/)

All dependencies are included locally in the `vendors/` and `css/` folders.

## License
This project is for personal portfolio use. Please contact Noaman Ayub for reuse or distribution.

---

*Created by Noaman Ayub*
