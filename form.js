const form = document.querySelector('form');
const progressBar = document.getElementById('progress-bar-foreground');
const nextButton = document.getElementById('next-button');
const previousButton = document.getElementById('previous-button');
const submitButton = document.getElementById('submit-button');
const input = document.querySelector('input');
const label = document.querySelector('label');
const errorContainer = document.querySelector('#error-container');

let currentStep = 1;

function displayError(errorMessage) {
    input.style.outline = '1px solid red';
    errorContainer.innerHTML = errorMessage;
}

function clearError() {
    input.style.outline = 'revert';
    errorContainer.innerHTML = '';
    input.value = '';
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^\+?(\d{1,3})?[-. ]?\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/;
    return phoneRegex.test(phone);
}

function showStep(step) {
    switch (step) {
        case 1:
            input.setAttribute('type', 'text');
            input.setAttribute('id', 'name');
            label.setAttribute('for', 'name');
            label.innerHTML = 'Name:';
            progressBar.style.width = '30%';
            nextButton.style.display = 'inline';
            nextButton.style.width = '100%';
            previousButton.style.display = 'none';
            submitButton.style.display = 'none';
            break;
        case 2:
            input.setAttribute('type', 'email');
            input.setAttribute('id', 'email');
            label.setAttribute('for', 'email');
            label.innerHTML = 'Email:';
            progressBar.style.width = '60%';
            nextButton.style.width = '50%';
            nextButton.style.display = 'inline';
            previousButton.style.display = 'inline';
            submitButton.style.display = 'none';
            break;
        case 3:
            input.setAttribute('type', 'tel');
            input.setAttribute('id', 'phone');
            label.setAttribute('for', 'phone');
            label.innerHTML = 'Phone:';
            progressBar.style.width = '90%';
            previousButton.style.display = 'inline';
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline';
            break;
    }
}

function handleNextButtonClick() {
    if (input.value === '') {
        displayError('Field cannot be blank');
    } else if (currentStep === 2 && !validateEmail(input.value)) {
        displayError('Invalid email format. Please try again');
    } else {
        clearError();
        currentStep++;
        showStep(currentStep);
    }
}

function handlePreviousButtonClick() {
    clearError();
    currentStep--;
    showStep(currentStep);
}

function handleSubmitButtonClick(e) {
    if (input.value === '') {
        if (e !== null) {
            e.preventDefault();
        }
        displayError('Field cannot be blank');
    } else if (currentStep === 3 && !validatePhone(input.value)) {
        if (e !== null) {
            e.preventDefault();
        }
        displayError('Invalid phone number format. Please try again');
    } else {
        form.innerHTML = `<h1>Done!<br>Thanks for signing up</h1>`;
    }
}

form.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && currentStep !== 3) {
      e.preventDefault();
      handleNextButtonClick(e);
    } else if (e.key === 'Enter' && currentStep === 3) {
        e.preventDefault();
        handleSubmitButtonClick(e);
    }
  });

nextButton.addEventListener('click', handleNextButtonClick);
previousButton.addEventListener('click', handlePreviousButtonClick);
submitButton.addEventListener('click', handleSubmitButtonClick);

// Initial setup
showStep(currentStep);