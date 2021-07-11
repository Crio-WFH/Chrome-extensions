let options = {
    takeNotes:false,
    displayNotes:false
}

let displayingForm = false;

const tabUrl = window.location.href;

console.log(tabUrl);

let notesCache = [];

chrome.storage.sync.get(tabUrl, (data)=>{
    notesCache = data[tabUrl]?data[tabUrl].savedNotes:[];
    console.log(data);
    notesCache.forEach(addSticker);
});

// dummyNotesCache = [
//     {
//         title: "noteTitle1",
//         description: "noteDescription1",
//         posX: "200px",
//         posY: "200px"
//     }, 
//     {
//         title: "noteTitle2",
//         description: "noteDescription2",
//         posX: "400px",
//         posY: "400px"    
//     },
//     {
//         title: "noteTitle3",
//         description: "noteDescription3",
//         posX: "600px",
//         posY: "600px"
//     }
// ];

const form = document.createElement("div");
form.id = "noteForm";

const formTitle = document.createElement("p");
formTitle.id = "formTitle";
formTitle.innerHTML = "Create note";

const titleLabel = document.createElement("label");
titleLabel.className = "input-box";
const title = document.createElement("input");
title.id = "inputTitle";
title.required = true;
title.setAttribute("type", "text");
title.setAttribute("maxlength","20");
const titlePlaceholder = document.createElement("span");
titlePlaceholder.className="placeholder";
titlePlaceholder.innerHTML = 'Note title (max 20 characters)<span class="asterics">*</span>';

titleLabel.appendChild(title);
titleLabel.appendChild(titlePlaceholder);

const descriptionLabel = document.createElement("label");
descriptionLabel.className = "input-box";
const description = document.createElement("input");
description.id = "inputDescription";
description.required = true;
description.setAttribute("type", "text");
const descriptionPlaceholder = document.createElement("span");
descriptionPlaceholder.className="placeholder";
descriptionPlaceholder.innerHTML='Your note needs a description<span class="asterics">*</span>';

descriptionLabel.appendChild(description);
descriptionLabel.appendChild(descriptionPlaceholder);

const noteFormBtnGrp = document.createElement("div");
noteFormBtnGrp.id = "noteFormBtnGrp";

const addNoteBtn = document.createElement("div");
addNoteBtn.id = "addNoteBtn";
addNoteBtn.innerHTML = "Add note";

const discardCreateNoteBtn = document.createElement("div");
discardCreateNoteBtn.id = "discardCreateNoteBtn";
discardCreateNoteBtn.innerHTML = "Discard";

noteFormBtnGrp.appendChild(addNoteBtn);
noteFormBtnGrp.appendChild(discardCreateNoteBtn);

form.appendChild(formTitle);
form.appendChild(titleLabel);
form.appendChild(descriptionLabel);
form.appendChild(noteFormBtnGrp);

document.body.appendChild(form);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
    if (request.message === "change_takeNotes_option") {
        console.log(`Changing take notes option to ${request.value}`);
        options.takeNotes = request.value;
        sendResponse({
            message:"success"
        });

        return true;
    } else if (request.message === "change_displayNotes_option") {
        console.log(`Changing display notes option to ${request.value}`);
        options.displayNotes = request.value;
        displayNotes();
        sendResponse({
            message:"success"
        });

        return true;
    } else if (request.message === "save_notes_cache") {
        console.log("Saved notes");
        saveNotes();
        sendResponse({
            message:"success"
        });

        return true;
    } else if (request.message === "reset_notes") {
        console.log("Reset notes");
        resetNotes();
        sendResponse({
            message:"success"
        });

        return true;
    }
})

document.body.addEventListener("click", (e) => {
    if (options.takeNotes && !displayingForm) {
        var posX = e.pageX, posY = e.pageY;
        console.log(e.pageX + " " + e.pageY);
        displayForm(posX, posY);
    }
});

function displayNotes(){
    const notes = document.getElementsByClassName("note");
    console.log(notes.length);
    for (let i = 0; i < notes.length; i++) {
        notes[i].style.visibility = (options.displayNotes)?"visible":"hidden";
    }
}

function saveNotes() {
    if (notesCache.length > 0) {
        chrome.storage.sync.set({[tabUrl]: {savedNotes:notesCache}});
    } else {
        chrome.storage.sync.remove(tabUrl);
    }
}

