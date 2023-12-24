const notes = document.querySelectorAll('.note');
const previewScreen = document.querySelector('.preview');
const closePreviewBtn = document.querySelector('.btn-close-modal');
const headerCategories = document.querySelectorAll('header .category');
const noteTags = document.querySelectorAll('.preview .category');
const newNoteBtn = document.querySelector('.btn-new-note');
const notesContainer = document.querySelector('.notes');

const previewScreenHeading = previewScreen.querySelector('.heading');
const previewScreenImages = previewScreen.querySelectorAll('img');
const previewImgContainer = previewScreen.querySelector('.images');
const previewScreenText = previewScreen.querySelector('.noteMessage');
const penBtn = document.querySelector('.fa-pen-clip');

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
    previewScreenHeading.value = noteHeading;
    const noteMessage = note.querySelector('p').textContent; // reminder to change class name later
    previewScreenText.textContent = noteMessage;
    const tags = note.querySelectorAll('.tag');
    addTags(tags);
    newnotecreated = false;

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
        note.classList.add('show');
        note.style.animation = `divappear ${animDuration}s ease`
        animDuration += .2;
    })

}

let newnotecreated = false;

newNoteBtn.addEventListener('click', () => {
    previewScreen.classList.add('active');
    clearPreviewImages();
    previewScreenHeading.value = "";
    previewScreenText.textContent = "Type here...";
    newnotecreated = true;

})

closePreviewBtn.addEventListener('click', () => {

    if (newnotecreated) {
        const newNote = document.createElement('div');
        newNote.classList.add('note');
        newNote.classList.add('show');
        const newNoteHeading = document.createElement('h2');
        newNoteHeading.textContent = `Note`
        const newNoteMessage = document.createElement('p');
        newNoteMessage.textContent = "ushrizzzzzzzz.... "
        newNote.appendChild(newNoteHeading);
        newNote.appendChild(newNoteMessage);
        notesContainer.prepend(newNote);
    }
})

previewScreenText.addEventListener('click', () => {
    if (previewScreenText.textContent.trim() === "Type here...")
        previewScreenText.textContent = "";


})

penBtn.addEventListener('click', () => {
    if (previewScreenText.textContent.trim() === "")
        previewScreenText.textContent = "Type here...";
})