<div style="display: flex; justify-content: space-between">
<h1 style="flex:1">💻 Quick Edits v1.5.2</h1>
<img style="margin: auto 10px" width="50" height="50" src="https://imgur.com/lEfOiEa.jpg" />
</div>

<div style="text-align: center">

![project demo](https://media.giphy.com/media/5dRd9AhjMxnXOityB5/giphy.gif)
<blockquote style="background: #f9f9f9;
  border-left: 4px solid #ddd;
  margin: 1.5em 10px;
  padding: 0.5em 10px;">
  <em>Opens the selected text in a Text Editor</em>
</blockquote>

Demo video link (https://vimeo.com/570875673)

</div>

## 🎉 Uses/Features

-   Make the process of copy-pasting-editing code instantaneous
-   Removes the hassle of opening text editor, set it up side-by-side with browser and then Copy and Pasting
-   No unnecessary switching between windows, increase productivity
-   Inbuilt support for 5 most used editors (yes, it includes even notepad)
-   Minimal user interaction, set editor in pop-up once, then forget this exists.

> _Note: defaults to VS Code upon installation_

## ⚙ Installation

>   Refer this: (https://vimeo.com/571618622)
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

> `Hritwik Som (Apprentice76)`
