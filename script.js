/**
 * Janani Manivel - Portfolio Interactivity Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // Project Dataset
  // ==========================================================================
  const projectsData = [
    {
      id: 'analytics-dashboard',
      title: 'Synthetix Cloud Analytics Engine',
      category: 'fullstack',
      date: '2026',
      metric: '⚡ 1.4M+ Events / Sec',
      summary: 'High-performance real-time telemetry and revenue analytics SaaS dashboard with sub-second stream processing.',
      image: 'assets/images/project-analytics.jpg',
      tags: ['React', 'TypeScript', 'Node.js', 'ClickHouse', 'Tailwind', 'Docker'],
      overview: 'Synthetix is an enterprise-grade analytics engine and interactive dashboard built to handle real-time event ingestion and high-concurrency aggregations. It features custom WebGL data charts, streaming session timelines, and anomaly alerts.',
      features: [
        'Real-time streaming ingestion with Apache Kafka & WebSockets',
        'Sub-100ms dashboard queries across millions of analytical events',
        'Custom interactive time-series chart components',
        'Role-based access control (RBAC) and team workspaces'
      ],
      demoUrl: 'https://synthetix-demo.vercel.app',
      githubUrl: 'https://github.com/jananimanivel/synthetix-analytics'
    },
    {
      id: 'ai-prompt-studio',
      title: 'NeuroFlow AI Prompt Studio & Node Workflow',
      category: 'ai',
      date: '2026',
      metric: '🧠 Multi-Model Orchestration',
      summary: 'Visual node-based canvas for orchestrating LLM chains, agentic workflows, and creative prompt pipelines.',
      image: 'assets/images/project-ai-workspace.jpg',
      tags: ['Next.js', 'Python', 'FastAPI', 'LangChain', 'OpenAI API', 'Tailwind'],
      overview: 'NeuroFlow enables developers and designers to assemble complex generative AI chains visually without code. Users can connect prompt templates, retrieval tools, memory buffers, and evaluation nodes into robust pipelines.',
      features: [
        'Infinite drag-and-drop node graph canvas with reactive state',
        'Streaming multi-modal outputs and live token inspection',
        'Custom prompt regression testing and output comparison diffs',
        'One-click export to production-ready Python or TypeScript APIs'
      ],
      demoUrl: 'https://neuroflow-studio.vercel.app',
      githubUrl: 'https://github.com/jananimanivel/neuroflow-ai'
    },
    {
      id: 'orbitflow-kanban',
      title: 'OrbitFlow Agile Task & Sprint Orchestrator',
      category: 'fullstack',
      date: '2025',
      metric: '🚀 99.98% Uptime SLA',
      summary: 'Collaborative project execution workspace with real-time sync, customizable sprint boards, and velocity metrics.',
      image: 'assets/images/project-task-flow.jpg',
      tags: ['Vue 3', 'Node.js', 'Express', 'PostgreSQL', 'Socket.io', 'Redis'],
      overview: 'OrbitFlow brings agile development teams together through instantaneous status synchronization, smart dependency tracking, automated WIP limit alerts, and velocity charts.',
      features: [
        'Zero-latency multiplayer cursor and board synchronization',
        'Automated burndown calculation and sprint forecasting',
        'Integrated Markdown specs, checklist hierarchy, and file attachments',
        'Granular notifications and GitHub pull request webhooks integration'
      ],
      demoUrl: 'https://orbitflow-app.vercel.app',
      githubUrl: 'https://github.com/jananimanivel/orbitflow'
    },
    {
      id: 'aura-luxury-ecommerce',
      title: 'Aura Minimalist E-Commerce Platform',
      category: 'frontend',
      date: '2025',
      metric: '✨ 98+ PageSpeed Score',
      summary: 'Ultra-fast headless commerce storefront with dynamic cart drawer, optimistic UI updates, and frictionless checkout.',
      image: 'assets/images/project-ecommerce.jpg',
      tags: ['React', 'CSS Modules', 'Stripe API', 'GraphQL', 'Vite', 'Supabase'],
      overview: 'Aura is a luxury lifestyle storefront crafted with obsessive attention to micro-interactions, silky smooth page transitions, and sub-second page loads to maximize conversion rates.',
      features: [
        'Instantaneous client-side filtering by attributes, price, and category',
        'Optimistic slide-out cart drawer with real-time stock verification',
        'Seamless end-to-end checkout with Stripe Elements & Webhooks',
        'Full accessibility compliance (WCAG AAA) and keyboard navigation'
      ],
      demoUrl: 'https://aura-storefront.vercel.app',
      githubUrl: 'https://github.com/jananimanivel/aura-ecommerce'
    }
  ];

  // ==========================================================================
  // DOM Elements
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  const navMenu = document.getElementById('nav-menu');
  const mobileToggle = document.getElementById('mobile-toggle');
  const themeToggle = document.getElementById('theme-toggle');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectSearchInput = document.getElementById('project-search');
  const projectsGrid = document.getElementById('projects-grid');
  const noResultsEl = document.getElementById('no-results');
  const backToTopBtn = document.getElementById('back-to-top');
  const contactForm = document.getElementById('contact-form');
  const toastContainer = document.getElementById('toast-container');

  // Modal elements
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImage = document.getElementById('modal-image');
  const modalBadge = document.getElementById('modal-badge');
  const modalMetric = document.getElementById('modal-metric');
  const modalTitle = document.getElementById('modal-title');
  const modalOverview = document.getElementById('modal-overview');
  const modalFeaturesList = document.getElementById('modal-features-list');
  const modalTechTags = document.getElementById('modal-tech-tags');
  const modalDemoBtn = document.getElementById('modal-demo-btn');
  const modalGithubBtn = document.getElementById('modal-github-btn');

  // ==========================================================================
  // Theme Toggle (Dark / Light)
  // ==========================================================================
  const savedTheme = localStorage.getItem('janani-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('janani-theme', newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} theme`);
    });
  }

  // ==========================================================================
  // Mobile Navigation Menu
  // ==========================================================================
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking navigation link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // ==========================================================================
  // Scroll Navbar & Back To Top
  // ==========================================================================
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Navbar glass effect
    if (scrollPos > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top visibility
    if (scrollPos > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Active link highlighting
    highlightActiveNavLink();
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }

  // ==========================================================================
  // Projects Filtering & Searching
  // ==========================================================================
  let activeFilter = 'all';
  let searchQuery = '';

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter') || 'all';
      filterProjects();
    });
  });

  if (projectSearchInput) {
    projectSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterProjects();
    });
  }

  function filterProjects() {
    const cards = document.querySelectorAll('.project-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const category = card.getAttribute('data-category');
      const title = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.project-desc')?.textContent.toLowerCase() || '';
      const tags = Array.from(card.querySelectorAll('.project-tag')).map(t => t.textContent.toLowerCase()).join(' ');

      const matchesFilter = activeFilter === 'all' || category === activeFilter;
      const matchesSearch = !searchQuery || title.includes(searchQuery) || desc.includes(searchQuery) || tags.includes(searchQuery);

      if (matchesFilter && matchesSearch) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (noResultsEl) {
      if (visibleCount === 0) {
        noResultsEl.classList.add('visible');
      } else {
        noResultsEl.classList.remove('visible');
      }
    }
  }

  // ==========================================================================
  // Project Details Modal
  // ==========================================================================
  document.addEventListener('click', (e) => {
    const detailsBtn = e.target.closest('[data-modal-target]');
    if (detailsBtn) {
      const projectId = detailsBtn.getAttribute('data-modal-target');
      const project = projectsData.find(p => p.id === projectId);
      if (project) {
        openModal(project);
      }
    }
  });

  function openModal(project) {
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalBadge.textContent = project.category.toUpperCase();
    modalMetric.textContent = project.metric;
    modalTitle.textContent = project.title;
    modalOverview.textContent = project.overview;

    // Populate features
    modalFeaturesList.innerHTML = project.features.map(f => `<li>${f}</li>`).join('');

    // Populate tech tags
    modalTechTags.innerHTML = project.tags.map(t => `<span class="project-tag">${t}</span>`).join('');

    // Action links
    modalDemoBtn.href = project.demoUrl;
    modalGithubBtn.href = project.githubUrl;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // ==========================================================================
  // Contact Form Submission (Mock with realistic feedback)
  // ==========================================================================
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const name = document.getElementById('name').value;
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Message...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        showToast(`Thank you, ${name}! Your message has been received.`);
      }, 900);
    });
  }

  // ==========================================================================
  // Toast Helper
  // ==========================================================================
  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast toast-success';
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#10b981">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // ==========================================================================
  // Number Counter Animation for About Section Stats
  // ==========================================================================
  const counters = document.querySelectorAll('.stat-number[data-count]');
  let counted = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-count');
          const suffix = counter.getAttribute('data-suffix') || '';
          let count = 0;
          const speed = target / 35;

          const updateCount = () => {
            count += speed;
            if (count < target) {
              counter.innerText = Math.ceil(count) + suffix;
              requestAnimationFrame(updateCount);
            } else {
              counter.innerText = target + suffix;
            }
          };
          updateCount();
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.about-stats-panel');
  if (statsSection) {
    observer.observe(statsSection);
  }
});
