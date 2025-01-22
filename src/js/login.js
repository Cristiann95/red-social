document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const showHideButton = document.getElementById('show-hide');

    loginForm.addEventListener('submit', function (evento) {
        evento.preventDefault();
        validateForm();
    });

    emailInput.addEventListener('blur', function () {
        validateEmail()
    });

    passwordInput.addEventListener('blur', function () {
        validatePassword();
    })

    emailInput.addEventListener('change', function () {
        clearError(emailError);
    });

    passwordInput.addEventListener('change', function () {
        clearError(passwordError);

    });

    confirmPasswordInput.addEventListener('change', function () {
        clearError(confirmPasswordError);

    });

    showHideButton.addEventListener('click', function () {
        if (passwordInput.type == 'password') {
            passwordInput.type = 'text';
            confirmPasswordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
            confirmPasswordInput.type = 'password';
        }
    })

    function validateForm() {
        const isValidateName = validateName()
        const isValidEmail = validateEmail();
        const isValidPassword = validatePassword();
        const passwordMatch = validatePasswordMatch();

        if (isValidateName && isValidEmail && isValidPassword && passwordMatch) {
            saveToLocalStorage();
            window.location.href = 'src/html/redSocial.html';
        }
    }

    function validateName() {
        const nameValue = nameInput.value.trim()
        if (nameValue.length == '') {
            showError(nameError, 'Este campo es obligatorio');
            return false;
        }
        return true;
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValue = emailInput.value.trim()
        if (!emailRegex.test(emailValue)) {
            showError(emailError, "Ingresa un email válido");
            return false
        };
        return true;
    };

    function validatePassword() {
        const passwordValue = passwordInput.value.trim();
        const regexMayusculas = /[a-zA-Z]\w/g;

        if (!(passwordValue.length > 6 && passwordValue.match(regexMayusculas))) {
            showError(passwordError, "La contraseña debe tener al menos 6 caractéres, una mayúscula y un símbolo");
            return false;
        }
        return true;
    };

    function validatePasswordMatch() {
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value.trim();

        if (passwordValue != confirmPasswordValue) {
            showError(confirmPasswordError, "Las contraseñas no coinciden");
            return false;
        }
        return true;
    };

    function showError(errorElement, message) {
        errorElement.innerHTML = message;
        errorElement.style.display = 'block';
    }

    function clearError(errorElement) {
        errorElement.innerHTML = '';
        errorElement.style.display = 'none';
    }

    function saveToLocalStorage() {
        const emailValue = emailInput.value.trim();
        const nameValue = nameInput.value.trim();
        window.localStorage.setItem('name', nameValue);
        localStorage.setItem('email', emailValue);
        const body = bodyBuilderJSON();
        console.log(body);
    }

    function bodyBuilderJSON() {
        return {
            "name": nameInput.value,
            "email": emailInput.value,
            "password": passwordInput.value
        }
    }
})


const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
    })
}







