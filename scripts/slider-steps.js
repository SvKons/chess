document.addEventListener('DOMContentLoaded', function () {
    const steps = document.querySelector('.stage__steps');
    const prevButton = document.querySelector('.stage__button__prev');
    const nextButton = document.querySelector('.stage__button__next');
    const dots = document.querySelectorAll('.stage__dot');

    let currentStep = 1;

    function showStep(stepNumber) {
        for (let step of steps.children) {
            step.classList.remove('active');
        }

        steps.classList.remove('active-1', 'active-2', 'active-3', 'active-4', 'active-5');
        steps.classList.add(`active-${stepNumber}`);

        for (let dot of dots) {
            dot.classList.remove('stage__dot__active');
        }
        dots[stepNumber - 1].classList.add('stage__dot__active');

        if (stepNumber === 1) {
            prevButton.disabled = true;
        } else {
            prevButton.disabled = false;
        }

        if (stepNumber === 5) {
            nextButton.disabled = true;
        } else {
            nextButton.disabled = false;
        }

        currentStep = stepNumber;
    }

    showStep(1);

    prevButton.addEventListener('click', function () {
        if (currentStep > 1) {
            showStep(currentStep - 1);
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentStep < 5) {
            showStep(currentStep + 1);
        }
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            showStep(index + 1);
        });
    });
});
