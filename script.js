// let notes = document.querySelectorAll('.note');
const notes = document.querySelectorAll('.note');
const previewScreen = document.querySelector('.preview');
const closePreviewBtn = document.querySelector('.btn-close-modal');
const headerCategories = document.querySelectorAll('header .category');
const noteTags = document.querySelectorAll('.preview .category');
const newNoteBtn = document.querySelector('.btn-new-note');
const notesContainer = document.querySelector('.notes');
const previewScreenHeading = previewScreen.querySelector('.preview .heading');
const previewScreenImages = previewScreen.querySelectorAll('img');
const previewImgContainer = previewScreen.querySelector('.images');
const previewScreenText = previewScreen.querySelector('.noteMessage');
// const penBtn = document.querySelector('.fa-pen-clip');
// const deleteNoteBtn = document.querySelector('.delete-note');
const modalNoNotes = document.querySelector('.modal-no-notes');
const imageInput = document.getElementById('imageInput');

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let newNoteCreated = false;

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
    newNoteCreated = false;

}

noteTags.forEach(tag => {
    tag.addEventListener('click', () => {
        removeClassFromALlElements(noteTags, 'active');
        tag.classList.add('active');
    });
})

// Select Category

function displayCategoryCount() {
    const notes = document.querySelectorAll('.note');
    headerCategories.forEach(category => {
        const categoryCount = category.querySelector('span');
        let count = 0;
        notes.forEach(note => {
            const currentTag = note.querySelector('.tag');
            const processedCategoryString = category.textContent?.replace(/\d/g, '').trim();
            if (processedCategoryString == currentTag.textContent)
                count++;

        })
        categoryCount.textContent = count;
    })
    const allNoteCount = headerCategories[0].querySelector('span');
    let count = 0;
    notes.forEach(notes => count++)
    allNoteCount.textContent = count;

    if (allNoteCount.textContent == 0) {
        modalNoNotes?.classList.add('show');
    }
    else {
        modalNoNotes?.classList.remove('show');

    }
}

function handleCategorySelect() {
    const notes = document.querySelectorAll('.note');
    headerCategories.forEach(category => {
        category.addEventListener('click', () => {
            removeClassFromALlElements(headerCategories, 'active')
            category.classList.add('active');

            notes.forEach(note => {

                const currentNoteTag = note.querySelector('.tag');
                const selectedCategory = category.textContent?.replace(/\d/g, '').trim();

                if (selectedCategory != currentNoteTag?.textContent) {
                    note.style.display = "none";
                }
                else {
                    appearAnimation();
                    note.style.display = 'unset';
                }

                if (selectedCategory == 'All Notes') {
                    notes.forEach(note => {
                        note.style.display = "unset";
                    })
                }
            })
        })
    })
}




// Handle note click

let currentNote;

function handleNoteClick() {
    const notes = document.querySelectorAll('.note');
    notes.forEach(note => {
        note.addEventListener('click', () => {
            showPreviewScreen(note);
            currentNote = note;
        });

    })
}

const deleteNoteBtn = document.querySelectorAll('.delete-note');
deleteNoteBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        previewScreen?.classList.remove('active');
        notesContainer?.removeChild(currentNote);
        displayCategoryCount();

    })
})




closePreviewBtn.addEventListener('click', () => {

})

// handleNoteClick();

// close Preview Screen


function appearAnimation() {
    const notes = document.querySelectorAll('.note');
    let animDuration = 0.3;
    notes.forEach(note => {
        note.classList.add('show');
        note.style.animation = `divappear ${animDuration}s ease`
        animDuration += .2;
    })

}

window.addEventListener('load', () => {
    appearAnimation();
    displayCategoryCount();
    handleNoteClick();
    handleCategorySelect();
})

function openNoteEditor() {
    removeClassFromALlElements(noteTags, 'active');
    noteTags.forEach(tag => {
        headerCategories.forEach(category => {
            if (category.classList.contains('active') && category.textContent?.replace(/\d/g, '').trim() == tag.textContent?.trim()) {
                tag.classList.add('active');
            }
        })
    })
    previewScreen.classList.add('active');
    clearPreviewImages();
    previewScreenHeading.value = "";
    previewScreenText.textContent = "Type here...";
    newNoteCreated = true;
}

