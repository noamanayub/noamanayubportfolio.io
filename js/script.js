// Portfolio image arrays
const logos = [
    'img/portfolio/Logos/p1.jpg',
    'img/portfolio/Logos/p2.jpg',
    'img/portfolio/Logos/p3.jpg',
    'img/portfolio/Logos/p4.jpg',
    'img/portfolio/Logos/p5.jpg',
    'img/portfolio/Logos/p6.jpg',
    'img/portfolio/Logos/p7.jpg',
    'img/portfolio/Logos/p8.jpg',
    'img/portfolio/Logos/p9.jpg',
    'img/portfolio/Logos/p10.jpg',
    'img/portfolio/Logos/p11.jpg',
    'img/portfolio/Logos/p12.jpg',
    'img/portfolio/Logos/p13.png',
    'img/portfolio/Logos/p14.png',
];
const posts = [
    'img/portfolio/Posts/g1.jpg',
    'img/portfolio/Posts/g2.jpg',
    'img/portfolio/Posts/g3.jpg',
    'img/portfolio/Posts/g4.jpg',
    'img/portfolio/Posts/g5.png',
    'img/portfolio/Posts/g6.png',
    'img/portfolio/Posts/g8.jpg',
    'img/portfolio/Posts/g9.jpg',
];
const videos = [
    'img/portfolio/Videos/v1.mp4',
    'img/portfolio/Videos/v2.mp4',
    'img/portfolio/Videos/v3.mp4',
    'img/portfolio/Videos/v4.mp4',
    'img/portfolio/Videos/v5.mp4',
    'img/portfolio/Videos/v6.mp4',
    'img/portfolio/Videos/v7.mp4',
    'img/portfolio/Videos/v8.mp4',
    'img/portfolio/Videos/v9.mp4',
];
const ui = [
    'img/portfolio/UI/ui1.png',
    'img/portfolio/UI/ui2.png',
    'img/portfolio/UI/ui3.png',
];
const allProjects = [
    ...logos.map(src => ({src, type: 'logos'})),
    ...posts.map(src => ({src, type: 'posts'})),
    ...videos.map(src => ({src, type: 'videos'})),
    ...ui.map(src => ({src, type: 'ui'})),
];

const portfolioGrid = document.getElementById('portfolioGrid');
const projectsPerPage = 7;
let currentPage = 1;
let currentFilter = '*';

function createPortfolioItem(src, type) {
    const col = document.createElement('div');
    col.className = `masonry-item all ${type}`;
    const box = document.createElement('div');
    box.className = 'portfolio_box';
    const single = document.createElement('div');
    single.className = 'single_portfolio';
    let overlayText = '';
    if (type === 'videos') {
        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.setAttribute('controlsList', 'nodownload'); // Remove download button
        video.style.width = '100%';
        video.style.height = 'auto';
        video.style.display = 'block';
        video.style.borderRadius = '12px';
        video.style.background = '#222';
        video.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
        video.style.objectFit = 'contain';
        single.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = src;
        img.alt = '';
        single.appendChild(img);
    }
    // Add overlay
    const overlay = document.createElement('div');
    overlay.className = 'portfolio-hover-overlay';
    overlay.textContent = overlayText;
    single.appendChild(overlay);
    box.appendChild(single);
    col.appendChild(box);
    return col;
}

function renderPortfolio(page = 1, filter = '*') {
    let filtered = allProjects;
    if (filter !== '*') {
        filtered = allProjects.filter(item => item.type === filter.replace('.', ''));
    }
    const start = (page - 1) * projectsPerPage;
    const end = start + projectsPerPage;
    portfolioGrid.innerHTML = '';
    filtered.slice(start, end).forEach(item => {
        portfolioGrid.appendChild(createPortfolioItem(item.src, item.type));
    });
    renderPagination(filtered.length, page);

    // --- Footer Overlap Fix and Scroll Enhancement ---
    const portfolioArea = document.querySelector('.portfolio_area');
    if (portfolioArea) {
        portfolioArea.style.minHeight = '';
        const gridHeight = portfolioGrid.offsetHeight;
        const pagination = document.querySelector('.portfolio-pagination');
        const paginationHeight = pagination ? pagination.offsetHeight : 0;
        portfolioArea.style.minHeight = (gridHeight + paginationHeight + 400) + 'px'; // increased buffer
    }

    // Ensure body is scrollable
    document.body.style.height = 'auto';
    document.body.style.overflowY = 'scroll';
}

