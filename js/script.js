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
    if (type === 'videos') {
        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
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
    // Filtering
    document.querySelectorAll('.portfolio-filter li').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.portfolio-filter li').forEach(li => li.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            currentPage = 1;
            renderPortfolio(currentPage, currentFilter);
            updateTabCounts();
        });
    });
    renderPortfolio(currentPage, currentFilter);
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
