let saveBtn = document.querySelector("#save");
let api = document.querySelector("#myapi")
let toastError = document.querySelector('.toast-error')
let toastSuccess = document.querySelector('.toast-success')

saveBtn.addEventListener('click', () => {
    if (api.value) {
        toastSuccess.classList.remove('d-hide');

        // storing the data in extension
        chrome.storage.local.set({ "API": api.value }, function () {
            console.log('Value is set to ' + api.value);
        });

    } else {
        toastError.classList.remove('d-hide')
        setTimeout(() => {
            toastError.classList.add('d-hide')
        }, 1500)
    }
})

//Smv4XLkiohEpdaLGXtBFTypHQL4WBfoCrVhYKyq35eByq6AnN3hjGMoMURi7 API KEY from T.ly.com
