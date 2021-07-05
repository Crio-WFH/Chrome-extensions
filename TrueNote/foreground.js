let options = {
    isEnabled:false
}

let displayingForm = false;

// function onload() {
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
titlePlaceholder.innerHTML = 'Note title<span class="asterics">*</span>';

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
// }

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.message === "onload") {
//         onload();
//         sendResponse("");
//     } 
// })

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
    if (request.message === "change_options") {
        console.log(`Is enabled ${request.isEnabled}`);
        options.isEnabled = request.isEnabled;
        sendResponse({
            message:"success"
        });

        return true;
    }
})

document.body.addEventListener("click", (e) => {
    if (options.isEnabled && !displayingForm) {
        var posX = e.pageX, posY = e.pageY;
        console.log(e.pageX + " " + e.pageY);
        displayForm(posX, posY);
    }
});

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

document.getElementById("addNoteBtn").addEventListener("click", (e) => {
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

        addSticker(noteTitle, noteDescription, posX, posY);

        discardForm();
    }
});

document.getElementById("discardCreateNoteBtn").addEventListener("click", discardForm);


function addSticker(title, description, posX, posY){

    console.log(`Form positions ${posX} ${posY}`);

    const colorTheme = getRandomColor();

    console.log(colorTheme);

    const newSticker = document.createElement("div");
    newSticker.className = "note";
    newSticker.style.top = posY;
    newSticker.style.left = posX;

    const noteTitle = document.createElement("p");
    noteTitle.className = "noteTitle";
    noteTitle.innerHTML = title;
    noteTitle.style.color = colorTheme;

    const noteDescription = document.createElement("p");
    noteDescription.className = "noteDescription";
    noteDescription.innerHTML = description;

    const discardBtn = document.createElement("div");
    discardBtn.className = "discardBtn";
    discardBtn.innerHTML = "Discard";
    discardBtn.style.backgroundColor = colorTheme;
    
    newSticker.appendChild(noteTitle);
    newSticker.appendChild(noteDescription);
    newSticker.appendChild(discardBtn);

    document.body.appendChild(newSticker);
}

function getRandomColor(){
    const colors = ["#E76100", "#76AA08", "#DC11BC", "#1193DC", "#A711DC"];
    const randomIndex = Math.floor(Math.random()*10)%colors.length;
    return colors[randomIndex];
}