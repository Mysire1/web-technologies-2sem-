document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const countrySelect = document.getElementById('country');
    const citySelect = document.getElementById('city');
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');

    let isFormValidGlobal;

    const citiesByCountry = {
        Ukraine: ['Київ', 'Львів', 'Одеса', 'Харків', 'Чернівці'],
        Germany: ['Берлін', 'Гамбург', 'Мюнхен', 'Аугсбург']
    };

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            const targetTab = document.getElementById(button.dataset.tab);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });

    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const inputId = icon.dataset.input;
            const input = document.getElementById(inputId);
            if (input) {
                input.type = input.type === 'password' ? 'text' : 'password';
                icon.innerHTML = input.type === 'password' ? '&#128065;' : '&#128064;';
            }
        });
    });

    if (countrySelect) {
        countrySelect.addEventListener('change', function () {
            citySelect.innerHTML = '<option value="" disabled selected>Спочатку оберіть країну</option>';
            const cities = citiesByCountry[this.value] || [];
            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
            citySelect.disabled = !cities.length;
            validateField(citySelect, citySelect.disabled || citySelect.value, "Оберіть місто");
        });
    }

    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.startsWith('380') && value.length > 3) {
                value = '+' + value;
            } else if (value.length > 0) {
                value = '+380' + value.substring(3);
            }
            if (value.length > 0 && !value.startsWith('+380')) {
                if (value.startsWith('+') && value.length >1) {
                } else if (!value.startsWith('+') && value.length <=9) {
                    value = '+380' + value;
                }
            } else if (value === "3" || value === "38" || value === "380") {
                value = "+" + value;
            }
            e.target.value = value.substring(0, 13);
        });
    }

    function validateField(input, condition, errorMessage) {
        const formGroup = input.closest('.form-group');
        const small = formGroup ? formGroup.querySelector('.error-text') : null;
        if (!small && input.name === 'sex') {
            let small = document.getElementById('sexError');
        }

        if (condition) {
            input.classList.add('valid');
            input.classList.remove('invalid');
            if (small) small.textContent = '';
            return true;
        } else {
            input.classList.add('invalid');
            input.classList.remove('valid');
            if (small) small.textContent = errorMessage;
            return false;
        }
    }

    function validateRadioGroup(name, errorMessage) {
        const radios = document.querySelectorAll(`input[name="${name}"]`);
        const isSelected = Array.from(radios).some(radio => radio.checked);
        const errorElement = document.getElementById(`${name}Error`);

        radios.forEach(radio => {
            if (isSelected) {
                radio.classList.remove('invalid');
            } else {
                radio.classList.add('invalid');
                radio.classList.remove('valid');
            }
        });

        if (errorElement) {
            errorElement.textContent = isSelected ? '' : errorMessage;
        }
        return isSelected;
    }

    function showFormMessage(containerId, message, isSuccess = true) {
        const container = document.getElementById(containerId);
        if (container) {
            container.textContent = message;
            container.className = 'form-message-container ' + (isSuccess ? 'success' : 'error');
            setTimeout(() => {
                container.textContent = '';
                container.className = 'form-message-container';
            }, 3000);
        }
    }

    function clearFormValidation(form) {
        form.querySelectorAll('input, select').forEach(el => {
            el.classList.remove('valid', 'invalid');
            const formGroup = el.closest('.form-group');
            const small = formGroup ? formGroup.querySelector('.error-text') : null;
            if (small) small.textContent = '';
        });
        const sexError = document.getElementById('sexError');
        if(sexError) sexError.textContent = '';

        const radioButtons = form.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(rb => rb.classList.remove('invalid', 'valid'));
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            isFormValidGlobal = true;

            isFormValidGlobal &= validateField(this.firstName, this.firstName.value.trim().length >= 3 && this.firstName.value.trim().length <= 15, "Ім'я: 3-15 символів.");
            isFormValidGlobal &= validateField(this.lastName, this.lastName.value.trim().length >= 3 && this.lastName.value.trim().length <= 15, "Прізвище: 3-15 символів.");
            isFormValidGlobal &= validateField(this.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.value.trim()), "Невірний формат email.");
            isFormValidGlobal &= validateField(this.password, this.password.value.length >= 6, "Пароль: мінімум 6 символів.");
            isFormValidGlobal &= validateField(this.confirmPassword, this.confirmPassword.value === this.password.value && this.confirmPassword.value.length > 0, "Паролі не співпадають або поле порожнє.");
            if (this.password.value.length >= 6 && this.confirmPassword.value.length > 0 && this.confirmPassword.value !== this.password.value){
                validateField(this.confirmPassword, false, "Паролі не співпадають.");
            }
            isFormValidGlobal &= validateField(this.phone, /^\+380\d{9}$/.test(this.phone.value.trim()), "Телефон: формат +380xxxxxxxxx.");

            const birthDateVal = this.birthDate.value;
            let birthDateValid = false;
            if (!birthDateVal) {
                isFormValidGlobal &= validateField(this.birthDate, false, "Вкажіть дату народження.");
            } else {
                const birthD = new Date(birthDateVal);
                const today = new Date(); today.setHours(0,0,0,0);
                if (birthD >= today) {
                    isFormValidGlobal &= validateField(this.birthDate, false, "Дата не може бути в майбутньому.");
                } else {
                    let age = today.getFullYear() - birthD.getFullYear();
                    const m = today.getMonth() - birthD.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < birthD.getDate())) age--;
                    if (age < 12) {
                        isFormValidGlobal &= validateField(this.birthDate, false, "Вам має бути не менше 12 років.");
                    } else {
                        birthDateValid = true;
                        isFormValidGlobal &= validateField(this.birthDate, true, "");
                    }
                }
            }
            if(birthDateVal && birthDateValid) validateField(this.birthDate, true, "");

            isFormValidGlobal &= validateRadioGroup('sex', "Оберіть стать.");
            isFormValidGlobal &= validateField(this.country, this.country.value, "Оберіть країну.");
            isFormValidGlobal &= validateField(this.city, !this.city.disabled && this.city.value, "Оберіть місто.");

            if (isFormValidGlobal) {
                showFormMessage('registerMessageContainer', "Реєстрація успішна!", true);
                this.reset();
                clearFormValidation(this);
                citySelect.innerHTML = '<option value="" disabled selected>Спочатку оберіть країну</option>';
                citySelect.disabled = true;
            } else {
                showFormMessage('registerMessageContainer', "Будь ласка, виправте помилки в формі.", false);
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            isFormValidGlobal = true;

            isFormValidGlobal &= validateField(this.username, this.username.value.trim() !== "", "Введіть ім'я користувача.");
            isFormValidGlobal &= validateField(this.loginPassword, this.loginPassword.value.length >= 6, "Пароль: мінімум 6 символів.");

            if (isFormValidGlobal) {
                showFormMessage('loginMessageContainer',"Вхід успішний!", true);
                this.reset();
                clearFormValidation(this);
            } else {
                showFormMessage('loginMessageContainer',"Невірні дані для входу або помилки у формі.", false);
            }
        });
    }

    function addBlurListener(elementId, validationFn, ...args) {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener('blur', () => validationFn(element, ...args));
        }
    }

    if (registerForm) {
        addBlurListener('firstName', validateField, (el) => el.value.trim().length >= 3 && el.value.trim().length <= 15, "Ім'я: 3-15 символів.");
        addBlurListener('lastName', validateField, (el) => el.value.trim().length >= 3 && el.value.trim().length <= 15, "Прізвище: 3-15 символів.");
        addBlurListener('email', validateField, (el) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()), "Невірний формат email.");
        addBlurListener('password', validateField, (el) => el.value.length >= 6, "Пароль: мінімум 6 символів.");
        addBlurListener('confirmPassword', validateField, (el) => el.value === document.getElementById('password').value && el.value.length > 0, "Паролі не співпадають.");
        addBlurListener('phone', validateField, (el) => /^\+380\d{9}$/.test(el.value.trim()), "Телефон: формат +380xxxxxxxxx.");
        addBlurListener('birthDate', validateField, (el) => {
            if (!el.value) return false;
            const birthD = new Date(el.value); const today = new Date(); today.setHours(0,0,0,0);
            if (birthD >= today) return "Дата не може бути в майбутньому.";
            let age = today.getFullYear() - birthD.getFullYear(); const m = today.getMonth() - birthD.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthD.getDate())) age--;
            return age >= 12 ? true : "Вам має бути не менше 12 років.";
        }, "");

        document.querySelectorAll('input[name="sex"]').forEach(radio => {
            radio.addEventListener('change', () => validateRadioGroup('sex', "Оберіть стать."));
        });
        addBlurListener('country', validateField, (el) => el.value !== "", "Оберіть країну.");
        addBlurListener('city', validateField, (el) => !el.disabled && el.value !== "", "Оберіть місто.");
    }

    if (loginForm) {
        addBlurListener('username', validateField, (el) => el.value.trim() !== "", "Введіть ім'я користувача.");
        addBlurListener('loginPassword', validateField, (el) => el.value.length >= 6, "Пароль: мінімум 6 символів.");
    }

    const defaultActiveButton = document.querySelector('.tab-button.active');
    if (defaultActiveButton) {
        const targetTab = document.getElementById(defaultActiveButton.dataset.tab);
        if (targetTab) targetTab.classList.add('active');
    } else if (tabButtons.length > 0) {
        tabButtons[0].classList.add('active');
        const targetTab = document.getElementById(tabButtons[0].dataset.tab);
        if (targetTab) targetTab.classList.add('active');
    }
});