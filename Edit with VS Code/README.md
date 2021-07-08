# 💻 Quick Edits v1.7.6
![project demo](https://media.giphy.com/media/5dRd9AhjMxnXOityB5/giphy.gif)
> _Opens the selected text in a Text Editor_

Demo video link (https://vimeo.com/570875673)

## 🎉 Uses/Features

-   Make the process of copy-pasting-editing code instantaneous.
-   Removes the hassle of opening text editor, set it up side-by-side with browser and then Copy and Pasting.
-   No unnecessary switching between windows thereby increase your productivity.
-   Inbuilt support for 5 most used editors (yes, it includes even notepad).
-   Minimal user interaction, set editor in pop-up once, then forget this exists.
-   Toggle whether to open editor or just save snippet.
-   Access saved snippets via `SNIPPETS!` button.
-   Delete snippets by pressing '❌'  or edit them by pressing '🖋'. (Don't forget to save edited snippet by pressing '✔' !!!).

> _Note: defaults to VS Code upon installation and Open editor is turned on_

## ⚙ Installation

>   _Refer this: (https://vimeo.com/571618622)_
-   Open extensions tab in Chrome, turn developer mode on
-   Select `LOAD UNPACKED`, then select the extension folder in dialog box

![copying](https://i.imgur.com/ZehlbXg.gif)

-   Copy `ID` of the extension (make sure there isn't any whitespace, you can double-click the `ID` and copy the selection to avoid this )

-   Go back to extension folder and run install.bat from `config` folder
-   That's it, go to any page, then right-click & select 'Edit with VS Code' from the context menu (Refresh older tabs, i.e., those already open before extension was installed, to make this run on those tabs)

## ⚠ Limitations

-   Tested only on Chrome
-   Runs in Windows only (batch files & registry editor)
-   Opens text only in a text file in a temp directory, I'll see if file types can be set while opening with VS Code

## ❌ Troubleshooting

-   Make sure to run install.bat, otherwise it won't run
-   Make sure VS Code directory is in `PATH` of windows
-   Refreshing the page is necessary, after installing the extension (otherwise content-script doesn't run)
-   This is very unlikely but make sure you have powershell installed

## 📝 Licence

GNU General Public License Version 3

## 🥳 Contributing

PR's are welcome, but fork the project and do so only in `dev` branch

## 👻 Authors
<img style="margin: auto 10px" width="50" height="50" src="https://imgur.com/lEfOiEa.jpg" />

> `Hritwik Som (Apprentice76)`
