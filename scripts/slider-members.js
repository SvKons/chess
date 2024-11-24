const membersList = document.querySelector('.members__list');
const prevButton = document.querySelector('.members__button__prev');
const nextButton = document.querySelector('.members__button__next');
const prevButtonMobile = document.querySelector('.members__button__prev-mobile');
const nextButtonMobile = document.querySelector('.members__button__next-mobile');
const pageTextDesktop = document.querySelector('.members__page__desktop');
const pageTextMobile = document.querySelector('.members__page__mobile');

let currentIndex = 0;
let itemsPerPage = 3;
const totalItems = membersList.children.length;
let intervalId;

function updatePage() {
    Array.from(membersList.children).forEach((item, index) => {
        if (window.innerWidth <= 768) {
            // mobile version
            if (index === currentIndex) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        } else {
            // desktop version
            if (index >= currentIndex && index < currentIndex + itemsPerPage) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        }
    });

    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex + itemsPerPage >= totalItems;
    prevButtonMobile.disabled = currentIndex === 0;
    nextButtonMobile.disabled = currentIndex + 1 >= totalItems;

    if (window.innerWidth <= 768) {
        // mobile version
        pageTextMobile.textContent = `${currentIndex + 1}/${totalItems}`;
    } else {
        // desktop version
        pageTextDesktop.textContent = `${itemsPerPage}/${totalItems}`;
    }
}

function nextSlide() {
    if (currentIndex + 1 < totalItems) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updatePage();
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalItems - 1;
    }
    updatePage();
}

prevButton.addEventListener('click', () => {
    prevSlide();
    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 4000);
});

nextButton.addEventListener('click', () => {
    nextSlide();
    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 4000);
});

prevButtonMobile.addEventListener('click', () => {
    prevSlide();
    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 4000);
});

nextButtonMobile.addEventListener('click', () => {
    nextSlide();
    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 4000);
});

window.addEventListener('resize', () => {
    itemsPerPage = window.innerWidth <= 768 ? 1 : 3;
    updatePage();
    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 4000);
});

updatePage();
intervalId = setInterval(nextSlide, 4000);
