// --- Dark Mode Logic ---
const darkModeToggle = document.getElementById('darkModeToggle');
const htmlElement = document.documentElement;
const toggleBall = document.getElementById('toggleBall');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

function setTheme(isDark) {
    if (isDark) {
        htmlElement.classList.add('dark');
        toggleBall.style.transform = 'translateX(24px)';
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    } else {
        htmlElement.classList.remove('dark');
        toggleBall.style.transform = 'translateX(0)';
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialThemeIsDark = savedTheme === 'dark' || (savedTheme === null && prefersDark);
setTheme(initialThemeIsDark);
darkModeToggle.checked = initialThemeIsDark;

darkModeToggle.addEventListener('change', () => {
    setTheme(darkModeToggle.checked);
    localStorage.setItem('theme', darkModeToggle.checked ? 'dark' : 'light');
});

// --- Form Validation and Prank Logic ---
const prankForm = document.getElementById('prankForm');
const inputs = Array.from(prankForm.querySelectorAll('.form-input'));
const submitBtn = document.getElementById('submitBtn');
const ageInput = document.getElementById('age');
const ageError = document.getElementById('ageError');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const passwordError = document.getElementById('passwordError');

function validateForm() {
    const allFieldsFilled = inputs.every(input => input.value.trim() !== '');
    const passwordsMatch = passwordInput.value === confirmPasswordInput.value;

    if (passwordInput.value && confirmPasswordInput.value && !passwordsMatch) {
        passwordError.classList.remove('hidden');
    } else {
        passwordError.classList.add('hidden');
    }

    submitBtn.disabled = !(allFieldsFilled && passwordsMatch);
}

prankForm.addEventListener('input', validateForm);

prankForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (!submitBtn.disabled) {
        const age = ageInput.value;
        ageError.textContent = `Eorror! User with age ${age} is already registered.`;
        ageError.classList.remove('hidden');
    }
});

ageInput.addEventListener('input', function() {
    if (!ageError.classList.contains('hidden')) {
        ageError.classList.add('hidden');
    }
});

validateForm();