function renderPagination(total, page) {
    let pagination = document.querySelector('.portfolio-pagination');
    if (!pagination) {
        pagination = document.createElement('div');
        pagination.className = 'portfolio-pagination';
    }
    pagination.innerHTML = '';
    const pageCount = Math.ceil(total / projectsPerPage);
    for (let i = 1; i <= pageCount; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        if (i === page) btn.classList.add('active');
        btn.addEventListener('click', () => {
            currentPage = i;
            renderPortfolio(currentPage, currentFilter);
        });
        pagination.appendChild(btn);
    }
    pagination.style.display = pageCount > 1 ? 'flex' : 'none';
    // Move pagination to the top of the grid
    const gridParent = portfolioGrid.parentNode;
    if (gridParent) {
        if (gridParent.firstChild !== pagination) {
            gridParent.insertBefore(pagination, portfolioGrid);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Filtering with fast click response and animation
    document.querySelectorAll('.portfolio-filter li').forEach(tab => {
        tab.addEventListener('click', function() {
            // Prevent double click lag
            if (this.classList.contains('active')) return;
            document.querySelectorAll('.portfolio-filter li').forEach(li => li.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            currentPage = 1;

            // Animate grid out
            portfolioGrid.style.transition = 'opacity 0.25s cubic-bezier(.4,0,.2,1)';
            portfolioGrid.style.opacity = '0.2';

            setTimeout(() => {
                renderPortfolio(currentPage, currentFilter);

                // Animate grid in
                portfolioGrid.style.transition = 'opacity 0.4s cubic-bezier(.4,0,.2,1)';
                portfolioGrid.style.opacity = '1';

                // Animate items in
                Array.from(portfolioGrid.children).forEach((item, idx) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(40px) scale(0.96)';
                    item.style.transition = 'opacity 0.5s, transform 0.5s';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, 60 * idx);
                });

                updateTabCounts();
            }, 200);
        });
    });

    // Service box click handlers
    const serviceMap = {
        'Graphic Design': '.logos',
        'UI/UX Design': '.ui',
        'Video Editing': '.videos',
        'Data Analysis': '.posts'
    };
    document.querySelectorAll('.feature_item h4').forEach(h4 => {
        h4.style.cursor = 'pointer';
        h4.addEventListener('click', function() {
            const tabKey = serviceMap[this.textContent.trim()];
            if (tabKey) {
                const tab = document.querySelector(`.portfolio-filter li[data-filter="${tabKey}"]`);
                if (tab) {
                    tab.click();
                    // Scroll to portfolio section
                    const portfolioSection = document.getElementById('portfolio');
                    if (portfolioSection) {
                        portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            }
        });
    });

    // Initial render with animation
    renderPortfolio(currentPage, currentFilter);
    setTimeout(() => {
        Array.from(portfolioGrid.children).forEach((item, idx) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(40px) scale(0.96)';
            item.style.transition = 'opacity 0.5s, transform 0.5s';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, 60 * idx);
        });
    }, 100);

    // === Animated Text for Banner ===
    // Animate 'I am' and 'NOAMAN AYUB' on next line, letter by letter, preserving spaces
    const bannerH1 = document.querySelector('.banner_content h1');
    if (bannerH1) {
        const text = bannerH1.textContent.trim();
        // Split into "I AM" and "NOAMAN AYUB" (first two words vs the rest)
        const words = text.split(' ');
        const firstLine = words.slice(0, 2).join(' '); // "I AM"
        const secondLine = words.slice(2).join(' ');   // "NOAMAN AYUB"
        bannerH1.textContent = '';
        // First line: "I AM"
        const line1 = document.createElement('span');
        line1.style.display = 'block';
        line1.style.lineHeight = '1.1';
        bannerH1.appendChild(line1);
        // Second line: "NOAMAN AYUB"
        const line2 = document.createElement('span');
        line2.style.display = 'block';
        line2.style.lineHeight = '1.1';
        bannerH1.appendChild(line2);

        let i = 0;
        function typeWriter() {
            if (i < firstLine.length) {
                const char = firstLine.charAt(i);
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for visible space
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(20px)';
                span.style.transition = 'all 0.35s cubic-bezier(.4,0,.2,1)';
                line1.appendChild(span);
                setTimeout(() => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                }, 30 * i);
                i++;
                setTimeout(typeWriter, 45);
            } else if (i < firstLine.length + secondLine.length) {
                // Second line: "NOAMAN AYUB"
                const idx = i - firstLine.length;
                const char = secondLine.charAt(idx);
                const span = document.createElement('span');
                // Only add space after "NOAMAN", not before
                if (idx === 7 && char === ' ') {
                    span.textContent = '\u00A0'; // space after "NOAMAN"
                } else if (char === ' ') {
                    span.textContent = ''; // skip space before "NOAMAN"
                } else {
                    span.textContent = char;
                }
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(20px)';
                span.style.transition = 'all 0.35s cubic-bezier(.4,0,.2,1)';
                line2.appendChild(span);
                setTimeout(() => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                }, 30 * i);
                i++;
                setTimeout(typeWriter, 45);
            }
        }
        typeWriter();
    }

    // Animated sliding changing text for 'Graphic Designer'
    const bannerH5 = document.querySelector('.banner_content h5');
    if (bannerH5) {
        const roles = ['GRAPHIC DESIGNER', 'VIDEO EDITOR', 'UI/UX DESIGNER'];
        let roleIdx = 0;
        let isTransitioning = false;
        bannerH5.style.display = 'inline-block';
        bannerH5.style.overflow = 'hidden';
        bannerH5.style.position = 'relative';
        bannerH5.style.minWidth = bannerH5.offsetWidth + 'px';

        // Create a span for sliding text
        let slideSpan = document.createElement('span');
        slideSpan.textContent = roles[0];
        slideSpan.style.display = 'inline-block';
        slideSpan.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1), opacity 0.5s cubic-bezier(.4,0,.2,1)';
        slideSpan.style.willChange = 'transform,opacity';
        bannerH5.innerHTML = '';
        bannerH5.appendChild(slideSpan);

        function changeRole() {
            if (isTransitioning) return;
            isTransitioning = true;
            // Slide up and fade out
            slideSpan.style.transform = 'translateY(-100%)';
            slideSpan.style.opacity = '0';
            setTimeout(() => {
                // Change text and slide in from below
                slideSpan.textContent = roles[roleIdx];
                slideSpan.style.transition = 'none';
                slideSpan.style.transform = 'translateY(100%)';
                // Force reflow
                void slideSpan.offsetWidth;
                slideSpan.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1), opacity 0.5s cubic-bezier(.4,0,.2,1)';
                slideSpan.style.transform = 'translateY(0)';
                slideSpan.style.opacity = '1';
                roleIdx = (roleIdx + 1) % roles.length;
                setTimeout(() => {
                    isTransitioning = false;
                }, 500);
            }, 400);
        }
        setInterval(changeRole, 2200);
    }
});

