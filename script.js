const notes = document.querySelectorAll('.note');
const previewScreen = document.querySelector('.preview');
const closePreviewBtn = document.querySelector('.btn-close-modal');
const headerCategories = document.querySelectorAll('header .category');
const noteTags = document.querySelectorAll('.preview .category');

const previewScreenHeading = previewScreen.querySelector('.heading');
const previewScreenImages = previewScreen.querySelectorAll('img');
const previewImgContainer = previewScreen.querySelector('.images');
const previewScreenText = previewScreen.querySelector('.noteMessage');

// function isInViewport(element) {
//     const rect = element.getBoundingClientRect();
//     return (
//         rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
//         rect.bottom >= 0
//     );
// }

function clearPreviewImages() {
    while (previewImgContainer.firstChild)
        previewImgContainer.removeChild(previewImgContainer.firstChild);
}

function toggleClass(element, className) {
    element.classList.toggle(className);
}

function removeClassFromALlElements(nodeList, className) {
    nodeList.forEach(node => {
        node.classList.remove(className);
    })
}

function addTags(tags) {
    tags.forEach(tag => {
        noteTags.forEach(notetag => {
            if (tag.textContent == notetag.textContent) {
                removeClassFromALlElements(noteTags, 'active');
                notetag.classList.add('active');
            }
        })
    })
}

function showPreviewScreen(note) {
    previewScreen.classList.add('active');
    clearPreviewImages();
    const noteHeading = note.querySelector('h2').textContent;
    const images = note.querySelectorAll('img');
    images.forEach(image => {
        const newPreviewScreenImg = document.createElement('img');
        newPreviewScreenImg.src = image.src;
        previewImgContainer.appendChild(newPreviewScreenImg);
    })
    previewScreenHeading.textContent = noteHeading;
    const noteMessage = note.querySelector('p').textContent; // reminder to change class name later
    previewScreenText.textContent = noteMessage;
    const tags = note.querySelectorAll('.tag');
    addTags(tags);

}

noteTags.forEach(note => {
    note.addEventListener('click', () => toggleClass(note, 'active'));
})

// Select Category

headerCategories.forEach(category => {
    category.addEventListener('click', () => {
        removeClassFromALlElements(headerCategories, 'active')
        category.classList.add('active');
    })
})


// Handle note click

notes.forEach(note => {
    note.addEventListener('click', () => showPreviewScreen(note));
})

// close Preview Screen

closePreviewBtn.addEventListener('click', () => {
    previewScreen.classList.remove('active');
})


window.addEventListener('load', () => {
    appearAnimation();
})

function appearAnimation() {
    let animDuration = 0.3;

    notes.forEach(note => {
        note.style.animation = `divappear ${animDuration}s ease`
        animDuration += .2;
    })

}