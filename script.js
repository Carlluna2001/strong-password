const passwordInput = document.getElementById('inp');
const eyeBtn = document.getElementById('eye-btn');
const strengthStatus = document.getElementById('strength-status');
const strengthIcon = document.getElementById('strength-icon');
const rangeStatus = document.querySelector('.range-status');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

const requirements = {
  chars: document.getElementById('chars'),
  'A-Z': document.getElementById('A-Z'),
  'a-z': document.getElementById('a-z'),
  numbers: document.getElementById('numbers'),
  special: document.getElementById('special')
};

const updateRequirements = (value) => {
  const checks = [
    { key: 'chars', valid: value.length >= 8 },
    { key: 'A-Z', valid: /[A-Z]/.test(value) },
    { key: 'a-z', valid: /[a-z]/.test(value) },
    { key: 'numbers', valid: /\d/.test(value) },
    { key: 'special', valid: /[^A-Za-z0-9]/.test(value) }
  ];

  checks.forEach(({ key, valid }) => {
    const item = requirements[key];
    if (!item) return;
    item.classList.toggle('valid', valid);
  });

  const score = checks.filter(({ valid }) => valid).length;
  let label = 'Weak';
  let color = '#ef4444';
  let iconClass = 'ri-shield-line';
  let width = 20;

  if (score === 5) {
    label = 'Strong';
    color = '#22c55e';
    iconClass = 'ri-shield-check-fill';
    width = 100;
  } else if (score >= 4) {
    label = 'Good';
    color = '#3b82f6';
    iconClass = 'ri-shield-check-line';
    width = 80;
  } else if (score >= 3) {
    label = 'Medium';
    color = '#f59e0b';
    iconClass = 'ri-shield-flash-line';
    width = 60;
  } else if (score >= 2) {
    label = 'Fair';
    color = '#f97316';
    iconClass = 'ri-shield-star-line';
    width = 40;
  }

  strengthStatus.textContent = label;
  strengthStatus.style.color = color;
  strengthIcon.innerHTML = `<i class="${iconClass}"></i>`;
  strengthIcon.style.color = color;
  rangeStatus.style.width = `${width}%`;
  rangeStatus.style.background = `linear-gradient(90deg, ${color}, #a78bfa)`;
};

const togglePasswordVisibility = () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  eyeBtn.innerHTML = isPassword
    ? '<i class="ri-eye-off-line"></i>'
    : '<i class="ri-eye-line"></i>';
  eyeBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
};

const applyTheme = (isLight) => {
  document.body.classList.toggle('light-theme', isLight);
  themeToggle.classList.toggle('light', isLight);
  themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  themeIcon.className = isLight ? 'ri-sun-fill' : 'ri-moon-line';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
};

const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  const prefersLight = savedTheme ? savedTheme === 'light' : window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(prefersLight);
};

passwordInput.addEventListener('input', (event) => {
  updateRequirements(event.target.value);
});

eyeBtn.addEventListener('click', togglePasswordVisibility);
themeToggle.addEventListener('click', () => {
  applyTheme(!document.body.classList.contains('light-theme'));
});

initializeTheme();
updateRequirements('');
