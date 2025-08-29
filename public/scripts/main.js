// Ultra-fast JavaScript - Performance Optimized

(function() {
  'use strict';

  // DOM elements cache
  const elements = {};
  let isInitialized = false;

  // Performance tracking
  const performance = {
    start: Date.now(),
    marks: {}
  };

  function mark(name) {
    performance.marks[name] = Date.now() - performance.start;
  }

  // Initialize immediately for fastest load
  function init() {
    if (isInitialized) return;
    isInitialized = true;
    
    mark('init_start');
    cacheElements();
    setupNavigation();
    setupThemeToggle();
    setupScrollEffects();
    setupFormHandling();
    hideLoadingScreen();
    mark('init_complete');
    
    // Log performance in dev mode
    if (window.location.hostname === 'localhost') {
      console.log('Performance marks:', performance.marks);
    }
  }

  // Cache DOM elements once for performance
  function cacheElements() {
    elements.loading = document.getElementById('loading');
    elements.header = document.querySelector('.header');
    elements.navToggle = document.getElementById('navToggle');
    elements.navMenu = document.querySelector('.nav-menu');
    elements.contactForm = document.getElementById('contactForm');
    elements.themeToggle = document.getElementById('themeToggle');
    elements.navLinks = document.querySelectorAll('.nav-link');
  }

  // Lightweight navigation with smooth scrolling
  function setupNavigation() {
    // Mobile menu toggle
    if (elements.navToggle && elements.navMenu) {
      elements.navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Smooth scroll for navigation links
    elements.navLinks.forEach(link => {
      if (link.getAttribute('href').startsWith('#')) {
        link.addEventListener('click', handleSmoothScroll);
      }
    });

    // Header scroll effect
    if (elements.header) {
      let ticking = false;
      window.addEventListener('scroll', function() {
        if (!ticking) {
          requestAnimationFrame(updateHeaderOnScroll);
          ticking = true;
        }
      }, { passive: true });
    }
  }

  function toggleMobileMenu() {
    if (elements.navMenu) {
      elements.navMenu.classList.toggle('active');
      elements.navToggle.classList.toggle('active');
      document.body.style.overflow = elements.navMenu.classList.contains('active') ? 'hidden' : '';
    }
  }

  function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    
    if (target) {
      const headerHeight = elements.header ? elements.header.offsetHeight : 80;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (elements.navMenu && elements.navMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    }
  }

  function updateHeaderOnScroll() {
    if (elements.header) {
      const scrolled = window.pageYOffset > 10;
      elements.header.classList.toggle('scrolled', scrolled);
    }
  }

  // Theme toggle functionality
  function setupThemeToggle() {
    if (!elements.themeToggle) return;

    // Load saved theme or fall back to system preference, defaulting to light
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);

    elements.themeToggle.addEventListener('click', toggleTheme);
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Icon visibility is handled purely by CSS using [data-theme]
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  // Minimal scroll effects for performance
  function setupScrollEffects() {
    // Only add scroll effects if user prefers motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Intersection Observer for efficient scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe cards and sections for fade-in effect
    const animateElements = document.querySelectorAll('.service-card, .work-item, .process-step');
    animateElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // Form handling with validation
  function setupFormHandling() {
    if (!elements.contactForm) return;

    elements.contactForm.addEventListener('submit', handleFormSubmit);
    
    // Real-time validation
    const inputs = elements.contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', validateInput);
      input.addEventListener('input', clearValidationError);
    });
  }

  function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error
    clearValidationError(e);

    if (input.required && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    } else if (input.type === 'email' && value && !isValidEmail(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }

    if (!isValid) {
      showValidationError(input, errorMessage);
    }

    return isValid;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showValidationError(input, message) {
    input.style.borderColor = '#dc3545';
    
    let errorEl = input.parentNode.querySelector('.error-message');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'error-message';
      errorEl.style.cssText = 'color: #dc3545; font-size: 0.875rem; margin-top: 0.25rem;';
      input.parentNode.appendChild(errorEl);
    }
    errorEl.textContent = message;
  }

  function clearValidationError(e) {
    const input = e.target;
    input.style.borderColor = '';
    
    const errorEl = input.parentNode.querySelector('.error-message');
    if (errorEl) {
      errorEl.remove();
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(elements.contactForm);
    const requiredInputs = elements.contactForm.querySelectorAll('[required]');
    let isFormValid = true;

    // Validate all required fields
    requiredInputs.forEach(input => {
      if (!validateInput({ target: input })) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      showNotification('Please fix the errors below', 'error');
      return;
    }

    // Submit form
    const submitBtn = elements.contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    
    try {
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Make actual API call to Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        elements.contactForm.reset();
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
      
    } catch (error) {
      showNotification('Failed to send message. Please try again.', 'error');
      console.error('Form submission error:', error);
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  function showNotification(message, type) {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#28a745' : '#dc3545'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      font-weight: 500;
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(0)';
    });

    // Auto remove
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }

  function hideLoadingScreen() {
    if (elements.loading) {
      // Small delay to show loading briefly
      setTimeout(() => {
        elements.loading.classList.add('hide');
        setTimeout(() => {
          elements.loading.style.display = 'none';
        }, 500);
      }, 300);
    }
  }

  // Utility functions
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Keyboard navigation support
  document.addEventListener('keydown', function(e) {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && elements.navMenu && elements.navMenu.classList.contains('active')) {
      toggleMobileMenu();
    }
  });

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Handle page visibility for performance
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      // Page is hidden, pause any heavy operations
      mark('page_hidden');
    } else {
      // Page is visible again
      mark('page_visible');
    }
  });

  // Expose minimal API for debugging
  if (window.location.hostname === 'localhost') {
    window.StaticPages = {
      performance,
      elements,
      toggleMobileMenu
    };
  }

})();