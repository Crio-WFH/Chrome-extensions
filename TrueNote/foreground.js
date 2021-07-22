var myOptions = {
    takeNotes:false,
    displayNotes:false
}

var myGlobals = {
    displayingForm:false,
    tabUrl:window.location.href,
    notesCache:[],
    changesPersited:true
}

console.log(myGlobals.tabUrl);

onloadForeground();

function onloadForeground(){
    
    createNoteForm();

    chrome.storage.sync.get(myGlobals.tabUrl, (data)=>{
        myGlobals.notesCache = data[myGlobals.tabUrl]?data[myGlobals.tabUrl].savedNotes:[];
        console.log(data);
        myGlobals.notesCache.forEach(addSticker);
    });
}

function createNoteForm(){
    
    const form = document.createElement("div");
    form.id = "noteForm";

    const formTitle = document.createElement("p");
    formTitle.id = "formTitle";
    formTitle.innerHTML = "Create note";

    const titleLabel = document.createElement("label");
    titleLabel.className = "note-input-box";
    const title = document.createElement("input");
    title.id = "note-inputTitle";
    title.required = true;
    title.setAttribute("type", "text");
    title.setAttribute("maxlength","20");
    const titlePlaceholder = document.createElement("span");
    titlePlaceholder.className="note-placeholder";
    titlePlaceholder.innerHTML = 'Note title (max 20 characters)<span class="asterics">*</span>';

    titleLabel.appendChild(title);
    titleLabel.appendChild(titlePlaceholder);

    const descriptionLabel = document.createElement("label");
    descriptionLabel.className = "note-input-box";
    const description = document.createElement("input");
    description.id = "note-inputDescription";
    description.required = true;
    description.setAttribute("type", "text");
    const descriptionPlaceholder = document.createElement("span");
    descriptionPlaceholder.className="note-placeholder";
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
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
    if (request.message === "change_takeNotes_option") {
        console.log(`Changing take notes option to ${request.value}`);
        myOptions.takeNotes = request.value;
        sendResponse({
            message:"success"
        });

        return true;
    } else if (request.message === "change_displayNotes_option") {
        console.log(`Changing display notes option to ${request.value}`);
        myOptions.displayNotes = request.value;
        displayNotes();
        sendResponse({
            message:"success"
        });

        return true;
    } else if (request.message === "save_notes_cache") {
        console.log("Saving notes");
        const payload = {};
        if (myGlobals.changesPersited == false) {
            saveNotes();
            payload.status = "success";
            payload.message = "Your notes have been saved.";
        } else {
            payload.status = "fail";
            payload.message = "It seems you do not have any chages to save. Go ahead and add as many notes as you want.";
        }
        sendResponse(payload);

        return true;
    } else if (request.message === "reset_notes") {
        console.log("Reset notes");
        resetNotes();
        sendResponse({
            message:"success"
        });

        return true;
    }
});

document.body.addEventListener("click", (e) => {
    console.log("From body " + e.pageX + " " + e.pageY);
    if (myOptions.takeNotes && !myGlobals.displayingForm) {
        var posX = e.pageX, posY = e.pageY;
        // console.log(e.pageX + " " + e.pageY);
        displayForm(posX, posY);
    }
});

function displayNotes(){
    const notes = document.getElementsByClassName("note");
    console.log(notes.length);
    for (let i = 0; i < notes.length; i++) {
        notes[i].style.visibility = (myOptions.displayNotes)?"visible":"hidden";
    }
}

function saveNotes() {
    if (myGlobals.notesCache.length > 0) {
        chrome.storage.sync.set({[myGlobals.tabUrl]: {savedNotes:myGlobals.notesCache}});
    } else {
        chrome.storage.sync.remove(myGlobals.tabUrl);
    }
    myGlobals.changesPersited=true;
}

function displayForm(posX, posY) {
    myGlobals.displayingForm = true;
    const form = document.getElementById("noteForm");
    form.style.top = posY+"px";
    form.style.left = posX+"px";
    form.style.transform = "translate(0,0)";
    fitElementToScreen(form);
    form.style.visibility = "visible";
}

