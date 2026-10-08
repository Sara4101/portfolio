const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const applyTheme = (theme) => {
  body.setAttribute('data-theme', theme);
  const isDark = theme === 'dark';
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
};

themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
});

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    const selectedFilter = button.dataset.filter;

    projectCards.forEach((card) => {
      const matches = selectedFilter === 'all' || card.dataset.category === selectedFilter;
      card.classList.toggle('hidden', !matches);
    });
  });
});

const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

const showError = (fieldName, message) => {
  const errorField = document.querySelector(`[data-error-for="${fieldName}"]`);
  if (errorField) {
    errorField.textContent = message;
  }
};

const clearErrors = () => {
  document.querySelectorAll('.error-message').forEach((element) => {
    element.textContent = '';
  });
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearErrors();
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  const formData = new FormData(form);
  const name = (formData.get('name') || '').toString().trim();
  const email = (formData.get('email') || '').toString().trim();
  const subject = (formData.get('subject') || '').toString().trim();
  const message = (formData.get('message') || '').toString().trim();

  let hasError = false;

  if (name.length < 2) {
    showError('name', 'Please enter your full name.');
    hasError = true;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showError('email', 'Please enter a valid email address.');
    hasError = true;
  }

  if (subject.length < 3) {
    showError('subject', 'Subject must be at least 3 characters long.');
    hasError = true;
  }

  if (message.length < 10) {
    showError('message', 'Message must be at least 10 characters long.');
    hasError = true;
  }

  if (hasError) {
    formStatus.textContent = 'Please fix the highlighted fields.';
    formStatus.classList.add('error');
    return;
  }

  formStatus.textContent = 'Your message has been sent successfully!';
  formStatus.classList.add('success');
  form.reset();
});

applyTheme('light');
