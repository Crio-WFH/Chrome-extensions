# 💻 Quick Edits v2.1.2
![project demo](https://imgur.com/qPliNEN.gif)
> _Opens the selected text in a Text Editor. Defaults to VS Code upon installation and Open editor is turned on_

Demo video link (https://vimeo.com/573019919)

## 🎉 Uses/Features
<ul>
<li>   Make the process of copy-pasting-editing code instantaneous.
<li>   Removes the hassle of opening text editor, set it up side-by-side with browser and then Copy and Pasting.
<li>   No unnecessary switching between windows thereby increase your productivity.
<li>   Inbuilt support for 5 most used editors (yes, it includes even notepad).
<li>   Minimal user interaction, set editor in pop-up once, then forget this exists.
<li>   Toggle whether to open editor or just save snippet (snippets don't get deleted unless you reload the extension).
<p>
<img src="https://imgur.com/ludRjxJ.jpg" alt="console" height="200"/>
</p>
<li>  Access saved snippets via `SNIPPETS!` button.
<p>
<img src="https://imgur.com/s0qNAVA.jpg" alt="snippetTab" height="200" width="350"/>
</p>
<li>   Copy snippets with one click by clicking '📋' button.
<p>
<img src="https://imgur.com/GhrcxBR.jpg" alt="snippet" height="300">
</p>
<li>   Delete snippets by pressing '❌'  or edit them by pressing '🖋'. (Don't forget to save edited snippet by pressing '✔' !!!).
</ul>
  
### Experimental feature: Git-Cloner
> This is useful when you have multiple repos to clone and one global clone directory. 
> Obviously you need git installed and authentication/ssh keys set up beforehand

- Override the copy-link-to-clipboard '📋' button in GitHub.
- Toggle Cloner On.
- Type/Paste path of directory where repo is to be cloned.
- Click '📋' as usual in GitHub and directory will be cloned.
  
######  _Needs python to function !!_

> _Cloning process: (https://vimeo.com/572937843)_

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

  > `Hritwik Som (Apprentice76)`