function discardForm() {
    const form = document.getElementById("noteForm");
    form.style.visibility = "hidden";
    console.log("Discarding form");
    document.getElementById("note-inputTitle").value="";
    document.getElementById("note-inputDescription").value="";

    setTimeout(() => {
        myGlobals.displayingForm = false;
    }, 500);
}

function addNote(){
    console.log("Adding note");
    let noteTitle = document.getElementById("note-inputTitle").value;
    let noteDescription = document.getElementById("note-inputDescription").value;

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
        
        myGlobals.notesCache.push(note);

        myGlobals.changesPersited = false;

        console.log("Current note cache");
        console.log(myGlobals.notesCache);

        addSticker(note, myGlobals.notesCache.length-1);

        discardForm();
    }
}

function discardNote(index, DOMElement) {
    myGlobals.displayingForm=true;
    setTimeout(()=>{
        myGlobals.displayingForm=false;
    }, 300);
    console.log("Discarding note " + index);
    myGlobals.notesCache.splice(index, 1);
    console.log("Current note cache");
    console.log(myGlobals.notesCache);
    DOMElement.remove();
    myGlobals.changesPersited = false;
}

function resetNotes(){
    console.log("Resetting notes");
    const notes = document.getElementsByClassName("note");
    while (notes.length > 0) {
        notes[0].remove();
    }
    myGlobals.notesCache = [];
    console.log(myGlobals.notesCache);
    myGlobals.changesPersited = false;
}

function shrinkNote(noteDOMElement){
    myGlobals.displayingForm=true;
    setTimeout(()=>{
        myGlobals.displayingForm=false;
    }, 500);
    console.log("Shrinking note");
    noteDOMElement.classList.remove("left-overflow-transfom");
    noteDOMElement.classList.remove("up-overflow-transfom");
    const noteContentDiv = noteDOMElement.children[1];
    noteContentDiv.classList.toggle("note-content-shrinked");
    const noteHeader = noteDOMElement.children[0];
    const noteTitle = noteHeader.children[0];
    noteTitle.classList.toggle("noteTitle-shrinked");
    noteHeader.classList.toggle("noteHeader-shrinked");
    noteDOMElement.classList.toggle("note-shrinked");
}

function fitElementToScreen(DOMElement){
    if ((document.body.clientWidth - parseInt(DOMElement.style.left)) < parseInt(window.getComputedStyle(DOMElement).getPropertyValue('width'))) {
        if ((document.body.clientHeight - parseInt(DOMElement.style.top)) < parseInt(window.getComputedStyle(DOMElement).getPropertyValue('height'))){
            DOMElement.style.transform="translate(-100%, -100%)";
        } else {
            DOMElement.style.transform="translateX(-100%)";
        }
    }else if ((document.body.clientHeight - parseInt(DOMElement.style.top)) < parseInt(window.getComputedStyle(DOMElement).getPropertyValue('height'))) {
        DOMElement.style.transform="translateY(-100%)";
    }

    console.log('DOMElement transform style');
    console.log(DOMElement.style.transform);
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
    newSticker.style.visibility = "hidden";

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
    discardBtn.className = "note-discardBtn";
    discardBtn.innerHTML = "Discard";
    discardBtn.setAttribute("note-index", index);
    discardBtn.onclick = () => discardNote(discardBtn.getAttribute('note-index'), discardBtn.parentElement.parentElement);
    discardBtn.style.borderColor = colorTheme;
    discardBtn.style.color = colorTheme;
    
    noteHeader.appendChild(noteTitle);
    noteContent.appendChild(noteDescription);
    noteContent.appendChild(discardBtn);

    newSticker.appendChild(noteHeader);
    newSticker.appendChild(noteContent);

    document.body.appendChild(newSticker);

    fitElementToScreen(newSticker);
    newSticker.style.visibility = (myOptions.displayNotes)?"visible":"hidden";
}

function getRandomColor(){
    const colors = ["#864415", "#506d13", "#831872", "#195d77", "#6d1e1e"];
    const randomIndex = Math.floor(Math.random()*10)%colors.length;
    return colors[randomIndex];
}