newNoteBtn.addEventListener('click', () => {
    // modalNoNotes?.classList.remove('show');
    openNoteEditor();
})



closePreviewBtn.addEventListener('click', () => {

    previewScreen.classList.remove('active');

    if (!newNoteCreated) {
        currentNote.querySelector('h2').textContent = previewScreenHeading.value;
        currentNote.querySelector('p').textContent = previewScreenText.textContent;
        const currentNoteImageContainer = currentNote.querySelector('.images');
        const previewScreenImages = previewScreen.querySelectorAll('img');
        previewScreenImages.forEach(image => {
            if (image.classList.contains('new')) {
                console.log("ok");
                clearPreviewImages();
                const newImg = document.createElement('img');
                newImg.src = image.src;
                currentNoteImageContainer.appendChild(newImg);
            }
        })
        // note.querySelector('.tag').textContent = ;
        noteTags.forEach(tag => {
            if (tag.classList.contains('active')
                // && !tag.classList.contains('favorite')
            )
                currentNote.querySelector('.tag').textContent = tag.textContent;
        })
    }

    if (newNoteCreated) {
        const newNote = document.createElement('div');
        newNote.classList.add('note');
        newNote.classList.add('show');
        const newNoteHeading = document.createElement('h2');
        const newNoteDeleteBtn = document.createElement('i');
        newNoteDeleteBtn.classList.add('fa');
        newNoteDeleteBtn.classList.add('fa-trash');
        newNoteHeading.textContent = previewScreenHeading.value || `Note #${++headerCategories[0].querySelector('span').textContent}`;
        const newNoteMessage = document.createElement('p');
        newNoteMessage.textContent = (previewScreenText.textContent.trim() == 'Type here...' || previewScreenText.textContent.trim() == '') ? 'Write Something' : previewScreenText.textContent;
        const newNoteTag = document.createElement('div');
        newNoteTag.classList.add('tag');
        noteTags.forEach(tag => {
            if (tag.classList.contains('active')) {
                newNoteTag.textContent = tag.textContent;
            }
        })
        const newNoteDate = document.createElement('div');
        newNoteDate.textContent = `${months[new Date().getMonth()]} ${new Date().getDate()}`;
        newNoteDate.classList.add('date');
        newNote.appendChild(newNoteHeading);
        const currentNoteImageContainer = document.createElement('div');
        currentNoteImageContainer.classList.add('images');
        const previewScreenImages = previewScreen.querySelectorAll('img');
        previewScreenImages.forEach(image => {
            console.log("ok");
            const newImg = document.createElement('img');
            newImg.src = image.src;
            currentNoteImageContainer.appendChild(newImg);
        })
        newNote.appendChild(currentNoteImageContainer);
        newNote.appendChild(newNoteMessage);
        newNote.appendChild(newNoteTag);
        newNote.appendChild(newNoteDate);

        notesContainer.prepend(newNote);
        headerCategories.forEach(category => {
            if (category.classList.contains('active')) {
                removeClassFromALlElements(headerCategories, 'active');
                category.click();
            }
        })

    }

    displayCategoryCount();

    handleCategorySelect();

    handleNoteClick();


})

previewScreenText.addEventListener('click', () => {
    if (previewScreenText.textContent.trim() === "Type here...")
        previewScreenText.textContent = "";


})

// penBtn.addEventListener('click', () => {
//     if (previewScreenText.textContent.trim() === "")
//         previewScreenText.textContent = "Type here...";
// })

modalNoNotes?.addEventListener('click', () => {
    newNoteBtn.click();
})

function handleImageInput(event) {
    // Get the selected file from the input
    const selectedFile = event.target.files[0];

    if (selectedFile) {
        // Read the selected file as a data URL
        const reader = new FileReader();
        reader.onload = function (e) {
            // Set the source of the image element to the data URL
            console.log(e.target.result);
            // const selectedImage = document.getElementById('selectedImage');
            const newPreviewScreenImg = document.createElement('img');
            newPreviewScreenImg.classList.add('new');
            newPreviewScreenImg.src = e.target.result;
            previewImgContainer.prepend(newPreviewScreenImg);
        };
        reader.readAsDataURL(selectedFile);
    }
}

imageInput?.addEventListener('change', handleImageInput)
