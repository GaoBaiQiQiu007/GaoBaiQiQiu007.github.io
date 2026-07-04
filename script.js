const GITHUB_USERNAME = 'GaoBaiQiQiu007';

const typingTexts = [
    '全栈开发者',
    '开源爱好者',
    '创意探索者',
    '终身学习者'
];

const defaultProjects = [
    {
        name: 'awesome-project',
        description: '一个超棒的开源项目，包含了丰富的功能和优雅的代码实现。',
        language: 'JavaScript',
        stars: 128,
        forks: 32,
        category: 'web',
        icon: '🚀'
    },
    {
        name: 'cool-toolkit',
        description: '实用的开发工具集，提升你的日常开发效率。',
        language: 'Python',
        stars: 89,
        forks: 15,
        category: 'tool',
        icon: '🛠️'
    },
    {
        name: 'fun-game',
        description: '有趣的休闲小游戏，用代码创造快乐。',
        language: 'TypeScript',
        stars: 56,
        forks: 12,
        category: 'game',
        icon: '🎮'
    },
    {
        name: 'blog-system',
        description: '简洁优雅的博客系统，支持 Markdown 和主题定制。',
        language: 'Vue',
        stars: 201,
        forks: 45,
        category: 'web',
        icon: '📝'
    },
    {
        name: 'cli-tools',
        description: '强大的命令行工具集合，让终端操作更高效。',
        language: 'Go',
        stars: 76,
        forks: 18,
        category: 'tool',
        icon: '⚡'
    },
    {
        name: 'pixel-adventure',
        description: '像素风格冒险游戏，探索神秘的像素世界。',
        language: 'JavaScript',
        stars: 43,
        forks: 8,
        category: 'game',
        icon: '🎯'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initNavbarScroll();
    initScrollAnimations();
    initBackToTop();
    initFilterButtons();
    loadGitHubData();
    renderProjects(defaultProjects);
});

function initTypingEffect() {
    const typingElement = document.getElementById('typingText');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = typingTexts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.about-card, .skill-card, .project-card, .section-header');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    document.querySelectorAll('.skills').forEach(el => {
        observer.observe(el);
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, index * 100);
    });
}

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            filterProjects(filter);
        });
    });
}

function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

function renderProjects(projects) {
    const projectsGrid = document.getElementById('projectsGrid');
    
    projectsGrid.innerHTML = projects.map((project, index) => `
        <div class="project-card fade-in" data-category="${project.category}" style="animation-delay: ${index * 0.1}s">
            <div class="project-header">
                <div class="project-icon">${project.icon}</div>
                <div class="project-stats">
                    <div class="project-stat">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                        ${project.stars}
                    </div>
                    <div class="project-stat">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="6" cy="3" r="2"/>
                            <circle cx="6" cy="21" r="2"/>
                            <circle cx="18" cy="12" r="2"/>
                            <path d="M6 5v14M18 12l-8-5M18 12l-8 5"/>
                        </svg>
                        ${project.forks}
                    </div>
                </div>
            </div>
            <div class="project-body">
                <h3 class="project-title">${project.name}</h3>
                <p class="project-desc">${project.description}</p>
                <div class="project-tags">
                    <span class="project-tag">${project.language}</span>
                </div>
            </div>
            <div class="project-footer">
                <a href="https://github.com/${GITHUB_USERNAME}/${project.name}" target="_blank" class="project-link">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                    查看源码
                </a>
            </div>
        </div>
    `).join('');

    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach(card => {
            card.classList.add('visible');
        });
    }, 100);
}

async function loadGitHubData() {
    try {
        const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (userResponse.ok) {
            const userData = await userResponse.json();
            updateUserStats(userData);
            updateAvatar(userData.avatar_url);
        }
    } catch (error) {
        console.log('无法加载 GitHub 用户数据，使用默认数据');
    }

    try {
        const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=6`);
        if (reposResponse.ok) {
            const reposData = await reposResponse.json();
            if (reposData.length > 0) {
                const projects = reposData.map(repo => ({
                    name: repo.name,
                    description: repo.description || '暂无描述',
                    language: repo.language || 'Other',
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    category: getProjectCategory(repo),
                    icon: getProjectIcon(repo.language)
                }));
                renderProjects(projects);
            }
        }
    } catch (error) {
        console.log('无法加载 GitHub 仓库数据，使用默认项目');
    }
}

function updateUserStats(userData) {
    animateNumber('repoCount', userData.public_repos);
    animateNumber('followerCount', userData.followers);
    animateNumber('followingCount', userData.following);
}

function updateAvatar(avatarUrl) {
    const avatarImg = document.getElementById('avatarImg');
    if (avatarImg && avatarUrl) {
        avatarImg.src = avatarUrl;
    }
}

function animateNumber(elementId, target) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeProgress);
        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function getProjectCategory(repo) {
    const topics = repo.topics || [];
    const name = repo.name.toLowerCase();
    const desc = (repo.description || '').toLowerCase();

    if (topics.some(t => t.includes('game')) || name.includes('game') || desc.includes('游戏') || desc.includes('game')) {
        return 'game';
    }
    if (topics.some(t => t.includes('tool') || t.includes('cli')) || name.includes('tool') || name.includes('cli') || desc.includes('工具') || desc.includes('tool')) {
        return 'tool';
    }
    return 'web';
}

function getProjectIcon(language) {
    const icons = {
        'JavaScript': '📜',
        'TypeScript': '📘',
        'Python': '🐍',
        'Java': '☕',
        'Go': '🐹',
        'Rust': '🦀',
        'C++': '⚙️',
        'C': '💻',
        'Vue': '💚',
        'React': '⚛️',
        'HTML': '🌐',
        'CSS': '🎨',
        'Shell': '🐚',
        'Ruby': '💎',
        'PHP': '🐘'
    };
    return icons[language] || '📦';
}

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
    });
}