// Video switching logic
function changeVideo(src) {
    const video = document.getElementById('mainVideo');
    video.querySelector('source').setAttribute('src', src);
    video.load();
    video.play();
}
window.changeVideo = changeVideo;

function setVideoPortrait() {
    const video = document.getElementById('mainVideo');
    video.style.width = 'auto';
    video.style.height = '600px';
    video.style.maxWidth = '360px';
    video.style.maxHeight = '80vh';
    video.style.aspectRatio = '9/16';
}
window.setVideoPortrait = setVideoPortrait;

document.addEventListener('DOMContentLoaded', function() {
    const introBtn = document.querySelector("button[onclick*='Introduction.mp4']");
    const uiuxBtn = document.querySelector("button[onclick*='UIUXDesign.mp4']");
    if (introBtn) {
        introBtn.addEventListener('click', function() {
            const video = document.getElementById('mainVideo');
            video.style.width = '100%';
            video.style.maxWidth = '1000px';
            video.style.height = 'auto';
            video.style.maxHeight = '';
            video.style.aspectRatio = '';
        });
    }
    if (uiuxBtn) {
        uiuxBtn.addEventListener('click', setVideoPortrait);
    }
});


function updateTabCounts() {
    // Helper to update badge for a tab
    function setBadge(tab, count, pageCount) {
        let badge = tab.querySelector('.tab-count-badge');
        if (badge) badge.remove();
        badge = document.createElement('span');
        badge.className = 'tab-count-badge';
        badge.textContent = count;
        badge.style.display = 'inline-block';
        badge.style.background = '#4458dc';
        badge.style.color = '#fff';
        badge.style.fontSize = '13px';
        badge.style.fontWeight = 'bold';
        badge.style.borderRadius = '12px';
        badge.style.padding = '2px 10px';
        badge.style.marginLeft = '8px';
        badge.style.verticalAlign = 'middle';
        if (pageCount > 1) {
            badge.textContent += ` (${pageCount})`;
        }
        tab.appendChild(badge);
    }
    // All tab
    const allTab = document.querySelector('.portfolio-filter li[data-filter="*"]');
    if (allTab) setBadge(allTab, allProjects.length, Math.ceil(allProjects.length / projectsPerPage));
    // Logos tab
    const logosTab = document.querySelector('.portfolio-filter li[data-filter=".logos"]');
    if (logosTab) setBadge(logosTab, logos.length, Math.ceil(logos.length / projectsPerPage));
    // Posts tab
    const postsTab = document.querySelector('.portfolio-filter li[data-filter=".posts"]');
    if (postsTab) setBadge(postsTab, posts.length, Math.ceil(posts.length / projectsPerPage));
    // Videos tab
    const videosTab = document.querySelector('.portfolio-filter li[data-filter=".videos"]');
    if (videosTab) setBadge(videosTab, videos.length, Math.ceil(videos.length / projectsPerPage));
    // UI tab
    const uiTab = document.querySelector('.portfolio-filter li[data-filter=".ui"]');
    if (uiTab) setBadge(uiTab, ui.length, Math.ceil(ui.length / projectsPerPage));
}

// Call on load
updatePostsTabCount();
updateTabCounts();
