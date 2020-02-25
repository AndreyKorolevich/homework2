function chooseAnswer (event) {
    const container = event.currentTarget;
    const image = container.lastElementChild;
    image.setAttribute('src', 'images/checked.png');
    container.removeEventListener('click', chooseAnswer);
}

const boxes = document.getElementsByClassName('card');
for (const box of boxes) {
    box.addEventListener('click', chooseAnswer);
}


