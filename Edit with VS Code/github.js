const copyButtons = document.querySelectorAll('clipboard-copy')
const links = document.querySelectorAll(
	'.form-control.input-monospace.input-sm.color-bg-secondary'
)

if (copyButtons?.length >= 3) {
    for (let i = 0; i < 3; i++) {
        copyButtons[i].addEventListener('click', () => {
            console.log('click!!!')
            chrome.storage.sync.get(['path', 'override'], (resp) => {
                console.log('path:', resp.path, '\nlink:', links[i].value)
                if (resp.override) {
                    chrome.runtime.sendMessage(
						{
							link: links[i].value,
							path: resp.path,
						},
						(result) => {
							console.log(result)
						}
					)
                }
            })
        })
    }
}