function displayForm(posX, posY) {
    displayingForm = true;
    const form = document.getElementById("noteForm");
    form.style.top = posY+"px";
    form.style.left = posX+"px";
    form.style.visibility = "visible";
}

function discardForm() {
    document.getElementById("noteForm").style.visibility = "hidden";
    console.log("Discarding form");
    document.getElementById("inputTitle").value="";
    document.getElementById("inputDescription").value="";

    setTimeout(() => {
        displayingForm = false;
    }, 500);
}

function addNote(){
    console.log("Adding note");
    let noteTitle = document.getElementById("inputTitle").value;
    let noteDescription = document.getElementById("inputDescription").value;

    if (noteTitle == null || noteTitle.trim() === "") {
        alert("The note requires a title");
    } else if (noteDescription == null || noteDescription.trim() === "") {
        alert("The note requires a description");
    } else {
        const createNoteForm = document.getElementById("noteForm");
        const styles = window.getComputedStyle(createNoteForm);
        const posX = styles.getPropertyValue('left');
        const posY = styles.getPropertyValue('top');
        
        let note = {
            title: noteTitle,
            description: noteDescription,
            posX: posX,
            posY: posY
        }
        
        notesCache.push(note);

        console.log("Current note cache");
        console.log(notesCache);

        addSticker(note, notesCache.length-1);

        discardForm();
    }
}

function discardNote(index, DOMElement) {
    console.log("Discarding note " + index);
    notesCache.splice(index, 1);
    console.log("Current note cache");
    console.log(notesCache);
    DOMElement.remove();
}

function resetNotes(){
    const notes = document.getElementsByClassName("note");
    while (notes.length > 0) {
        notes[0].remove();
    }
    notesCache = [];
    console.log(notesCache);
}

function shrinkNote(noteDOMElement){
    console.log("Shrinking note");
    const noteContentDiv = noteDOMElement.children[1];
    noteContentDiv.classList.toggle("note-content-shrinked");
    const noteHeader = noteDOMElement.children[0];
    const noteTitle = noteHeader.children[0];
    noteTitle.classList.toggle("noteTitle-shrinked");
    noteHeader.classList.toggle("noteHeader-shrinked");
    noteDOMElement.classList.toggle("note-shrinked");
}

document.getElementById("addNoteBtn").addEventListener("click", addNote);

document.getElementById("discardCreateNoteBtn").addEventListener("click", discardForm);


function addSticker(note, index) {

    console.log(`Form positions ${note.posX} ${note.posY} ${index}`);

    const colorTheme = getRandomColor();

    console.log(colorTheme);

    const newSticker = document.createElement("div");
    newSticker.className = "note";
    newSticker.style.top = note.posY;
    newSticker.style.left = note.posX;
    newSticker.style.visibility = (options.displayNotes)?"visible":"hidden";

    const noteHeader = document.createElement("div");
    noteHeader.className = "noteHeader";
    noteHeader.onclick = () => shrinkNote(noteHeader.parentElement);

    const noteContent = document.createElement("div");
    noteContent.className = "noteContent";
   
    const noteTitle = document.createElement("p");
    noteTitle.className = "noteTitle";
    noteTitle.innerHTML = note.title;
    noteTitle.style.color = colorTheme;

    const noteDescription = document.createElement("p");
    noteDescription.className = "noteDescription";
    noteDescription.innerHTML = note.description;

    const discardBtn = document.createElement("div");
    discardBtn.className = "discardBtn";
    discardBtn.innerHTML = "Discard";
    discardBtn.setAttribute("note-index", index);
    discardBtn.onclick = () => discardNote(discardBtn.getAttribute('note-index'), discardBtn.parentElement.parentElement);
    discardBtn.style.backgroundColor = colorTheme;
    
    noteHeader.appendChild(noteTitle);
    noteContent.appendChild(noteDescription);
    noteContent.appendChild(discardBtn);

    newSticker.appendChild(noteHeader);
    newSticker.appendChild(noteContent);

    document.body.appendChild(newSticker);
}

function getRandomColor(){
    const colors = ["#E76100", "#76AA08", "#DC11BC", "#1193DC", "#A711DC"];
    const randomIndex = Math.floor(Math.random()*10)%colors.length;
    return colors[randomIndex];
}