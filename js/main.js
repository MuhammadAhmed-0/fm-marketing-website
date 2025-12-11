// FM Marketing Real Estate Website - Main JavaScript

// ===============================
// Mobile Menu + Dropdown Handling
// ===============================
document.addEventListener('DOMContentLoaded', function () {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const dropdown = document.querySelector('.dropdown');
  const dropdownToggle = document.querySelector('.dropdown-toggle');

  // Mobile Menu Toggle (☰ / ✕)
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      this.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
    });
  }

  // Close mobile menu when clicking any link (except dropdown toggle)
  if (navLinks.length > 0) {
    navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        // Do not close menu if clicking the "Projects" dropdown toggle
        if (link.classList.contains('dropdown-toggle')) {
          e.preventDefault();
          return;
        }

        // Otherwise, close menu normally on small screens
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('active');
          if (mobileToggle) mobileToggle.innerHTML = '☰';
        }
      });
    });
  }

  // Mobile Dropdown Toggle (Projects ▼)
  if (dropdown && dropdownToggle) {
    dropdownToggle.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle('open');
      }
    });
  }
});


// ===============================
// Navbar Scroll Effect
// ===============================
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

// ===============================
// Smooth Scrolling
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===============================
// Set Active Navigation Link
// ===============================
function setActiveLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (
      link.getAttribute('href') === currentPath ||
      (currentPath.includes('projects') &&
        link.getAttribute('href').includes('projects'))
    ) {
      link.classList.add('active');
    }
    if (currentPath === '/' && link.getAttribute('href') === '/') {
      link.classList.add('active');
    }
  });
}
window.addEventListener('load', setActiveLink);

// ===============================
// Statistics Counter Animation
// ===============================
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target.toLocaleString() + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start).toLocaleString() + '+';
    }
  }, 16);
}

// Intersection Observer for Counters
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      const target = parseInt(entry.target.dataset.target);
      animateCounter(entry.target, target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(stat => observer.observe(stat));
});

// ===============================
// Image Gallery Lightbox
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', function () {
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      `;

      const img = document.createElement('img');
      img.src = this.src;
      img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
      `;

      overlay.appendChild(img);
      document.body.appendChild(overlay);

      overlay.addEventListener('click', () => {
        document.body.removeChild(overlay);
      });
    });
  });
});

// ===============================
// Form Validation (Basic)
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const inputs = this.querySelectorAll('input[required], textarea[required]');
      let isValid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#ff0000';
        } else {
          input.style.borderColor = '#D4AF37';
        }
      });

      if (isValid) {
        alert('Thank you for your inquiry! We will contact you soon.');
        this.reset();
      } else {
        alert('Please fill in all required fields.');
      }
    });
  });
});

// ===============================
// Scroll Reveal Animation
// ===============================
function reveal() {
  const reveals = document.querySelectorAll('.fade-in-up');

  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.project-card, .service-card, .stat-card');
  fadeElements.forEach(el => {
    el.classList.add('fade-in-up');
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
  });
});

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// ===============================
// Video Background Fallback
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.hero-video');
  if (video) {
    video.addEventListener('error', function () {
      const hero = document.querySelector('.hero');
      if (hero) {
        hero.style.backgroundImage = 'url(/images/luxury_modern_real_e_193f3026.jpg)';
        hero.style.backgroundSize = 'cover';
        hero.style.backgroundPosition = 'center';
      }
      this.style.display = 'none';
    });
  }
});
