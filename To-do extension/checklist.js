console.log("welcome");
showNotes();
// if user adds a note , add it to the local Storage
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", function(e) {
    let addtxt = document.getElementById("floatingTextarea2");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }
    notesObj.push(addtxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtxt.value = "";
    console.log(notesObj);
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index) {
        html += `<div class=" my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Your Notes${index+1}</h5>
          <p class="card-text">${element}</p>
          <button id="myBtn" class="btn btn-primary addbutton">Delete</button>
          
        </div>
      </div>`
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `nothing to show add a new note`;
    }

}

// function to delete a note
document.getElementById("myBtn").addEventListener("click",
    function deleteNote(index) {
        console.log("i m deleting", index)
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }
        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    })
