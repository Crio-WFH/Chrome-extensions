document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("lofi") != null) {
    document.getElementById("lofi").addEventListener("click", lofi);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("classical") != null) {
    document.getElementById("classical").addEventListener("click", classical);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("coding") != null) {
    document.getElementById("coding").addEventListener("click", coding);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("shuffle") != null) {
    document.getElementById("shuffle").addEventListener("click", shuffle);
  }
});

function lofi() {
  window.open(
    "https://music.youtube.com/playlist?list=RDCLAK5uy_kb7EBi6y3GrtJri4_ZH56Ms786DFEimbM"
  );
}

function classical() {
  window.open(
    "https://music.youtube.com/playlist?list=RDCLAK5uy_mYa86YJNGqE4Jl5jG7DZP9NKdflw0hQL0"
  );
}

function coding() {
  window.open(
    "https://music.youtube.com/playlist?list=OLAK5uy_nbUdpwvGhIGBfb1Vt3xLHIqlGTLSWwCVA"
  );
}
function shuffle() {
  window.open(
    "https://music.youtube.com/playlist?list=RDCLAK5uy_lj-zBExVYl7YN_NxXboDIh4A-wKGfgzNY"
  );
}
