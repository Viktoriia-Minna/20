const gallery = document.querySelector('.gallery');
const images = Array.from(document.querySelectorAll('.gallery .image'));
const fullImageContainer = document.getElementById('fullImageContainer');
const fullImage = document.getElementById('fullImage');
let activeIndex = 0;

function setActiveImage(index) {
  if (index < 0 || index >= images.length) {
    return;
  }

  images[activeIndex].classList.remove('active');
  activeIndex = index;
  const currentImage = images[activeIndex];
  currentImage.classList.add('active');
  currentImage.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

function showFullImage(src, alt) {
  fullImage.src = src;
  fullImage.alt = alt;
  fullImageContainer.classList.add('visible');
}

function hideFullImage() {
  fullImageContainer.classList.remove('visible');
  fullImage.src = '';
}

images.forEach((image, index) => {
  image.addEventListener('click', () => {
    setActiveImage(index);
    showFullImage(image.src, image.alt);
  });
});

gallery.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    setActiveImage(activeIndex + 1);
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    setActiveImage(activeIndex - 1);
  }
});

fullImageContainer.addEventListener('click', event => {
  if (event.target === fullImageContainer) {
    hideFullImage();
  }
});

fullImageContainer.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    hideFullImage();
  }
});

gallery.addEventListener('focus', () => {
  gallery.classList.add('focused');
});

gallery.addEventListener('blur', () => {
  gallery.classList.remove('focused');
});

function showFullImage(src, alt) {
  fullImage.src = src;
  fullImage.alt = alt;
  fullImageContainer.classList.add('visible');
  fullImageContainer.focus();
}

function hideFullImage() {
  fullImageContainer.classList.remove('visible');
  fullImage.src = '';
  gallery.focus();
}


// Initialize the first image as active
setActiveImage(0);

document.addEventListener('DOMContentLoaded', () => {
  const renderBtn = document.querySelector('button[data-action="render"]');
  const destroyBtn = document.querySelector('button[data-action="destroy"]');
  const amountInput = document.getElementById('box-count');
  const boxesContainer = document.getElementById('boxes');

  function getRandomRgb() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function createBoxes(amount) {
    const boxes = [];
    let size = 30;

    for (let i = 0; i < amount; i += 1) {
      const box = document.createElement('div');
      box.classList.add('box');
      box.style.width = `${size}px`;
      box.style.height = `${size}px`;
      box.style.backgroundColor = getRandomRgb();
      box.textContent = i + 1;
      boxes.push(box);
      size += 10;
    }

    boxesContainer.append(...boxes);
  }

  function destroyBoxes() {
    boxesContainer.innerHTML = '';
  }

  renderBtn.addEventListener('click', () => {
    const amount = Number(amountInput.value);
    if (!Number.isInteger(amount) || amount <= 0) {
      alert('Введіть позитивне ціле число.');
      return;
    }

    destroyBoxes();
    createBoxes(amount);
  });

  destroyBtn.addEventListener('click', () => {
    destroyBoxes();
    amountInput.value = '';
  });
});
