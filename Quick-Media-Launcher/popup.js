// Future JavaScript will go here
function myFunction(){
            var element = document.body;
            element.classList.toggle("dark-mode");
        }

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('amazing')
    .addEventListener('click', myFunction);
});