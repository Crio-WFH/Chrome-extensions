/*Creating a close button to delete done tasks */

var mytasks = document.getElementsByTagName("LI");
var itr;
for (itr = 0; itr < mytasks.length; itr++) {
    var span = document.createElement("SPAN");
    var txtascii = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txtascii);
    mytasks[itr].appendChild(span);
}

/* click on close buttton to hide the list items */
var close = document.getElementsByClassName("close");
var itr;
for (itr = 0; itr < close.length; itr++) {
    close[itr].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

/* Adding a checked symbol when clicking a list item */
var record = document.querySelector('ul');
record.addEventListener('click', function(check) {
    if (check.target.tagName === 'LI') {
        check.target.classList.toggle('checked');
    }
}, false);

/*adding a new list item on clicking the add button*/
document.getElementById("myButton").addEventListener("click", newElement);

function newElement() {
    var listItem = document.createElement('listItem');
    var insertValue = document.getElementById("myInput").nodeValue;
    var exist = document.createTextNode(insertValue);
    listItem.appendChild(exist);
    if (insertValue === '') {
        alert("You must write something before you add!");
    } else {
        document.getElementById("myUL").appendChild(listItem);
    }
    document.getElementById("myInput").value = "";
    var span = document.createElement("SPAN");
    var txtascii = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txtascii);
    listItem.appendChild(span);

    for (var itr = 0; itr < close.length; itr++) {
        close[itr].onclick = function() {
            var part = this.parentElement;
            part.style.display = "none";
        }
    }

}